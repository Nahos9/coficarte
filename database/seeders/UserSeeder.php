<?php

namespace Database\Seeders;

use App\Models\Agency;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$agencies = [];
		$agencies["210"] = Agency::where("code", "210")->first();
		$agencies["211"] = Agency::where("code", "211")->first();
		$agencies["212"] = Agency::where("code", "212")->first();
		$agencies["213"] = Agency::where("code", "213")->first();
		$agencies["214"] = Agency::where("code", "214")->first();

		// foreach ($agencies as $agency_code => $agency) {
		// 	User::factory(1)->create(["name" => "agency_head_$agency_code", "profile" => "agency_head", "password" => Hash::make("P@sse123"), "password_change_required" => false, "activated" => true, "email" => "agency_head_$agency_code@cofinacorp.com", "agency_id" => $agency->id])->first();
		// 	foreach ([1, 2, 3, 4, 5] as $responsible_for_customer_id) {
		// 		User::factory(1)->create(["name" => "responsible_for_customer_$agency_code" . "_$responsible_for_customer_id", "profile" => "responsible_for_customer", "password" => Hash::make("P@sse123"), "password_change_required" => false, "activated" => true, "email" => "responsible_for_customer_$agency_code" . "_$responsible_for_customer_id@cofinacorp.com", "agency_id" => $agency->id])->first();
		// 	}
		// }

		// $plainTextToken = $marketing_manager->createToken("auth-token")->plainTextToken;
		// DB::update("update personal_access_tokens set TOKEN = '8fb55a1d50842403ddc4ea7dc0c80a5d2e44eeb029f1077341babd46b68fe0ba' where ID = 1");
		// $plainTextToken = "1|c96jDUWBogbtZRsU6Oo9ZbzL3ZB5ry2spd3PC5RHd9464644";
		// $file = public_path('../.env');
		// $lines = file($file);

		// if (count($lines) >= 1) {
		// 	$lines[count($lines) - 1] = "SCRIBE_AUTH_KEY=$plainTextToken\n";

		// 	// Réécrire le contenu modifié dans le fichier
		// 	file_put_contents($file, implode('', $lines));
		// } else {
		// 	// Gérer le cas où le fichier n'a pas assez de lignes
		// 	echo "Le fichier ne contient pas suffisamment de lignes pour effectuer le remplacement.";
		// }

		// echo "marketing_manager Token: " . $plainTextToken . "\n";
		$userList = [
			["name" => "Charles GAMLIGO", "email" => "charles.gamligo@cofinacorp.com", "agency_id" => 1, "profile" => "admin", "password" => "Coftg@20$*21ù!ad"],
			["name" => "AMADOU DIOP MAR", "email" => "amadou.diop@cofinacorp.com", "agency_id" => 1, "profile" => "admin", "password" => "Coftg@20$*21ù!ad"],
			["name" => "Claude KONOU", "email" => "claude.konou@cofinacorp.com", "agency_id" => 1, "profile" => "admin", "password" => "Coftg@20$*21ù!ad"],
			["name" => "Pedro Lonsosou KOZON", "email" => "lonsosou.kozon@cofinacorp.com", "agency_id" => 1, "profile" => "admin", "password" => "Coftg@20$*21ù!ad"],

			["name" => "Mahéva T. Geneviève BEHANZIN - PIETRI", "email" => "maheva.behanzin-pietri@cofinacorp.com", "agency_id" => 1, "profile" => "audit_controller", "password" => "P@sse123"],
			["name" => "Ekoe Fabrice KOUSSAWO", "email" => "fabrice.koussawo@cofinacorp.com", "agency_id" => 1, "profile" => "audit_controller", "password" => "P@sse123"],
			["name" => "Migbodji YEBESSE", "email" => "migbodji.yebesse@cofinacorp.com", "agency_id" => 1, "profile" => "audit_controller", "password" => "P@sse123"],
			["name" => "Charles Tokpon Viwuma DOSSOU", "email" => "charles.dossou@cofinacorp.com", "agency_id" => 1, "profile" => "audit_controller", "password" => "P@sse123"],

			["name" => "Lynda SOWU", "email" => "lynda.sowu@cofinacorp.com", "agency_id" => 1, "profile" => "marketing_manager", "password" => "P@sse123"],

			["name" => "Ayi Mawulolo YEBOVI", "email" => "mawulolo.yebovi@cofinacorp.com", "agency_id" => 2, "profile" => "agency_head", "password" => "P@sse123"],
			["name" => "Mouyidine Kayode TSOUMA", "email" => "mouyidine.tsouma@cofinacorp.com", "agency_id" => 3, "profile" => "agency_head", "password" => "P@sse123"],
			["name" => "Ayao Mawuégnégan BOSSOU", "email" => "ayao.bossou@cofinacorp.com", "agency_id" => 4, "profile" => "agency_head", "password" => "P@sse123"],
			["name" => "Sambiani KOMBATE", "email" => "sambiani.kombate@cofinacorp.com", "agency_id" => 5, "profile" => "agency_head", "password" => "P@sse123"],

			["name" => "Christian Homba AKALA", "email" => 
			"christian.akala@cofinacorp.com"
			, "agency_id" => 2, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Kavegue Belinda KAVEGUE", "email" => 
			"belinda.kavegue@cofinacorp.com"
			, "agency_id" => 2, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Adjo Massan NUKUNU", "email" => 
			"adjo-massan.nukunu@cofinacorp.com"
			, "agency_id" => 2, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			
			["name" => "Jordi ASSOGBA", "email" => 
			"jordi.assogba@cofinacorp.com"
			, "agency_id" => 3, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Hornelia ATTIKOSSI", "email" => 
			"hornelia.attikossi@cofinacorp.com"
			, "agency_id" => 3, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Afi Reine SATCHI", "email" => 
			"afi-reine.satchi@cofinacorp.com"
			, "agency_id" => 3, "profile" => "responsible_for_customer", "password" => "P@sse123"],

			["name" => "Essi Pleasure TOGBEY", "email" => 
			"pleasure.togbey@cofinacorp.com"
			, "agency_id" => 4, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Isso Dénis TACHIDA", "email" => 
			"denis.tatchida@cofinacorp.com"
			, "agency_id" => 4, "profile" => "responsible_for_customer", "password" => "P@sse123"],

			["name" => "Diane ABIASSI", "email" => 
			"diane.abiassi@cofinacorp.com"
			, "agency_id" => 5, "profile" => "responsible_for_customer", "password" => "P@sse123"],
			["name" => "Ambah Essumata Maba JOHNSON", "email" => 
			"ambah.johnson@cofinacorp.com"
			, "agency_id" => 5, "profile" => "responsible_for_customer", "password" => "P@sse123"],
		];

		foreach ($userList as $user) {
			User::factory(1)->create(["name" => $user["name"], "profile" => $user["profile"], "password" => Hash::make($user["password"]), "password_change_required" => true, "activated" => true, "email" => $user["email"], "agency_id" => $user["agency_id"]])->first();
		}
	}
}
