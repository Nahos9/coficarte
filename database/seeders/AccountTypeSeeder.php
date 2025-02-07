<?php

namespace Database\Seeders;

use App\Models\AccountType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccountTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach(["Pack Maestro", "Pack à la carte",	"Pack VIP", "Pack PRO", "Pack BUSINESS", "Pack BUSINESS GOLD"] as $name){
			AccountType::factory(1)->create(["name" => $name]);
		}
    }
}
