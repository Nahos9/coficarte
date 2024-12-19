<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Transfer;
use Illuminate\Auth\Access\Response;
use App\Http\Traits\PermissionCheckerTrait;

class TransferPolicy
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
		return $this->check(["read"], "transfer", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, Transfer $transfer)
	{
		if (!$this->check(["read"], "transfer", $connectedUser)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		$second_check_callback = [
			'responsible_for_customer' => function ($connected_user, $transfer) {
				return $transfer->sender_id == $connected_user->id || $transfer->receiver_id == $connected_user->id;
			},
			'marketing_manager' => function ($connected_user, $transfer) {
				return true;
			},
			'agency_head' => function ($connected_user, $transfer) {
				return $transfer->sender->agency_id == $connected_user->agency_id || $transfer->receiver->agency_id == $connected_user->agency_id;
			},
			'audit_controller' => function ($connected_user, $transfer) {
				return true;
			}
		];
		if (!$second_check_callback[$connectedUser->profile]($connectedUser, $transfer)) {
			return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
		}
		return Response::allow();
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "transfer", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, Transfer $transfer)
	{
		return $this->check(["update"], "transfer", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function trate(User $connectedUser, Transfer $transfer)
	{
		$checkList = [
			function ($connectedUser, $transfer) {
				return !$this->check(["trate"], "transfer", $connectedUser);
			},
			function ($connectedUser, $transfer) {
				return !($transfer->sender_id != $connectedUser->id || $transfer->receiver_id != $connectedUser->id);
			}
		];
		foreach ($checkList as $check) {
			if ($check($connectedUser, $transfer)) {
				return Response::deny("Vous n'êtes pas autorisé à effectuer cette actions");
			}
		}
		return Response::allow();
	}
	public function delete(User $connectedUser, Transfer $transfer)
	{
		return $this->check(["delete"], "transfer", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
