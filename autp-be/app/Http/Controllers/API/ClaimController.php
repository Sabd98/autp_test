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
    }

    public function show(int $id): JsonResponse
    {
        $claim = $this->claimService->findById($id);
        return response()->json(new ClaimResource($claim));
    }

    public function store(CreateClaimRequest $request): JsonResponse
    {
        $data = $this->transformRequestData($request->validated());
        $claim = $this->claimService->create($data);
        return response()->json(new ClaimResource($claim), 201);
    }

    public function update(UpdateClaimRequest $request, int $id): JsonResponse
    {
        $claim = $this->claimService->findById($id);
        $data = $this->transformRequestData($request->validated());
        $updatedClaim = $this->claimService->update($claim, $data);
        return response()->json(new ClaimResource($updatedClaim));
    }

    public function destroy(int $id): JsonResponse
    {
        $claim = $this->claimService->findById($id);
        $this->claimService->delete($claim);
        return response()->json(null, 204);
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
