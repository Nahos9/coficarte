<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transfer extends Model
{
	use HasFactory;

	protected $fillable = [
		"sender_id",
		"receiver_id",
		"status",
		"comment",
	];

	protected $appends = ["status_fr"];

	public function toArray()
	{
		$data = parent::toArray();
		$data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
		$data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
		return $data;
	}

	public function sender(): BelongsTo
	{
		return $this->belongsTo(User::class, "sender_id", "id");
	}
	public function receiver(): BelongsTo
	{
		return $this->belongsTo(User::class, "receiver_id", "id");
	}

	public function transfer_details(): HasMany
	{
		return $this->hasMany(TransferDetail::class, "transfer_id", "id");
	}

	public function getStatusFrAttribute()
	{
		return [
			"waiting" => "En attente",
			"canceled" => "Annulé",
			"rejected" => "Rejeté",
			"validated" => "Validé"
		][$this->status];
	}
}
