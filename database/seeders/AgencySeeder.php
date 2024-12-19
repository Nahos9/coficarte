<?php

namespace Database\Seeders;

use App\Models\Agency;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agencyDataList = [
            [
                "name" => "Siège",
                "abbreviation" => "S",
                "code" => "210",
            ],
            [
                "name" => "Agence Principale",
                "abbreviation" => "AGP",
                "code" => "211",
            ],
            [
                "name" => "Agence Agoé",
                "abbreviation" => "AAG",
                "code" => "212",
            ],
            [
                "name" => "Agence Adidogomé",
                "abbreviation" => "AAD",
                "code" => "213",
            ],
            [
                "name" => "Agence Akodésséwa",
                "abbreviation" => "AAK",
                "code" => "214",
            ],
        ];

        foreach($agencyDataList as $agencyData){
            Agency::factory(1)->create($agencyData)->first();
        }
    }
}
