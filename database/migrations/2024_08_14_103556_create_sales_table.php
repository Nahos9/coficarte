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
		Schema::create('sales', function (Blueprint $table) {
			$table->id();
			$table->date("sale_date");
			$table->foreignId("credit_card_id")->unique()->constrained()->cascadeOnDelete();
			$table->string("number_id");
			$table->enum("customer_type", ["business", "particular"]);
			$table->string("customer_name");
            $table->enum("type_piece", ["cni", "passport", "residence_certificate", "driving_licence","carte_sej"])->default('cni');
			$table->string("number_piece")->unique();
			$table->date("date_expiration");
			$table->string("account_number")->nullable();
			$table->foreignId("account_type_id")->nullable()->constrained()->cascadeOnDelete();
			$table->text("comment")->nullable();
			$table->foreignId("seller_id")->constrained(table: "users", column: "id")->cascadeOnDelete();
			$table->foreignId("agency_id")->constrained(table: "agencies", column: "id")->cascadeOnDelete();
			$table->enum("unlock_status", ["locked", "unlocked"])->default("locked");
			$table->decimal('sale_price');
			$table->string("customer_phone_number");
			$table->integer("code_operation")->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('sales');
	}
};
