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
        foreach(["Pack Maestro", "Pack Digital",	"Pack Solo", "Pack Pro", "Pack Privilège", "Pack Gold", "Pack Staff", "Pack Woezon", "Walking Customer", ] as $name){
			AccountType::factory(1)->create(["name" => $name]);
		}
    }
}
