<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Agency;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Knuckles\Scribe\Attributes\Response;
use Knuckles\Scribe\Attributes\UrlParam;

/**
 * @group Agence
 *
 * EndPoints pour gérer les agences
 */
class AgencyController extends Controller
{
	/**
	 * Affiche les agences
	 *
	 * @queryParam	name										string			Filtrer par nom de l'agence.													 No-example.
	 * @queryParam	abbreviation								string			Filtrer par abbréviation de l'agence.											 No-example.
	 * @queryParam	code										string			Filtrer par code de l'agence.													 No-example.
	 *
	 * @queryParam  with_users                                  int             Afficher les utilisateur de l'agence.                                            Example: false
	 *
	 * @queryParam  paginate									int			    Utiliser la pagination.															 Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', Agency::class))->allowed()) {
			$list = Agency::query();
			$requestData = $request->all();
			($search = $request->search) ? $list = $this->querySearch($list, ["name", "abbreviation", "code"], $search) : null;
			$list = $this->queryFilter($list, $requestData, "Agency");
			$list = $this->queryRelationAdd($list, $requestData, "Agency");

			// $currentAgency = $request->agency();
			// $currentAgency->profile == "client" ? $list->where('client_id', $currentAgency->id) : null;
			return $this->responseIndexOk($list, $requestData, "Agency");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}


	/**
	 * Affiche une agence
	 *
	 * @urlParam	id											int			 L'ID de l'agence.																	Example: 1.
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = Agency::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "Agency");
				return $this->responseOk(["agency" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "l'agence n'existe pas"], 404);
		}
	}

	/**
	 * Créer une nouvelle agence
	 *
	 * @bodyParam	name										string			Le nom de l'agence.																Example: Agence Zanguéra
	 * @bodyParam	abbreviation								string			L'abbréviation de l'agence.														Example: AZG
	 * @bodyParam	code										string			Le code de l'agence.															Example: 215
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		return $this->modelStore(
			modelClass: "App\Models\Agency",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:agencies,name",
				"abbreviation" => "required|unique:agencies,abbreviation",
				"code" => "required|unique:agencies,code",
			],
		);
	}

	/**
	 * Mettre à jour une agence
	 *
	 * @urlParam	id											int			    L'ID de l'agence.														        Example: 1.
	 *
	 * @bodyParam	name										string			Le nom de l'agence.																Example: Agence Zanguera
	 * @bodyParam	abbreviation								string			L'abbréviation de l'agence.														Example: AZG
	 * @bodyParam	code										string			Le code de l'agence.															Example: 216
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\Agency",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:agencies,name," . $id,
				"abbreviation" => "required|unique:agencies,abbreviation," . $id,
				"code" => "required|unique:agencies,code," . $id,
			],
		);
	}

	/**
	 * Supprime une agence
	 */
	#[UrlParam("id", "int", "L'ID de l'agence", required: true, example: 1)]
	#[Response([
		"id" => 4,
		"name" => "Jessica Jones",
		"roles" => ["admin"],
	])]
	public function destroy(int $id)
	{
		return $this->modelDelete(
			modelId: $id,
			modelClass: "App\Models\Agency",
		);
	}
}
