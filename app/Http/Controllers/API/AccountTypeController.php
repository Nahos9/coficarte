<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\AccountType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

/**
 * @group Type de compte
 *
 * EndPoints pour gérer les type de comptes
 */
class AccountTypeController extends Controller
{
	/**
	 * Affiche les types de compte
	 *
	 * @queryParam  name										string			Filtrer par nom du type de compte.													 No-example
	 *
	 * @queryParam  with_sales									string			Afficher les ventes du type de compte.												Example: false
	 *
	 * @queryParam  paginate									string			Utiliser la pagination.																Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', AccountType::class))->allowed()) {
			$list = AccountType::query();
			$requestData = $request->all();
			($search = $request->search) ? $list = $this->querySearch($list, ["name"], $search) : null;
			$list = $this->queryFilter($list, $requestData, "AccountType");
			$list = $this->queryRelationAdd($list, $requestData, "AccountType");
			return $this->responseIndexOk($list, $requestData, "AccountType");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}


	/**
	 * Affiche un type de compte
	 *
	 * @urlParam	id											int				L'ID du type de compte.															Example: 1.
	 *
	 * @queryParam  with_sales									string			Afficher les ventes du type de compte.											No-example
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = AccountType::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "AccountType");
				return $this->responseOk(["accountType" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "le type de compte n'existe pas"], 404);
		}
	}

	/**
	 * Créer un nouveau type de compte
	 *
	 * @bodyParam	name										string			  Le nom du type de compte.														Example: mawena
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		return $this->modelStore(
			modelClass: "App\Models\AccountType",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:account_types,name",
			],
		);
	}

	/**
	 * Mettre à jour un type de compte
	 *
	 * @urlParam	id										int		required	L'ID du type de compte.															Example: 1
	 *
	 * @bodyParam	name									string				Le nom du type de compte.														Example: mawena
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\AccountType",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:account_types,name," . $id,
			],
		);
	}

	/**
	 * Supprime un type de compte
	 *
	 * @urlParam	id										int		required	L'ID du type de compte.															Example: 1
	 *
	 * @response 200
	 */
	public function destroy(int $id)
	{
		return $this->modelDelete(
			modelId: $id,
			modelClass: "App\Models\AccountType",
		);
	}
}
