<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateClaimRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'farmerName' => 'sometimes|string|max:255',
            'farmerNIK' => 'sometimes|string|size:16',
            'certificateNumber' => 'sometimes|string|max:50',
            'plantingPeriod' => 'sometimes|in:MT1,MT2',
            'plotVillage' => 'sometimes|string',
            'plotDistrict' => 'sometimes|string',
            'plotRegency' => 'sometimes|string',
            'totalInsuredArea' => 'sometimes|numeric|min:0.01',
            'failedLandArea' => 'sometimes|numeric|min:0.01|lte:totalInsuredArea',
            'failureCause' => 'sometimes|in:Banjir,Kekeringan,Hama Wereng,Penyakit Tanaman,OPT Lainnya',
            'submissionDate' => 'sometimes|date',
            'claimStatus' => 'sometimes|in:Pending,Surveyed,Approved,Rejected',
            'surveyorName' => 'nullable|string',
            'surveyDate' => 'nullable|date',
            'surveyNotes' => 'nullable|string',
            'compensationAmount' => 'nullable|integer|min:0',
        ];
    }
}
