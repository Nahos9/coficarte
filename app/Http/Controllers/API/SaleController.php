<?php

namespace App\Http\Controllers\API;

use App\Exports\SalesExcel;
use App\Http\Controllers\Controller;
use App\Models\CreditCard;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Maatwebsite\Excel\Facades\Excel;

/**
 * @group Ventes
 *
 * EndPoints pour gérer les ventes
 */
class SaleController extends Controller
{
	/**
	 * Affiche les ventes
	 *
	 * @queryParam  sale_date									string			Filtrer par Date de la vente.													 No-example
	 * @queryParam  credit_card_id								string			Filtrer par ID de la carte de la vente.											 No-example
	 * @queryParam  number_id									string			Filtrer par Numero ID de la vente.												 No-example
	 * @queryParam  customer_type								string			Filtrer par Type de client de la vente.											 No-example
	 * @queryParam  customer_name								string			Filtrer par Nom du client de la vente.											 No-example
	 * @queryParam  account_number								string			Filtrer par Numero de compte de la vente.										 No-example
	 * @queryParam  account_type_id								string			Filtrer par Type de compte de la vente.											 No-example
	 * @queryParam  comment										string			Filtrer par commentaire de la vente.											 No-example
	 * @queryParam  seller_id									string			Filtrer par ID du vendeur de la vente.											 No-example
	 * @queryParam  unlock_status								string			Filtrer par status de verouillage de la vente.									 No-example
	 * @queryParam  sale_price									int				Filtrer par prix de vente.														 No-example
	 * @queryParam  customer_phone_number						string			Filtrer par numéro de téléphone du client.										 No-example
	 *
	 * @queryParam  with_credit_card							string			Afficher la carte de la vente.													Example: false
	 * @queryParam  with_account_type							string			Afficher le type de compte de la vente.											Example: false
	 * @queryParam  with_seller									string			Afficher le vendeur de la vente.												Example: false
	 *
	 * @queryParam  paginate									string			Utiliser la pagination.															Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', Sale::class))->allowed()) {
			$list = Sale::query();
			$requestData = $request->all();
			($search = $request->search) ? $list = $this->querySearch($list, ["email"], $search) : null;
			$list = $this->queryFilter($list, $requestData, "Sale");
			$list = $this->queryRelationAdd($list, $requestData, "Sale");

			$connectedUser = $request->user();
			$connectedUser->profile == "responsible_for_customer" ? $list->where('seller_id', $connectedUser->id) : null;
			$connectedUser->profile == "agency_head" ? $list->whereHas("seller", function ($query) use ($connectedUser) {
				$query->where('agency_id', $connectedUser->agency_id);
			}) : null;

			return $this->responseIndexOk($list, $requestData, "Sale");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}


	/**
	 * Affiche une vente
	 *
	 * @urlParam	id											int				L'ID de la vente.															Example: 1.
	 *
	 * @queryParam  with_credit_card							string			Afficher la carte de la vente.													Example: false
	 * @queryParam  with_account_type							string			Afficher le type de compte de la vente.											Example: false
	 * @queryParam  with_seller									string			Afficher le vendeur de la vente.												Example: false
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = Sale::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "Sale");
				return $this->responseOk(["sale" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "la vente n'existe pas"], 404);
		}
	}

	/**
	 * Télécharger les ventes en format excel
	 * 
	 * @response 200
	 */
	public function download(Request $request){
		return Excel::download(new SalesExcel, 'sales.xlsx');
	}

	/**
	 * Créer une nouvelle vente
	 * 
	 * @bodyParam	sale_date									string			La Date de la vente.													Example: 2024-05-05
	 * @bodyParam	credit_card_id								string			L'ID de la carte de la vente.											Example: 1
	 * @bodyParam	number_id									string			Le Numero ID de la vente.												Example: 5846
	 * @bodyParam	customer_type								string			Le Type de client de la vente.											Example: business
	 * @bodyParam	customer_name								string			Le Nom du client de la vente.											Example: Albert Eisntein
	 * @bodyParam	account_number								string			Le Numero de compte de la vente.										Example: 251458965001
	 * @bodyParam	account_type_id								string			Le Type de compte de la vente.											Example: 1
	 * @bodyParam	comment										string			Le commentaire de la vente.											 	Example: RAS
	 * @bodyParam	customer_phone_number						string			Le numéro de téléphone du client.									 	Example: +228 90 90 90 90
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		$connectedUser = $request->user();
		return $this->modelStore(
			modelClass: "App\Models\Sale",
			requestData: $request->all(),
			validations: [
				"sale_date" => "required|date",
				"credit_card_id" => "required|unique:sales,credit_card_id",
				"number_id" => "required|min_digits:4|max_digits:4",
				"customer_type" => "required|in:business,particular",
				"customer_name" => "required|min:2",
				"account_number" => "nullable|min_digits:12",
				// "account_type_id" => "required|exists:account_types,id",
				"customer_phone_number" => "required|min:2",
				"is_dotation" => "nullable|boolean"
			],
			manualValidations: function ($requestData) use ($connectedUser) {
				$creditCard = CreditCard::find($requestData["credit_card_id"]);
				if ($creditCard->possessor_id != $connectedUser->id) {
					return [
						"errors" => ["auth" => ["Vous ne possédez pas cette carte."]]
					];
				}
			},
			beforeCreate: function ($requestData) use ($connectedUser) {
				$requestData["seller_id"] = $connectedUser->id;
				$requestData["agency_id"] = $connectedUser->agency_id;
				$requestData["unlock_status"] = "locked";
				$requestData["sale_price"] = CreditCard::find($requestData["credit_card_id"])->price;
				return $requestData;
			},
			beforeCommit: function ($model, $requestData) {
				$creditCard = $model->credit_card;
				$creditCard->update(["status" => "sold"]);
				return $model;
			},
			relations: ["with_credit_card" => "true", "with_account_type" => "true", "with_seller" => "true"]
		);
	}

	/**
	 * Mettre à jour une vente
	 *
	 * @urlParam	id											int	required	L'ID de la vente.														Example: 1
	 *
	 * @bodyParam	sale_date									string			La Date de la vente.													Example: 2024-05-05
	 * @bodyParam	credit_card_id								string			L'ID de la carte de la vente.											Example: 1
	 * @bodyParam	number_id									string			Le Numero ID de la vente.												Example: 5846
	 * @bodyParam	customer_type								string			Le Type de client de la vente.											Example: business
	 * @bodyParam	customer_name								string			Le Nom du client de la vente.											Example: Albert Eisntein
	 * @bodyParam	account_number								string			Le Numero de compte de la vente.										Example: 251458965001
	 * @bodyParam	account_type_id								string			Le Type de compte de la vente.											Example: 1
	 * @bodyParam	comment										string			Le commentaire de la vente.											 	Example: RAS
	 * @bodyParam	customer_phone_number						string			Le numéro de téléphone du client.									 	Example: +228 90 90 90 90
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		$connectedUser = $request->user();
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\Sale",
			requestData: $request->all(),
			validations: [
				"sale_date" => "required|date",
				"credit_card_id" => "required|unique:sales,credit_card_id," . $id,
				"number_id" => "required|min_digits:4|max_digits:4",
				"customer_type" => "required|in:business,particular",
				"customer_name" => "required|min:2",
				"account_number" => "nullable|min_digits:12",
				"account_type_id" => "required|exists:account_types,id",
				"customer_phone_number" => "required|min:2",
			],
			manualValidations: function ($requestData) use ($connectedUser) {
				$creditCard = CreditCard::find($requestData["credit_card_id"]);
				if ($creditCard->possessor_id != $connectedUser->id) {
					return [
						"errors" => ["auth" => ["Vous ne possédez pas cette carte."]]
					];
				}
			},
			beforeUpdate: function ($requestData) {
				$requestData["unlock_status"] = "locked";
				$requestData["sale_price"] = CreditCard::find($requestData["credit_card_id"])->price;
				return $requestData;
			},
			beforeCommit: function ($model) {
				$creditCard = $model->credit_card;
				$creditCard->update(["status" => "sold"]);
				return $model;
			},
			relations: ["with_credit_card" => "true", "with_account_type" => "true", "with_seller" => "true"]
		);
	}


	/**
	 * Débloquer une vente
	 *
	 * @urlParam	id										int		required	L'ID de la vente.															Example: 1
	 *
	 * @response 200
	 *
	 */
	public function unlock(Request $request, int $id)
	{
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\Sale",
			requestData: $request->all(),
			beforeUpdate: function () {
				return ["unlock_status" => "unlocked"];
			},
			beforeCommit: function ($model, $requestData) {
				$creditCard = $model->credit_card;
				$creditCard->update(["status" => "sold"]);
				return $model;
			},
			authName: "unblock"
		);
	}

	/**
	 * Supprime une vente
	 *
	 * @urlParam	id										int		required	L'ID de la vente.															Example: 1
	 *
	 * @response 200
	 */
	public function destroy(int $id)
	{
		return $this->modelDelete(
			modelId: $id,
			modelClass: "App\Models\Sale",
		);
	}
}
