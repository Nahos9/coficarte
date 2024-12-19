<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lot extends Model
{
	use HasFactory;

	protected $fillable = ["first_card_number"];

	protected $appends = ["first_card_number_fr"];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		return $data;
	}

	public function credit_cards(): HasMany
	{
		return $this->hasMany(CreditCard::class, "lot_id", "id");
	}

	public function getFirstCardNumberFrAttribute()
	{
		$number = preg_replace('/\D/', '', $this->first_card_number);
		$chunks = str_split($number, 2);
		$formatted = implode(' ', $chunks);
		return $formatted;
	}
}
