<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'farmer_name',
    'farmer_nik',
    'certificate_number',
    'planting_period',
    'plot_village',
    'plot_district',
    'plot_regency',
    'total_insured_area',
    'failed_land_area',
    'failure_cause',
    'claim_status',
    'submission_date',
    'surveyor_name',
    'survey_date',
    'survey_notes',
    'compensation_amount',
])]
class Claim extends Model
{
    protected function casts(): array
    {
        return [
            'total_insured_area' => 'float',
            'failed_land_area' => 'float',
            'compensation_amount' => 'integer',
            'submission_date' => 'date',
            'survey_date' => 'date',
        ];
    }

    public static function filter(array $filters): array
    {
        $page = $filters['page'] ?? 1;
        $pageSize = $filters['pageSize'] ?? 10;

        $query = static::search($filters['search'] ?? null)
                       ->byStatus($filters['status'] ?? null)
                       ->byCause($filters['cause'] ?? null);

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
            $q->where('farmer_name', 'ilike', "%{$term}%")
              ->orWhere('certificate_number', 'ilike', "%{$term}%")
              ->orWhere('farmer_nik', 'ilike', "%{$term}%");
        });
    }

    public function scopeByStatus(Builder $query, ?string $status): Builder
    {
        if (empty($status)) {
            return $query;
        }

        return $query->where('claim_status', $status);
    }

    public function scopeByCause(Builder $query, ?string $cause): Builder
    {
        if (empty($cause)) {
            return $query;
        }

        return $query->where('failure_cause', $cause);
    }
}
