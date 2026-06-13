<?php

namespace App\Services;

use App\Models\Claim;

class ClaimService
{
    public function getAll(array $filters): array
    {
        return Claim::filter($filters);
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
