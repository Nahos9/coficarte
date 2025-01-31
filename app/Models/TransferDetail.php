<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransferDetail extends Model
{
	use HasFactory;

	protected $fillable = [
		"transfer_id",
		"credit_card_id",
		"user_id",
	];

	public $timestamps = false;

	public function transfer(): BelongsTo
	{
		return $this->belongsTo(Transfer::class, "transfer_id", "id");
	}

	public function credit_card(): BelongsTo
	{
		return $this->belongsTo(CreditCard::class, "credit_card_id", "id");
	}
	public function users(): BelongsTo
	{
		return $this->belongsTo(users::class, "receiver_id", "id");
	}
}
