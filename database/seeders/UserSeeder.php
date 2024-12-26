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
		$agencies["215"] = Agency::where("code", "215")->first();

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
			["name" => "Nahos IGALO MOUSSAVOU", "email" => "nahos.igalo@cofinacorp.com", "agency_id" => 1, "profile" => "admin", "password" => "P@sse123"],
			["name" => "Sophie", "email" => "sophie.ampoumet@cofinacorp.com", "agency_id" => 1, "profile" => "marketing_manager", "password" => "P@sse123"],
		];

		foreach ($userList as $user) {
			User::factory(1)->create(["name" => $user["name"], "profile" => $user["profile"], "password" => Hash::make($user["password"]), "password_change_required" => true, "activated" => true, "email" => $user["email"], "agency_id" => $user["agency_id"]])->first();
		}
	}
}
