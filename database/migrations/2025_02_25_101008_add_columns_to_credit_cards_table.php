<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('credit_cards', function (Blueprint $table) {
            $table->date('date_retour')->nullable();
            $table->date('date_validation_retour')->nullable();
            $table->string("user_ayant_valide")->nullable();
            $table->string("comment_retour")->nullable();
            $table->boolean("etat_validation")->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credit_cards', function (Blueprint $table) {
            //
        });
    }
};
