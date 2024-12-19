<?php

namespace App\Policies;

use App\Http\Traits\PermissionCheckerTrait;
use App\Models\Agency;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AgencyPolicy
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
        return $this->check(["read"], "agency", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function view(User $connectedUser, Agency $agency)
    {
        return $this->check(["read"], "agency", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function create(User $connectedUser)
    {
        return $this->check(["create"], "agency", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }

    public function update(User $connectedUser, Agency $agency)
    {
        return $this->check(["update"], "agency", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }
    public function delete(User $connectedUser, Agency $agency)
    {
        return $this->check(["delete"], "agency", $connectedUser) ? Response::allow() : Response::deny("Vous n'êtes pas autorisé à effectuer cette action");
    }
}
