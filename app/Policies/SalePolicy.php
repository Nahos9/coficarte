<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\Sale;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SalePolicy
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
		return $this->check(["read"], "sale", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, Sale $sale)
	{
		$check = true;
		if (!$this->check(["read"], "sale", $connectedUser)) {
			$check = false;
		}

		$second_check_callback = [
			'responsible_for_customer' => function ($connected_user, $sale) {
				return $sale->seller_id == $connected_user->id;
			},
			'marketing_manager' => function ($connected_user, $sale) {
				return true;
			},
			'agency_head' => function ($connected_user, $sale) {
				return $sale->seller->agency_id == $connected_user->agency_id;
			},
			'audit_controller' => function ($connected_user, $sale) {
				return true;
			}
		];
		if (!$second_check_callback[$connectedUser->profile]($connectedUser, $sale)) {
			$check = false;
		}

		return $check ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "sale", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function update(User $connectedUser, Sale $sale)
	{
		$check = $this->check(["update"], "sale", $connectedUser);
		$check = $check ? $sale->unlock_status == "unlocked" : $check;
		$check = $check ? $sale->seller_id == $connectedUser->id : $check;
		return $check ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function unblock(User $connectedUser, Sale $sale)
	{
		return $this->check(["unblock"], "sale", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function delete(User $connectedUser, Sale $sale)
	{
		return $this->check(["delete"], "sale", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
