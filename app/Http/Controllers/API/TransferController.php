<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CreditCard;
use App\Models\Transfer;
use App\Models\TransferDetail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;


/**
 * @group Transfert
 *
 * EndPoints pour gérer les transfert de coficarte
 */
class TransferController extends Controller
{
	/**
	 * Affiche les coficartes
	 *
	 * @queryParam	sender_id									string			Filtrer par ID de l'envoyeur.													 No-example.
	 * @queryParam	receiver_id									string			Filtrer par date de livraison de la coficarte.									 No-example.
	 * @queryParam	status										string			Filtrer par status du transfert.												 No-example.
	 *
	 * @queryParam	with_sender									string			Afficher l'initiateur du transfert.												 Example: false
	 * @queryParam	with_receiver								string			Afficher le receptioniste du transfert.											 Example: false
	 * @queryParam	with_transfer_details						string			Afficher les details du transfert.												 Example: false
	 *
	 * @queryParam  paginate									string			Utiliser la pagination.															 Example: false
	 *
	 * @response 200
	 */

	public function index(Request $request)
	{
		if (($authorisation = Gate::inspect('viewAny', Transfer::class))->allowed()) {
			$list = Transfer::query()
			->select('transfers.*') // Sélectionner tous les champs de la table transfers
            ->withCount(['transfer_details as nbr_carte_in_transfert' => function ($query) {
                $query->select(DB::raw('count(*)'));
            }]);
			// dd($list);
			$requestData = $request->all();
			$list = $this->queryFilter($list, $requestData, "Transfer");
			$list = $this->queryRelationAdd($list, $requestData, "Transfer");
			$list = $this->queryMultipeValvueFilter($list, $requestData, ["status" => ["w" => "waiting", "r" => "rejected", "c" => "canceled", "v" => "validated"]]);
			$connectedUser = $request->user();
			// $lastTransfert = Transfer::where('receiver_id', $connectedUser->id)
            //              ->orderBy('created_at', 'desc')
            //              ->first();
			// if(!is_null($lastTransfert)){
			// 	$nbr_carte_in_transfert = DB::select("SELECT count(*) as nbr_carte FROM transfers t  JOIN transfer_details td ON t.receiver_id = td.user_id WHERE td.transfer_id = $lastTransfert->id");
			// }
			
			// !is_null($transfers[0]->nbr_carte)?? $transfers[0]->nbr_carte;
			in_array($connectedUser->profile, ["responsible_for_customer", "agency_head"]) ? $list->where(function ($query) use ($connectedUser) {
				$query->where('sender_id', $connectedUser->id)->orWhere('receiver_id', $connectedUser->id);
			}) : null;
			
			// dd($list);

			return $this->responseIndexOk($list, $requestData, "Transfer");
		} else {
			return $this->responseError(["auth" => [$authorisation->message()]], 403);
		}
	}

	/**
	 * Affiche une coficarte
	 *
	 * @urlParam	id											int				L'ID de la coficarte.															 Example: 1.
	 *
	 * @queryParam	with_sender									string			Afficher l'initiateur du transfert.												 Example: false
	 * @queryParam	with_receiver								string			Afficher le receptioniste du transfert.											 Example: false
	 * @queryParam	with_transfer_details						string			Afficher les details du transfert.												 Example: false
	 *
	 * @response 200
	 */
	public function show(Request $request, int $id)
	{
		$model = Transfer::find($id);
		$requestData = $request->all();
		if ($model) {
			if (($authorisation = Gate::inspect('view', $model))->allowed()) {
				$model = $this->modelRelationLoad($model, $requestData, "Transfer");
				return $this->responseOk(["transfer" => $model]);
			} else {
				return $this->responseError(["auth" => [$authorisation->message()]], 403);
			}
		} else {
			return $this->responseError(["id" => "le transfert n'existe pas"], 404);
		}
	}


	/**
	 * Initier un transfert
	 *
	 * @bodyParam	receiver_id									int				L'ID du receptioniste du transfert.												 Example: 4
	 * @bodyParam	credit_card_id_list							array			Les ID des coficarte à transferer.												 Example: [1, 2, 3]
	 *
	 * @response 200
	 */
	public function store(Request $request)
	{
		//Pour les tableaux internes on a:
		//Le clé correspond au profil qui peut recevoir
		//La valeur correspond à savoir si l'envoyeur et le receptioniste doit être dans la même agence
		$transferProfilChecker = [
			"admin" => ["marketing_manager" => false, "agency_head" => false, "responsible_for_customer" => false],
			"marketing_manager" => ["agency_head" => false],
			"agency_head" => ["responsible_for_customer" => true, "marketing_manager" => false],
			"responsible_for_customer" => ["agency_head" => true],
			"audit_controller" => []
		];
		$connectedUser = $request->user();
		return $this->modelStore(
			modelClass: "App\Models\Transfer",
			requestData: $request->all(),
			validations: [
				"receiver_id" => "required|exists:users,id",
				"comment" => "nullable",
				"first_credit_card_number" => "required|exists:credit_cards,card_number",
				"last_credit_card_number" => "required|exists:credit_cards,card_number",
			],
			validationsText: [
				"exists" => "Cette coficarte n'existe pas"
			],
			manualValidations: function ($requestData) use ($transferProfilChecker, $connectedUser) {
				$receiver = User::find($requestData["receiver_id"]);
				$validationCallbackList = [
					function ($requestData, $connectedUser, $receiver) use ($transferProfilChecker) {
						return (array_key_exists($receiver->profile, $transferProfilChecker[$connectedUser->profile])) ? ["unauthorized" => false] : ["unauthorized" => true, "message" => "Votre profil ne vous permet pas d'effectuer de transfert à un $receiver->profile_fr"];
					},
					function ($requestData, $connectedUser, $receiver) use ($transferProfilChecker) {
						return ($transferProfilChecker[$connectedUser->profile][$receiver->profile] && $connectedUser->agency_id != $receiver->agency_id) ? ["unauthorized" => true, "message" => "Vous ne pouvez pas effectuer de transfert vers une autre agence"] : ["unauthorized" => false];
					},
				];
				foreach ($validationCallbackList as $validationCallback) {
					$validation = $validationCallback($requestData, $connectedUser, $receiver);
					if ($validation["unauthorized"]) {
						return [
							"errors" => [
								"status" => [$validation["message"]]
							],
							"status" => 401
						];
					}
				}
				return ["data" => ["credit_card_id_list" => CreditCard::where('card_number', '>=', $requestData["first_credit_card_number"])->where('card_number', '<=', $requestData["last_credit_card_number"])->where('possessor_id', $connectedUser->id)->get()->pluck('id')]];
			},
			beforeCreate: function ($requestData) use ($connectedUser) {
				$requestData["sender_id"] = $connectedUser->id;
				$requestData["status"] = "waiting";
				return $requestData;
			},
			beforeCommit: function ($model, $requestData, $manualValidationsData) {
				foreach ($manualValidationsData["credit_card_id_list"] as $creditCardId) {
					TransferDetail::create(["transfer_id" => $model->id, "credit_card_id" => $creditCardId,"user_id" => $requestData["receiver_id"]]);
				}
				return $model;
			},
			relations: ["with_transfer_details<credit_card" => "true", "with_receiver" => "true"],
		);
	}


	/**
	 * Traiter un transfert
	 *
	 * @urlParam	id											int				L'ID de la coficarte.															 Example: 1.
	 *
	 * @bodyParam	action										string			L'action à mener sur la transfert												 Example: validate
	 *
	 * @response 200
	 *
	 */
	public function trate(Request $request, int $id)
	{
		$requestData = $request->all();
		$connectedUser = $request->user();
		$transferRules = [
			"admin" => ["marketing_manager", "agency_head", "responsible_for_customer"],
			"marketing_manager" => ["agency_head"],
			"agency_head" => ["responsible_for_customer", "marketing_manager"],
			"responsible_for_customer" => ["agency_head"],
		];
		$actionChekerCallBack = [
			"validate" => function ($connectedUser, $model) {
				return ($connectedUser->id == $model->receiver_id) ? ["unauthorized" => false] : ["unauthorized" => true, "message" => "Vous n'êtes pas autorisé à valider ce transfert"];
			},
			"reject" => function ($connectedUser, $model) {
				return ($connectedUser->id == $model->receiver_id) ? ["unauthorized" => false] : ["unauthorized" => true, "message" => "Vous n'êtes pas autorisé à rejeter ce transfert"];
			},
			"cancel" => function ($connectedUser, $model) {
				return ($connectedUser->id == $model->sender_id) ? ["unauthorized" => false] : ["unauthorized" => true, "message" => "Vous n'êtes pas autorisé à annuler ce transfert"];
			},
		];
		return $this->modelUpdate(
			modelId: $id,
			modelClass: "App\Models\Transfer",
			requestData: $requestData,
			validations: [
				"action" => "required|in:validate,reject,cancel",
			],
			manualValidations: function ($requestData, $model) use ($connectedUser, $transferRules, $actionChekerCallBack) {
				if ($model->status != "waiting") {
					return [
						"errors" => [
							"status" => ["Ce transfert a déjà été traité"]
						],
						"status" => 400
					];
				}
				$validation = $actionChekerCallBack[$requestData["action"]]($connectedUser, $model);
				if ($validation["unauthorized"]) {
					return [
						"errors" => [
							"status" => [$validation["message"]]
						],
						"status" => 401
					];
				}
				if ($requestData["action"] == "validate") {
					$credit_card_list = [];
					$errors = [];
					$comp = 0;
					foreach ($model->transfer_details as $transferDetail) {
						$credit_card = CreditCard::find($transferDetail->credit_card_id);
						if ($credit_card->possessor_id == $model->sender->id) {
							$credit_card_list[] = $credit_card;
						} else {
							$errors["transfer_detail.$comp"] = ["L'initiateur du transfert ne detient plus la coficarte $credit_card->card_number"];
						}
						$comp++;
					}
					if ($errors) {
						return ["errors" => $errors];
					} else {
						return ["data" => ["credit_card_list" => $credit_card_list]];
					}
				}
			},
			beforeUpdate: function ($requestData, $model, $manualValidationsReturn) {
				if ($requestData["action"] == "validate") {
					foreach ($model->transfer_details as $transfertDetail) {
						$credit_card = CreditCard::find($transfertDetail->credit_card_id);
						$credit_card->update(["possessor_id" => $model->receiver_id]);
					}
				}
				return [
					"status" => ["validate" => "validated", "reject" => "rejected", "cancel" => "canceled"][$requestData["action"]],
				];
			},
			elementName: "Le transfert",
			authName: "trate",
			relations: ["with_transfer_details<credit_card" => "true"],
		);
	}
}
