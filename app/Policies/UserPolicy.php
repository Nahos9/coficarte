<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
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
				;
			}
			return null;
		}
	}

	public function viewAny(User $connectedUser)
	{
		return $this->check(["read"], "user", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function view(User $connectedUser, User $user)
	{
		if ($this->check(["read"], "user", $connectedUser)) {
			if ($connectedUser->id == $user->id) {
				return Response::allow();
			} else if ($connectedUser->profile == "marketing_manager") {
				if (in_array($user->profile, ["responsible_for_customer", "agency_head"])) {
					return Response::allow();
				}
			} else if ($connectedUser->profile == "audit_controller") {
				if (in_array($user->profile, ["marketing_manager", "responsible_for_customer", "agency_head"])) {
					return Response::allow();
				}
			} else if ($connectedUser->profile == "responsible_for_customer" && $user->profile = "responsible_for_customer" && $connectedUser->agency_id == $user->agency_id) {
				return Response::allow();
			}
		}
		return Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "user", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, User $user)
	{
		return $this->check(["update"], "user", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function update_password(User $connectedUser)
	{
		return $this->check(["update-password"], "user", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function delete(User $connectedUser, User $user)
	{
		return $this->check(["delete"], "user", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
