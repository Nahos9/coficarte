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
                "name" => "Agence Bessieux",
                "abbreviation" => "AGP",
                "code" => "211",
            ],
            [
                "name" => "Agence Léon MBA",
                "abbreviation" => "AAG",
                "code" => "212",
            ],
            [
                "name" => "Agence Louis",
                "abbreviation" => "AAD",
                "code" => "213",
            ],
            [
                "name" => "Agence Nzeng-Ayong",
                "abbreviation" => "AAK",
                "code" => "214",
            ],
            [
                "name" => "Agence PK12",
                "abbreviation" => "AAK1",
                "code" => "215",
            ],
        ];

        foreach($agencyDataList as $agencyData){
            Agency::factory(1)->create($agencyData)->first();
        }
    }
}
