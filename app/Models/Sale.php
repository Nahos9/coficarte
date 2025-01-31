<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sale extends Model
{
	use HasFactory;

	protected $fillable = [
		"sale_date",
		"credit_card_id",
		"number_id",
		"customer_type",
		"customer_name",
		"account_number",
		"account_type_id",
		"comment",
		"seller_id",
		"unlock_status",
		"sale_price",
		"customer_phone_number",
		"is_dotation"
	];

	protected $appends = ["customer_type_fr", "unlock_status_fr", "sale_price_fr"];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		$data["sale_date_fr"] = Carbon::parse($data["sale_date"])->format("d/m/Y");
		return $data;
	}


	public function credit_card(): BelongsTo
	{
		return $this->belongsTo(CreditCard::class, "credit_card_id", "id");
	}

	public function account_type(): BelongsTo
	{
		return $this->belongsTo(AccountType::class, "account_type_id", "id");
	}

	public function seller(): BelongsTo
	{
		return $this->belongsTo(User::class, "seller_id", "id");
	}

	public function getCustomerTypeFrAttribute(): string
	{
		return [
			"business" => "Entreprise",
			"particular" => "Particulier",
		][$this->customer_type];
	}
	public function getUnlockStatusFrAttribute(): string
	{
		return [
			"locked" => "Verouillé",
			"unlocked" => "Deverouillé",
		][$this->unlock_status];
	}


	public function getSalePriceFrAttribute()
	{
		return number_format($this->sale_price, 0, ',', ' ') . " F CFA";
	}
}
