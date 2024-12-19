<?php

namespace App\Policies;

use App\Models\User;
use App\Models\CreditCard;
use Illuminate\Auth\Access\Response;
use App\Http\Traits\PermissionCheckerTrait;

class CreditCardPolicy
{
	use PermissionCheckerTrait;
	public function before(User $connectedUser, string $ability)
	{
		if ($connectedUser->profile == "admin") {
			return Response::allow();
		} else {
			foreach ($connectedUser->ability_rules as $ability_rule) {
				if ($ability_rule["subject"] == "all" && $ability_rule["action"] == "manage") {
					return Response::allow();
				}
			}
			return null;
		}
	}

	public function viewAny(User $connectedUser)
	{
		return $this->check(["read", "historical"], "credit-card", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, CreditCard $credit_card)
	{
		if (!$this->check(["read", "historical"], "credit-card", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		$profileBlockCheckList = [
			'responsible_for_customer' => $credit_card->possessor_id != $connectedUser->id,
			'marketing_manager' => false,
			'agency_head' => $credit_card->possessor->agency_id != $connectedUser->agency_id,
			'audit_controller' => false,
		];
		if ($profileBlockCheckList[$connectedUser->profile]) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return Response::allow();
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "credit-card", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, CreditCard $credit_card)
	{
		return $this->check(["update"], "credit-card", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function delete(User $connectedUser, CreditCard $credit_card)
	{
		return $this->check(["delete"], "credit-card", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
