<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;


/**
 * @group Utilisateur
 *
 * EndPoints pour gérer les utilisateurs
 */
class UserController extends Controller
{
	/**
	 * Affiche les utilisateurs
	 *
	 * @queryParam	name									string			Filtrer par nom de l'utilisateur.											No-example
	 * @queryParam	email									string			Filtrer par email de l'utilisateur.											No-example
	 * @queryParam	profile									string			Filtrer par profil de l'utilisateur.										No-example
	 * @queryParam	activated								string			Filtrer par activation de l'utilisateur.									No-example
	 * @queryParam	password_change_required				string			Filtrer par changement requis de mot de passe de l'utilisateur.				No-example
	 * @queryParam	agency_id								string			Filtrer par identifiant agence de l'utilisateur.							No-example
	 *
	 * @queryParam	with_agency								string			Afficher l'agence de l'utilisateur.											Example: false
	 * @queryParam	with_sales								string			Afficher les ventes de l'utilisateur.											Example: false
	 *
	 * @queryParam	paginate								string			Utiliser la pagination.														Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', User::class))->allowed()) {
			$list = User::query();
			$requestData = $request->all();
			($search = $request->search) ? $list = $this->querySearch($list, ["name", "email", "profile"], $search) : null;
			$list = $this->queryFilter($list, $requestData, "User");
			$list = $this->queryRelationAdd($list, $requestData, "User");
			$list = $this->queryRelationFilter($list, $requestData, "relation_filter_in_", "in");
			$list = $this->queryRelationFilter($list, $requestData, "relation_filter_not_in_", "notIn");
			$list = $this->queryMultipeValvueFilter($list, $requestData, ["profile" => ["a" => "admin", "rc" => "responsible_for_customer", "mm" => "marketing_manager", "ah" => "agency_head", "ac" => "audit_controller","c"=>"caf"]]);
			$connectedUser = $request->user();
			$connectedUser->profile == "audit_controller" ? $list->where('profile', '!=', 'admin') : null;
			// $connectedUser->profile == "marketing_manager" ? $list->where(function ($query) use ($connectedUser) {
			// 	$query->where('profile', 'agency_head');
			// }) : null;
			$connectedUser->profile == "agency_head" ? $list->where(function ($query) use ($connectedUser) {
				$query
					->where('id', $connectedUser->id)
					->orWhere('profile', 'marketing_manager')
					->orWhere(
						function ($query) use ($connectedUser) {
							$query->where('profile', 'responsible_for_customer')->where('agency_id', $connectedUser->agency_id);
						}
					)
					->orWhere(
						function ($query) use ($connectedUser) {
							$query->where('profile', 'caf')->where('agency_id', $connectedUser->agency_id);
						}
					)
				;
			}) : null;
			$connectedUser->profile == "responsible_for_customer" ? $list->where(function ($query) use ($connectedUser) {
				$query
					->where('id', $connectedUser->id)
					->orWhere(
						function ($query) use ($connectedUser) {
							$query->where('profile', 'agency_head')->where('agency_id', $connectedUser->agency_id);
						}
					)
				;
			}) : null;
			return $this->responseIndexOk($list, $requestData, "User");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}


	/**
	 * Affiche un utilisateur
	 *
	 * @urlParam	id										int				L'ID de l'utilisateur.															Example: 1.
	 *
	 * @queryParam	with_agency								string			Afficher l'agence de l'utilisateur.												Example: false
	 * @queryParam	with_sales								string			Afficher les ventes de l'utilisateur.											Example: false
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = User::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "User");
				return $this->responseOk(["user" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "l'utilisateur n'existe pas"], 404);
		}
	}

	/**
	 * Créer un nouvelle utilsateur
	 *
	 * @bodyParam	name									string				Le nom de l'utilisateur.													Example: mawena
	 * @bodyParam	email									string				L'email de l'utilisateur.													Example: charles.gamligo@cofinacorp.com
	 * @bodyParam	password								string				Le mot de passe de l'utilisateur.											Example: P@sse123
	 * @bodyParam	profile									string				Le profile de l'utilisateur.												Example: responsible_for_customer
	 * @bodyParam	activated								string				L'activation de l'utilisateur.												Example: 1
	 * @bodyParam	password_change_required				string				L'obligation de changer le mot de passe de l'utilisateur.					Example: 0
	 * @bodyParam	agency_id								string				L'identifiant agence de l'utilisateur.										Example: 1
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		// dd($request);
		return $this->modelStore(
			modelClass: "App\Models\User",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:users,name",
				"email" => "required|unique:users,email",
				"password" => "required|min:8",
				"profile" => "required|in:admin,responsible_for_customer,marketing_manager,agency_head,audit_controller,caf,ops",
				"activated" => "required|boolean",
				"password_change_required" => "required|boolean",
				"agency_id" => "required|exists:agencies,id",
			],
			beforeCreate:function($requestData, $model){
				if(isset($requestData["password"])){
					if($requestData["password"] == ""){
						unset($requestData["password"]);
					}else{
						$requestData["password"] = Hash::make($requestData["password"]);
					}
				}
				// dd($requestData);
				$user = [
					"subject" => "IDENTIFIANTS DE CONNEXION APPLICATION COFI CARTE",
					"name" => $requestData["name"],
					"login" => $requestData["email"],
					"password" => "P@sse123"
				];
				\Mail::to($requestData["email"])->send(new \App\Mail\UserMail($user));
				return $requestData;
			}
		);
	}

	/**
	 * Mettre à jour un utilisateur
	 *
	 * @urlParam	id										int	required		L'ID de l'utilisateur.															Example: 1
	 *
	 * @bodyParam	name									string				Le nom de l'utilisateur.														Example: mawena
	 * @bodyParam	email									string				L'email de l'utilisateur.														Example: charles.gamligo@cofinacorp.com
	 * @bodyParam	profile									string				Le profile de l'utilisateur.													Example: responsible_for_customer
	 * @bodyParam	activated								string				L'activation de l'utilisateur.													Example: 1
	 * @bodyParam	password_change_required				string				L'obligation de changer le mot de passe de l'utilisateur.						Example: 0
	 * @bodyParam	agency_id								string				L'identifiant agence de l'utilisateur.											Example: 1
	 *
	 * @response 200
	 *
	 */
	public function update(Request $request, int $id)
	{
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\User",
			requestData: $request->all(),
			validations: [
				"name" => "required|unique:users,name," . $id,
				"email" => "required|unique:users,email," . $id,
				"password" => "nullable|min:8",
				"profile" => "required|in:admin,responsible_for_customer,marketing_manager,agency_head,audit_controller",
				"activated" => "required|boolean",
				"password_change_required" => "required|boolean",
				"agency_id" => "required|exists:agencies,id",
			],
			beforeUpdate:function($requestData, $model){
				if(isset($requestData["password"])){
					if($requestData["password"] == ""){
						unset($requestData["password"]);
					}else{
						$requestData["password"] = Hash::make($requestData["password"]);
					}
				}
				return $requestData;
			}
		);
	}

	/**
	 * Mettre à jour le mot de passe de l'utilisateur connecté utilisateur
	 *
	 * @bodyParam	old_password							string	required	L'ancien mot de passe de l'utilisateur.										No-example
	 * @bodyParam	new_password							string	required	Le nouveau mot de passe de l'utilisateur.									No-example
	 * @bodyParam	new_password_confirmation				string	required	La confirmation du nouveau mot de passe de l'utilisateur.					No-example
	 *
	 * @response 200
	 *
	 */
	public function update_password(Request $request)
	{
		$model = $request->user();
		return $this->modelUpdate(
			modelId: $model->id,
			modelClass: "App\Models\User",
			requestData: $request->all(),
			validations: [
				"old_password" => 'required|min:2',
				"new_password" => 'required|min:8',
				"new_password_confirmation" => 'required|min:8|same:new_password',
			],
			validationsText: [
				"same" => "Ce mot de passe est différent"
			],
			manualValidations: function ($requestData, $model) {
				if (Hash::check($requestData["old_password"], $model->password)) {
					return [
						"data" => ["user" => $model]
					];
				} else {
					return [
						"errors" => ["old_password" => ["Ancien mot de passe incorect"]],
						"status" => 403
					];
				}
			},
			beforeUpdate: function ($requestData) {
				return [
					"password" => Hash::make($requestData["new_password"]),
					"password_change_required" => false
				];
			},
			afterUpdate: function ($requestData) use ($model) {
				$model->tokens()->each(function ($token, $key) {
					$token->delete();
				});
				// return $model;
			},
			authName: "update_password"
		);
	}

	/**
	 * Supprime un utilisateur
	 *
	 * @urlParam	id			int required			L'ID de l'utilisateur.															Example: 1
	 *
	 * @response 200
	 */
	public function destroy(int $id)
	{
		return $this->modelDelete(
			modelId: $id,
			modelClass: "App\Models\User",
		);
	}
}
