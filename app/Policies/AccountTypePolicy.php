<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\AccountType;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AccountTypePolicy
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
		return $this->check(["read", "historical"], "account-type", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	
	public function view(User $connectedUser, AccountType $accountType)
	{
		return $this->check(["read", "historical"], "account-type", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function create(User $connectedUser)
	{
		return $this->check(["create"], "account-type", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}

	public function update(User $connectedUser, AccountType $accountType)
	{
		return $this->check(["update"], "account-type", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
	public function delete(User $connectedUser, AccountType $accountType)
	{
		return $this->check(["delete"], "account-type", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
	}
}
