<?php

namespace Database\Seeders;

use App\Models\CreditCard;
use App\Models\Lot;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CreditCardSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$user = User::where('profile', 'marketing_manager')->first();
		for ($i = 0; $i < 5; $i++) {
			$lot = Lot::create(["first_card_number" => 0]);
			$creditCardList = CreditCard::factory(25)->create(["receptionist_id" => $user->id, "possessor_id" => $user->id, "lot_id" => $lot->id]);
			$lot->update(["first_card_number" => $creditCardList[0]->card_number]);
		}
	}
}
