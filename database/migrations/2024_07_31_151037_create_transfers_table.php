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
		Schema::create('transfers', function (Blueprint $table) {
			$table->id();
			$table->foreignId("sender_id")->constrained(table: "users", column: "id")->cascadeOnDelete();
			$table->foreignId("receiver_id")->constrained(table: "users", column: "id")->cascadeOnDelete();
			$table->enum("status", ["waiting", "validated", "rejected", "canceled"]);
			$table->text("comment")->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('transfers');
	}
};
