<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class CreditCard extends Model
{
	use HasFactory, SoftDeletes;

	protected $fillable = [
		"card_number",
		"delivery_date",
		"expiration_date",
		"invoice_reference",
		"receptionist_id",
		"possessor_id",
		"lot_id",
		"status",
		"price",
		"buy",
	];

	protected $appends = ["card_number_fr", "status_fr", "expiration_per_centage", "price_fr"];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		$data["delivery_date_fr"] = Carbon::parse($data["delivery_date"])->format("d/m/Y");
		$data["expiration_date_fr"] = Carbon::parse($data["expiration_date"])->format("d/m/Y");
		return $data;
	}

	protected $dates = ['deleted_at'];

	public function receptionist(): BelongsTo
	{
		return $this->belongsTo(User::class, "receptionist_id", "id");
	}

	public function possessor(): BelongsTo
	{
		return $this->belongsTo(User::class, "possessor_id", "id");
	}

	public function lot(): BelongsTo
	{
		return $this->belongsTo(Lot::class, "lot_id", "id");
	}

	public function transfer_details(): HasMany
	{
		return $this->hasMany(TransferDetail::class, "credit_card_id", "id");
	}

	public function sale(): HasOne
	{
		return $this->hasOne(Sale::class, "credit_card_id", "id");
	}

	public function getCardNumberFrAttribute()
	{
		$number = preg_replace('/\D/', '', $this->card_number);
		$chunks = str_split($number, 2);
		$formatted = implode(' ', $chunks);
		return $formatted;
	}

	public function getStatusFrAttribute()
	{
		return [
			"returned" => "Retournée",
			"owned" => ['responsible_for_customer' => 'En vente', 'marketing_manager' => 'Au siège', 'agency_head' => 'En agence', 'admin' => 'Chez les IT'][$this->possessor->profile],
			"sold" => "Vendu",
		][$this->status];
	}

	public function getExpirationPerCentageAttribute()
	{
		$delivery_date = Carbon::parse($this->delivery_date);
		$expiration_date = Carbon::parse($this->expiration_date);
		$currentDate = Carbon::now();

		return min($delivery_date->diffInDays($currentDate) / $delivery_date->diffInDays($expiration_date) * 100, 100);
	}

	public function getPriceFrAttribute()
	{
		return number_format($this->price, 0, ',', ' ') . " F CFA";
	}
}
