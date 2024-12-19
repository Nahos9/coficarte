<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('credit_cards', function (Blueprint $table) {
			$table->id();
			$table->string("card_number")->unique();
			$table->date("delivery_date");
			$table->date("expiration_date");
			$table->string("invoice_reference");
			$table->foreignId("receptionist_id")->constrained(table: "users", column: "id")->cascadeOnDelete();
			$table->foreignId("possessor_id")->constrained(table: "users", column: "id")->cascadeOnDelete();
			$table->foreignId("lot_id")->nullable()->constrained()->cascadeOnDelete();
			$table->enum("status", ["returned", "owned", "sold"])->default("owned");
			$table->decimal("price");
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('credit_cards');
	}
};
