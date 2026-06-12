<?php

namespace App\Services;

use App\Models\Claim;
use Illuminate\Pagination\Paginator;

class ClaimService
{
    public function getAll(array $filters): array
    {
        $query = Claim::query();

        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('farmer_name', 'ilike', "%{$search}%")
                  ->orWhere('certificate_number', 'ilike', "%{$search}%")
                  ->orWhere('farmer_nik', 'ilike', "%{$search}%");
            });
        }

        if (!empty($filters['status'])) {
            $query->where('claim_status', $filters['status']);
        }

        if (!empty($filters['cause'])) {
            $query->where('failure_cause', $filters['cause']);
        }

        $page = $filters['page'] ?? 1;
        $pageSize = $filters['pageSize'] ?? 10;

        $total = $query->count();
        $items = $query->offset(($page - 1) * $pageSize)
                       ->limit($pageSize)
                       ->get();

        $totalPages = ceil($total / $pageSize);

        return [
            'data' => $items,
            'meta' => [
                'total' => $total,
                'page' => $page,
                'pageSize' => $pageSize,
                'totalPages' => $totalPages,
            ],
        ];
    }

    public function findById(int $id): Claim
    {
        return Claim::findOrFail($id);
    }

    public function create(array $data): Claim
    {
        return Claim::create($data);
    }

    public function update(Claim $claim, array $data): Claim
    {
        $claim->update($data);
        return $claim;
    }

    public function delete(Claim $claim): void
    {
        $claim->delete();
    }
}
