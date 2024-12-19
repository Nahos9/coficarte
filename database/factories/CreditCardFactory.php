<?php

namespace Database\Factories;

use App\Models\Lot;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CreditCard>
 */
class CreditCardFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition(): array
	{
		$user = User::where('profile', 'marketing_manager')->first();
		$lot = Lot::first();
		return [
			"card_number" => $this->faker->numerify('00########'),
			"delivery_date" => "2024-03-03",
			"expiration_date" => "2040-03-03",
			"invoice_reference" => $this->faker->numerify('INV-####-####'),
			"receptionist_id" => $user->id,
			"possessor_id" => $user->id,
			"lot_id" => $lot->id,
			"status" => "owned",
			"price" => 5000,
		];
	}
}
