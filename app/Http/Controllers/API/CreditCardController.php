<?php

namespace App\Http\Controllers\API;

use App\Models\Lot;
use App\Models\User;
use App\Models\CreditCard;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

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
}
