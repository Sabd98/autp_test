<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateClaimRequest;
use App\Http\Requests\UpdateClaimRequest;
use App\Http\Resources\ClaimResource;
use App\Services\ClaimService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ClaimController extends Controller
{
    public function __construct(private ClaimService $claimService) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $filters = [
                'search' => $request->query('search'),
                'status' => $request->query('status'),
                'cause' => $request->query('cause'),
                'page' => (int) $request->query('page', 1),
                'pageSize' => (int) $request->query('pageSize', 10),
            ];

            $result = $this->claimService->getAll($filters);

            return response()->json([
                'data' => ClaimResource::collection($result['data']),
                'meta' => $result['meta'],
            ]);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to fetch claims', 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $claim = $this->claimService->findById($id);
            return $this->successResponse(new ClaimResource($claim));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('Claim not found');
        }
    }

    public function store(CreateClaimRequest $request): JsonResponse
    {
        try {
            $data = $this->transformRequestData($request->validated());
            $claim = $this->claimService->create($data);
            return $this->createdResponse(new ClaimResource($claim), 'Claim created successfully');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create claim', 500);
        }
    }

    public function update(UpdateClaimRequest $request, int $id): JsonResponse
    {
        try {
            $claim = $this->claimService->findById($id);
            $data = $this->transformRequestData($request->validated());
            $updatedClaim = $this->claimService->update($claim, $data);
            return $this->successResponse(new ClaimResource($updatedClaim), 'Claim updated successfully');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('Claim not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to update claim', 500);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $claim = $this->claimService->findById($id);
            $this->claimService->delete($claim);
            return $this->noContentResponse();
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return $this->notFoundResponse('Claim not found');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to delete claim', 500);
        }
    }

    private function transformRequestData(array $data): array
    {
        $map = [
            'farmerName' => 'farmer_name',
            'farmerNIK' => 'farmer_nik',
            'certificateNumber' => 'certificate_number',
            'plantingPeriod' => 'planting_period',
            'plotVillage' => 'plot_village',
            'plotDistrict' => 'plot_district',
            'plotRegency' => 'plot_regency',
            'totalInsuredArea' => 'total_insured_area',
            'failedLandArea' => 'failed_land_area',
            'failureCause' => 'failure_cause',
            'claimStatus' => 'claim_status',
            'submissionDate' => 'submission_date',
            'surveyorName' => 'surveyor_name',
            'surveyDate' => 'survey_date',
            'surveyNotes' => 'survey_notes',
            'compensationAmount' => 'compensation_amount',
        ];

        $transformed = [];
        foreach ($data as $key => $value) {
            if (isset($map[$key])) {
                $transformed[$map[$key]] = $value;
            }
        }

        return $transformed;
    }
}
