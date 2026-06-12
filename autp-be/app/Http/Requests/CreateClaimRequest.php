<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateClaimRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'farmerName' => 'required|string|max:255',
            'farmerNIK' => 'required|string|size:16',
            'certificateNumber' => 'required|string|max:50',
            'plantingPeriod' => 'required|in:MT1,MT2',
            'plotVillage' => 'required|string',
            'plotDistrict' => 'required|string',
            'plotRegency' => 'required|string',
            'totalInsuredArea' => 'required|numeric|min:0.01',
            'failedLandArea' => 'required|numeric|min:0.01|lte:totalInsuredArea',
            'failureCause' => 'required|in:Banjir,Kekeringan,Hama Wereng,Penyakit Tanaman,OPT Lainnya',
            'submissionDate' => 'required|date',
            'compensationAmount' => 'nullable|integer|min:0',
        ];
    }
}
