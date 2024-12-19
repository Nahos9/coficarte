<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\AgencySeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	/**
	 * Seed the application's database.
	 */
	public function run(): void
	{
		$this->call(AgencySeeder::class);
		$this->call(UserSeeder::class);
		// $this->call(CreditCardSeeder::class);
		$this->call(AccountTypeSeeder::class);
	}
}
