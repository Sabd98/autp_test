<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

#[Fillable(['username', 'name', 'password'])]
#[Hidden(['password'])]
class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public static function findByUsername(string $username): ?self
    {
        return static::where('username', $username)->first();
    }

    public static function filter(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $pageSize = $filters['pageSize'] ?? 10;

        $query = static::search($filters['search'] ?? null);

        $total = $query->count();
        $items = $query->offset(($page - 1) * $pageSize)
                       ->limit($pageSize)
                       ->get();

        return [
            'data' => $items,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'pageSize' => $pageSize,
                'totalPages' => (int) ceil($total / $pageSize),
            ],
        ];
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (empty($term)) {
            return $query;
        }

        return $query->where(function ($q) use ($term) {
            $q->where('username', 'ilike', "%{$term}%")
              ->orWhere('name', 'ilike', "%{$term}%");
        });
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
