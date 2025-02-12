<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
  use HasApiTokens, HasFactory, Notifiable;

  protected $appends = ['ability_rules', 'profile_fr'];

  /**
   * The attributes that are mass assignable.
   *
   * @var array<int, string>
   */
  protected $fillable = [
    'name',
    'email',
    'password',
    'profile',
    'activated',
    'password_change_required',
    'agency_id',
  ];

  /**
   * The attributes that should be hidden for serialization.
   *
   * @var array<int, string>
   */
  protected $hidden = [
    'password',
    'remember_token',
  ];

  /**
   * Get the attributes that should be cast.j
   *
   * @return array<string, string>
   */
  protected function casts(): array
  {
    return [
      'email_verified_at' => 'datetime',
      'password' => 'hashed',
    ];
  }

  public function toArray()
  {
    $data = parent::toArray();
    $data["created_at_fr"] = Carbon::parse($data["created_at"])->format("d/m/Y H:i:s");
    $data["updated_at_fr"] = Carbon::parse($data["updated_at"])->format("d/m/Y H:i:s");
    $data["activated"] = (bool) $data["activated"];
    $data["password_change_required"] = (bool) $data["password_change_required"];
    return $data;
  }

  public function getAbilityRulesAttribute()
  {
    switch ($this->profile) {
      case ('admin'):
        return [
          [
            'action' => ['manage'],
            'subject' => ['all'],
          ],
        ];
      case ('responsible_for_customer'):
        return [
          [
            'action' => ['read'],
            'subject' => ['agency', 'user', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
          ],
          [
            'action' => ['read'],
            'subject' => ['dashboard']
          ],
          [
            'action' => ['update', 'trate', 'cancel', 'reject', 'validate'],
            'subject' => ['transfer']
          ],
          [
            'action' => ['create'],
            'subject' => ['sale', 'transfer']
          ],
          [
            'action' => ['historical'],
            'subject' => ['transfer', 'credit-card']
          ],
          [
            'action' => ['update'],
            'subject' => ['sale']
          ],
          [
            'action' => ['update-password'],
            'subject' => ['user']
          ],
        ];
      case ('marketing_manager'):
        return [
          [
            'action' => ['read'],
            'subject' => ['agency', 'user', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
          ],
          [
            'action' => ['read'],
            'subject' => ['dashboard']
          ],
          [
            'action' => ['create', 'update', 'delete'],
            'subject' => ['credit-card', 'account-type']
          ],
          [
            'action' => ['create', 'update', 'trate', 'cancel', 'reject', 'validate'],
            'subject' => ['transfer']
          ],
          [
            'action' => ['historical'],
            'subject' => ['transfer', 'credit-card']
          ],
          [
            'action' => ['update-password'],
            'subject' => ['user']
          ],
          [
            'action' => ['update-price'],
            'subject' => ['credit-card']
          ],
        ];
        case ('ops'):
          return [
            [
              'action' => ['read'],
              'subject' => ['agency', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
            ],
            [
              'action' => ['read'],
              'subject' => ['dashboard']
            ],
            [
              'action' => ['historical'],
              'subject' => ['transfer', 'credit-card']
            ],
            [
              'action' => ['update-password'],
              'subject' => ['user']
            ]
          ];
      case ('agency_head'):
        return [
          [
            'action' => ['read'],
            'subject' => ['agency', 'user', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
          ],
          [
            'action' => ['read'],
            'subject' => ['dashboard']
          ],
          [
            'action' => ['create', 'update', 'trate', 'cancel', 'reject', 'validate'],
            'subject' => ['transfer']
          ],
          [
            'action' => ['historical'],
            'subject' => ['transfer', 'credit-card']
          ],
          [
            'action' => ['update-password'],
            'subject' => ['user']
          ],
          [
            'action' => ['unblock'],
            'subject' => ['sale']
          ],
        ];
      case ('audit_controller'):
        return [
          [
            'action' => ['read'],
            'subject' => ['agency', 'user', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
          ],
          [
            'action' => ['historical'],
            'subject' => ['transfer', 'credit-card']
          ],
          [
            'action' => ['update-password'],
            'subject' => ['user']
          ],
        ];
        case ('caf'):
          return [
            [
              'action' => ['read'],
              'subject' => ['agency', 'user', 'credit-card', 'transfer', 'settings-user', 'account-type', 'sale']
            ],
            [
              'action' => ['read'],
              'subject' => ['dashboard']
            ],
            [
              'action' => ['update', 'trate', 'cancel', 'reject', 'validate'],
              'subject' => ['transfer']
            ],
            [
              'action' => ['create'],
              'subject' => ['sale', 'transfer']
            ],
            [
              'action' => ['historical'],
              'subject' => ['transfer', 'credit-card']
            ],
            [
              'action' => ['update'],
              'subject' => ['sale']
            ],
            [
              'action' => ['update-password'],
              'subject' => ['user']
            ],
          ];
    }
  }

  public function agency(): BelongsTo
  {
    return $this->belongsTo(Agency::class);
  }

  public function credit_cards_received(): HasMany
  {
    return $this->hasMany(CreditCard::class, "receptionist_id", "id");
  }

  public function credit_cards_owned(): HasMany
  {
    return $this->hasMany(CreditCard::class, "possessor_id", "id");
  }

  public function transfers_sent(): HasMany
  {
    return $this->hasMane(Transfer::class, "sender_id", "id");
  }

  public function transfers_received(): HasMany
  {
    return $this->hasMane(Transfer::class, "receiver_id", "id");
  }

  public function sales(): HasMany
  {
    return $this->hasMany(Sale::class, "seller_id", "id");
  }

  public function getProfileFrAttribute()
  {
    return [
      'admin' => 'Administrateur',
      'responsible_for_customer' => 'Chargé de clientèle',
      'marketing_manager' => 'Responsable Marketing',
      'agency_head' => 'Chef d\'agence',
      'audit_controller' => "Contrôleur permanent",
      'caf'=>"Chargé d'affaires",
      'ops'=>"Operations"
    ][$this->profile];
  }

  // public function transfers(){
  //     return Transfer::where('sender_id', $this->id)->orWhere('receiver_id', $this->id);
  // }
}
