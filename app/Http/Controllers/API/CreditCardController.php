<?php

namespace App\Http\Controllers\API;

use App\Models\Lot;
use App\Models\User;
use App\Models\CreditCard;
use App\Models\Sale;
use App\Models\Agency;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
/**
 * @group Coficarte
 *
 * EndPoints pour gérer les coficartes
 */
class CreditCardController extends Controller
{
	/**
	 * Affiche les coficartes
	 *
	 * @queryParam	card_number									string			Filtrer par numéro de la coficarte.												 No-example.
	 * @queryParam	delivery_date								string			Filtrer par date de livraison de la coficarte.									 No-example.
	 * @queryParam	invoice_reference							string			Filtrer par reférence de facture de la coficarte.								 No-example.
	 * @queryParam	receptionist_id								int				Filtrer par id du receptioniste de la coficarte.								 No-example.
	 * @queryParam	possessor_id								int				Filtrer par id du possesseur de la coficarte.									 No-example.
	 * @queryParam	status										string			Filtrer par status de la coficarte.												 No-example.
	 * @queryParam	price										int				Filtrer par prix de la coficarte.												 No-example.
	 *
	 * @queryParam  with_receptionist							sring			Afficher le receptioniste de la coficarte.									 	 Example: false
	 * @queryParam  with_possessor							  	sring			Afficher le possésseur de la coficarte.											 Example: false
	 * @queryParam  with_lot									sring			Afficher le lot de la coficarte.												 Example: false
	 * @queryParam  with_sale									sring			Afficher la vente de la coficarte.												 Example: false
	 *
	 * @queryParam  paginate									string			Utiliser la pagination.															 Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', CreditCard::class))->allowed()) {
			$list = CreditCard::query();
			$requestData = $request->all();
			($search = $request->search) ? $list = $this->querySearch($list, ["card_number", "invoice_reference"], $search) : null;
			$list = $this->queryFilter($list, $requestData, "CreditCard");
			$list = $this->queryRelationFilter($list, $requestData, "relation_filter_in_", "in");
			$list = $this->queryRelationFilter($list, $requestData, "relation_filter_not_in_", "notIn");
			$list = $this->queryRelationAdd($list, $requestData, "CreditCard");

			$connectedUser = $request->user();
			$connectedUser->profile == "responsible_for_customer" ? $list->where('possessor_id', $connectedUser->id) : null;
			$connectedUser->profile == "agency_head" ? $list->where(function ($query) use ($connectedUser) {
				$query->where('possessor_id', $connectedUser->id)->orWhere(function ($query) use ($connectedUser) {
					$query->whereHas("possessor", function ($query) use ($connectedUser) {
						$query->where('agency_id', $connectedUser->agency_id)
							->where('profile', 'responsible_for_customer')
						;
					});
				});
			}) : null;
			return $this->responseIndexOk($list, $requestData, "CreditCard");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}


	/**
	 * Affiche une coficarte
	 *
	 * @urlParam	id											int				L'ID de la coficarte.															 Example: 1.
	 *
	 * @queryParam  with_receptionist							string			Afficher le receptioniste de la coficarte.									 	 Example: false
	 * @queryParam  with_possessor							  	string			Afficher le possésseur de la coficarte.											 Example: false
	 * @queryParam  with_lot									string			Afficher le lot de la coficarte.												 Example: false
	 * @queryParam  with_sale									sring			Afficher la vente de la coficarte.												 Example: false
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = CreditCard::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "CreditCard");
				return $this->responseOk(["creditCard" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "la coficarte n'existe pas"], 404);
		}
	}

	/**
	 * Créer une nouvelle coficarte
	 *
	 * @bodyParam	quantity									int				La quantité de coficarte.														Example: 1
	 * @bodyParam	card_number									int				Le numéro de la coficarte première carte.										Example: 1025965412
	 * @bodyParam	delivery_date								string			La date de livraison de la coficarte.											Example: 2024-05-05
	 * @bodyParam	invoice_reference							string			La reférence de la facture de la coficarte.										Example: ddt-ds58-dds
	 * @bodyParam	price										int				Le prix de la coficarte.														Example: 5000
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		return $this->modelStore(
			modelClass: "App\Models\CreditCard",
			requestData: $request->all(),
			validations: [
				"quantity" => "required|numeric",
				"card_number" => "required|min_digits:10|max_digits:10|unique:credit_cards",
				"delivery_date" => "required|date",
				"invoice_reference" => "required",
				"price" => "required|numeric",
				"buy" => "required|numeric",
			],
			beforeCreate: function ($requestData) use ($request) {
				$currentUser = $request->user();
				$requestData["receptionist_id"] = $currentUser->id;
				$requestData["possessor_id"] = $currentUser->id;
				$requestData["status"] = "owned";
				if ($requestData["quantity"] > 1) {
					$lot = Lot::create(["first_card_number" => $requestData["card_number"]]);
					$requestData["lot_id"] = $lot->id;
				}
				return $requestData;
			},
			beforeCommit: function ($model, $requestData, $manualValidationsData) {
				$modelList = [$model];
				if ($requestData["quantity"] > 1) {
					$comp = 1;
					while ($comp < $requestData["quantity"]) {
						$tmpRequestData = $requestData;
						$tmpRequestData["card_number"] = (str_pad($tmpRequestData["card_number"] + $comp, 10, '0', STR_PAD_LEFT));
						$modelList[] = CreditCard::create($tmpRequestData);
						$comp++;
					}
				}
				return $modelList;
			}
		);
	}

	/**
	 * Mettre à jour une coficarte
	 *
	 * @urlParam	id											int				L'ID de la coficarte.															Example: 1.
	 *
	 * @bodyParam	card_number									string			Le numéro de la coficarte.														Example: 4856 8796 8523 5421.
	 * @bodyParam	delivery_date								string			La date de livraison de la coficarte.											Example: 2024-06-06.
	 * @bodyParam	invoice_reference							string			La reférence de la facture de la coficarte.										Example: ddt-ds58-dds.
	 * @bodyParam	price										int				Le prix de la coficarte.														Example: 5000
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\CreditCard",
			requestData: $request->all(),
			validations: [
				"card_number" => "required|min_digits:10|max_digits:10|unique:credit_cards,card_number," . $id,
				"delivery_date" => "required|date",
				"invoice_reference" => "required",
				"price" => "required|numeric",
			],
			elementName: "La coficarte",
		);
	}

	/**
	 * Mettre à jour le prix de toute les coficartes
	 *
	 * @bodyParam	price										int				Le prix de la coficarte.														Example: 5000
	 *
	 * @response 200
	 *
	 */
	public function update_price(Request $request)
	{
		return $this->modelUpdate(
			modelId: CreditCard::first()->id,
			modelClass: "App\Models\CreditCard",
			requestData: $request->all(),
			validations: [
				"price" => "required|numeric",
			],
			elementName: "La coficarte",
			beforeCommit:function($model, $manualValidationsReturnData, $requestData){
				CreditCard::where('status', 'owned')->update(['price' => $requestData['price']]);
			}
		);
	}

	/**
	 * Supprime une coficarte
	 *
	 * @urlParam	id			int required			 L'ID de la coficarte.														  Example: 1
	 *
	 * @response 200
	 */
	public function destroy(int $id)
	{
		return $this->modelDelete(
			modelId: $id,
			modelClass: "App\Models\CreditCard",
			elementName: "La coficarte",
		);
	}

	public function statistiques(Request $request)
	{
		// dd($request->input());
		$start_date = $request->input('start_date')?$request->input('start_date') :  Carbon::now()->toDateString();
		$end_date = $request->input('end_date')? $request->input('end_date') :  Carbon::now()->toDateString();
		$connectedUser = $request->user();
		$userProfil = $connectedUser["profile"];

		// dd($userProfil);
		if($userProfil == "agency_head" ||$userProfil == "responsible_for_customer"){
		$cartes_de_agence_avant_date = DB::table('credit_cards')
			->join('users', 'credit_cards.possessor_id', '=', 'users.id')
			->join('agencies', 'users.agency_id', '=', 'agencies.id')
			->where('credit_cards.delivery_date', '<=', $end_date)
			->where('credit_cards.status', 'owned')
			->where('agencies.id', $connectedUser->agency_id) // Ajout de cette condition
			->select(DB::raw('count(*) as total'))
			->get();
		$cartes_de_agence = DB::select("SELECT COUNT(*) total
			FROM credit_cards cc 
			JOIN users u ON u.id = cc.possessor_id
			JOIN agencies a ON a.id = u.agency_id
			WHERE a.id = $connectedUser->agency_id
			AND cc.delivery_date BETWEEN ? AND ? 
			",[$start_date,$end_date]);
		
			$VenteAgence_a_date = DB::select("SELECT a.name as agence, SUM(s.sale_price) as montant 
			FROM users u
			JOIN sales s ON u.id = s.seller_id
			JOIN agencies a ON a.id = $connectedUser->agency_id
			WHERE s.unlock_status = 'unlocked'
			AND s.sale_date <= '$end_date'
			GROUP BY a.name
			");
			
			$VenteAgence = DB::select("SELECT a.name as agence, SUM(s.sale_price) as montant FROM users u
			JOIN sales s ON u.id = s.seller_id
			JOIN agencies a ON a.id =  $connectedUser->agency_id
			WHERE s.unlock_status = 'unlocked'
			AND s.sale_date BETWEEN ? AND ?
			GROUP BY a.name",[$start_date,$end_date]);
		// dd($cartes_de_agence);

			$nbr_carte_vendu_agence_a_date = DB::select("SELECT a.name as agence, COUNT(*) as total 
			FROM users u
			JOIN sales s ON u.id = s.seller_id
			JOIN agencies a ON a.id = $connectedUser->agency_id
			WHERE s.unlock_status = 'unlocked'
			AND s.agency_id = $connectedUser->agency_id
			AND s.sale_date <= '$end_date'
			GROUP BY a.name
			");
			// dd($nbr_carte_vendu_agence_a_date);

			$nbr_carte_vendu_agence = DB::select("SELECT a.name as agence, COUNT(*) as total 
			FROM users u
			JOIN sales s ON u.id = s.seller_id
			JOIN agencies a ON a.id =  $connectedUser->agency_id
			WHERE s.unlock_status = 'unlocked'
			AND s.agency_id = $connectedUser->agency_id
			AND s.sale_date BETWEEN ? AND ?
			GROUP BY a.name",[$start_date,$end_date]);
			// dd($nbr_carte_vendu_agence);
			$vente_agence = DB::select(
				"SELECT 
					DATE_FORMAT(sales.sale_date, '%Y-%m-%d') as month, 
					SUM(sales.sale_price) as mt_vendue,
					agencies.name as agence_name,
					users.name as cassiere_name,
					sales.sale_date
					FROM sales 
					INNER JOIN users ON sales.seller_id = users.id 
					INNER JOIN agencies ON agencies.id = users.agency_id
					-- WHERE users.name = '$connectedUser->name'
					WHERE agencies.id = '$connectedUser->agency_id'
					AND sales.sale_date <= '$end_date'
					GROUP BY month, agencies.name,users.name,sales.sale_date
					ORDER BY month ASC"
			);
			$vente_agence_a_date = DB::select(
				"SELECT 
					DATE_FORMAT(sales.sale_date, '%Y-%m-%d') as month, 
					SUM(sales.sale_price) as mt_vendue,
					agencies.name as agence_name,
					users.name as cassiere_name,
					sales.sale_date
					FROM sales 
					INNER JOIN users ON sales.seller_id = users.id 
					INNER JOIN agencies ON agencies.id = users.agency_id
					-- WHERE users.name = '$connectedUser->name'
					WHERE agencies.id = '$connectedUser->agency_id'
					AND sales.sale_date BETWEEN ? AND ?
					GROUP BY month, agencies.name,users.name,sales.sale_date
					ORDER BY month ASC"
			,[$start_date,$end_date]);

			// dd($vente_agence_a_date);
		}

		$stats = [];
		

		
		// dd($cartes_de_agence_avant_date[0]->total);

		$cartes_par_agence_avant_date = DB::table('credit_cards')
		->join('users', 'credit_cards.possessor_id', '=', 'users.id')
		->join('agencies', 'users.agency_id', '=', 'agencies.id')
		->where('credit_cards.delivery_date','<=', $end_date)
		->select('agencies.name as agency_name', DB::raw('count(*) as total'))
		->where('credit_cards.status','owned')
		->groupBy('agencies.name')
		->get();

		$cartes_par_agence = DB::select("SELECT a.name as agency_name, COUNT(*) total
		FROM credit_cards cc 
		JOIN users u ON u.id = cc.possessor_id
		JOIN agencies a ON a.id = u.agency_id
		-- WHERE cc.status = 'owned' OR cc.status = 'sold'
		AND cc.delivery_date BETWEEN ? AND ? 
		GROUP BY a.name ",[$start_date,$end_date]);

	
		$agencySales_a_date = DB::select("SELECT a.name as agence, SUM(s.sale_price) as montant 
		FROM users u
		JOIN sales s ON u.id = s.seller_id
		JOIN agencies a ON a.id = u.agency_id 
		WHERE s.unlock_status = 'unlocked'
		AND s.sale_date <= '$end_date'
		GROUP BY a.name");

		$agencySales = DB::select("SELECT a.name as agence, SUM(s.sale_price) as montant FROM users u
			JOIN sales s ON u.id = s.seller_id
			JOIN agencies a ON a.id = u.agency_id 
			WHERE s.unlock_status = 'unlocked'
			AND s.sale_date BETWEEN ? AND ?
			GROUP BY a.name",[$start_date,$end_date]);
	
		
		$vent_bessieux_a_date = DB::select(
			"SELECT 
				DATE_FORMAT(sales.sale_date, '%Y-%m') as month, 
				SUM(sales.sale_price) as mt_vendue,
				agencies.name as agence_name,
				users.name as cassiere_name,
				sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = 'Sonia Akome'
			AND sales.sale_date <= '$end_date'
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC"
		,);
	// dd($vent_bessieux_a_date);
		$vent_bessieux = DB::select('
			SELECT 
				DATE_FORMAT(sales.sale_date, "%Y-%m") as month, 
				SUM(sales.sale_price) as mt_vendue,
				agencies.name as agence_name,
				users.name as cassiere_name,
				sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = "Sonia Akome"
			AND sales.sale_date BETWEEN ? AND ?
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC
		', [$start_date, $end_date]);
	
		$vente_nzeng_a_date = DB::select(
			"SELECT 
				DATE_FORMAT(sales.sale_date, '%Y-%m') as month, 
				SUM(sales.sale_price) as mt_vendue,
				agencies.name as agence_name,
				users.name as cassiere_name,
				sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = 'Kelly MAGANGHE'
			AND sales.sale_date <= '$end_date'
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC"
		);

		$vente_nzeng = DB::select('
			SELECT 
				DATE_FORMAT(sales.sale_date, "%Y-%m-%d") as month, 
				SUM(sales.sale_price) as mt_vendue,
				agencies.name as agence_name,
				users.name as cassiere_name,
				sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = "Kelly MAGANGHE"
			AND sales.sale_date BETWEEN ? AND ?
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC
		', [$start_date, $end_date]);

		$vente_louis = DB::select(
		"SELECT 
			DATE_FORMAT(sales.sale_date, '%Y-%m-%d') as month, 
			SUM(sales.sale_price) as mt_vendue,
			agencies.name as agence_name,
			users.name as cassiere_name,
			sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = 'Marlene ENANGA'
			AND sales.sale_date <= '$end_date'
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC"
	);
		$vente_louis_a_date = DB::select('
			SELECT 
				DATE_FORMAT(sales.sale_date, "%Y-%m") as month, 
				SUM(sales.sale_price) as mt_vendue,
				agencies.name as agence_name,
				users.name as cassiere_name,
				sales.sale_date
			FROM sales 
			INNER JOIN users ON sales.seller_id = users.id 
			INNER JOIN agencies ON agencies.id = users.agency_id
			WHERE users.name = "Marlene ENANGA"
			AND sales.sale_date BETWEEN ? AND ?
			GROUP BY month, agencies.name,users.name,sales.sale_date
			ORDER BY month ASC
		', [$start_date, $end_date]);
	
		
		$sotk_a_date = CreditCard::where('delivery_date','<=',$end_date)->where('status','owned')->count();

		$stock_initiale = DB::select("SELECT COUNT(*) as total FROM credit_cards WHERE delivery_date BETWEEN ? AND ?", [$start_date, $end_date]);
		$total_stock_initial = $stock_initiale[0]->total ?? 0;
	
		$nbre_total_vendu = 0;

		$nrb_cartes_sale_pack_a_date = Sale::where('is_dotation', false)
		->where('unlock_status','unlocked')->where('sale_date','<=',$end_date)->count();
		$nrb_cartes_sale_pack = Sale::where('is_dotation', false)
		->where('unlock_status','unlocked')->where('sale_date','>=',$start_date)->where('sale_date','<=',$end_date)->count();
		$nrb_cartes_sale_hpack_a_date = Sale::where('is_dotation', true)
		->where('unlock_status','unlocked')->where('sale_date','<=',$end_date)->count();
		$nrb_cartes_sale_hpack = Sale::where('is_dotation', true)
		->where('unlock_status','unlocked')->where('sale_date','>=',$start_date)->where('sale_date','<=',$end_date)->count();
		$nbre_total_vendu = ($nrb_cartes_sale_pack == 0) 
		? $nrb_cartes_sale_pack_a_date + $nrb_cartes_sale_hpack_a_date 
		: $nrb_cartes_sale_pack + $nrb_cartes_sale_hpack;
		// dd($nbre_total_vendu);



		$montant_carte_vendues_hors_pack = DB::select('SELECT SUM(sales.sale_price) as total_vente FROM sales WHERE sales.is_dotation = false AND sales.unlock_status = "unlocked"');
		$montant_achat_hors_pack = DB::select('SELECT SUM(credit_cards.buy) as total_vente FROM sales JOIN credit_cards ON sales.credit_card_id = credit_cards.id  WHERE sales.is_dotation = false AND sales.unlock_status = "unlocked"');
		$montant_achat_pack = DB::select('SELECT SUM(credit_cards.buy) as total_vente FROM sales JOIN credit_cards ON sales.credit_card_id = credit_cards.id  WHERE sales.is_dotation = true AND sales.unlock_status = "unlocked"');
		$montant_carte_vendues_pack = DB::select('SELECT SUM(sales.sale_price) as total_vente FROM sales WHERE sales.is_dotation = true AND sales.unlock_status = "unlocked"');
		$montant_vendu_carte = $nbre_total_vendu * 11900;
		$montant_achat_cartes = $nbre_total_vendu * 5000;
		
		$benefices = $montant_vendu_carte - $montant_achat_cartes;
		if($montant_vendu_carte == 0){
			$taux_marge = 0;
		}else{
			$taux_marge = round(($benefices/$montant_vendu_carte) * 100,2);
		}
		// dd($vente_louis);
		// $montant_vendu_carte = $montant_carte_vendues_hors_pack[0]->total_vente;

		//Stock par agence
		// $stock_bessieux = DB::select("SELECT * FROM agencies a JOIN users u ON u.agency_id = a")
		$stats['cartes_par_agence'] = empty($cartes_par_agence) ? $cartes_par_agence_avant_date: $cartes_par_agence;
		$stats['cartes_vendues_par_agence'] = empty($agencySales) ? $agencySales_a_date: $agencySales;
		// dd($stats['cartes_vendues_par_agence']);
		$stats["stock"] = ($total_stock_initial == 0)? $sotk_a_date:$total_stock_initial;
		$stats["total_stock_initial"] = $total_stock_initial;
		$stats["nrb_cartes_sale_pack"] = $nrb_cartes_sale_pack;
		$stats["nrb_cartes_sale_hpack"] = $nrb_cartes_sale_hpack;
		$stats["montant_carte_vendues_hors_pack"] = $montant_carte_vendues_hors_pack;
		$stats["montant_carte_vendues_pack"] = $montant_carte_vendues_pack;
		$stats["montant_vendu_carte"] = $montant_vendu_carte;
		$stats["test"] = empty($vent_bessieux) ? $vent_bessieux_a_date : $vent_bessieux;
		$stats["test1"] = empty($vente_nzeng) ? $vente_nzeng_a_date : $vente_nzeng;
		$stats["test2"] = empty($vente_louis) ? $vente_louis_a_date : $vente_louis;
		$stats["taux_marge"] = $taux_marge;
		$stats["benefices"] = $benefices;
		$stats["nbre_total_vendu"] = $nbre_total_vendu;
		// dd($nbr_carte_vendu_agence);
		if($userProfil == "agency_head" ||$userProfil == "responsible_for_customer"){
		$stats["stok_agence"] = ($cartes_de_agence[0]->total == 0) ? $cartes_de_agence_avant_date[0]->total:$cartes_de_agence[0]->total;
		// $stats["cartes_vendu_agence"] = empty($nbr_carte_vendu_agence) ? $nbr_carte_vendu_agence_a_date[0]->total :$nbr_carte_vendu_agence[0]->total;
		$stats["cartes_vendu_agence"] = !empty($nbr_carte_vendu_agence) && isset($nbr_carte_vendu_agence[0]) 
		? $nbr_carte_vendu_agence[0]->total 
		: (!empty($nbr_carte_vendu_agence_a_date) && isset($nbr_carte_vendu_agence_a_date[0]) 
			? $nbr_carte_vendu_agence_a_date[0]->total 
			: 0);

		// $stats["montant_vendu_agence"] = empty($nbr_carte_vendu_agence) ? $nbr_carte_vendu_agence_a_date[0]->total * 11900 : $nbr_carte_vendu_agence[0]->total * 11900;
		$stats["montant_vendu_agence"] = !empty($nbr_carte_vendu_agence) && isset($nbr_carte_vendu_agence[0]) 
		? $nbr_carte_vendu_agence[0]->total * 11900
		: (!empty($nbr_carte_vendu_agence_a_date) && isset($nbr_carte_vendu_agence_a_date[0]) 
			? $nbr_carte_vendu_agence_a_date[0]->total *11900
			: 0);
		$stats["ventes_agences"] = empty($vente_agence) ?  $vente_agence_a_date : $vente_agence;
		}

		return response()->json($stats);

	}
}
