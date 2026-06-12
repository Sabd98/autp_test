<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClaimResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'farmerName' => $this->farmer_name,
            'farmerNIK' => $this->farmer_nik,
            'certificateNumber' => $this->certificate_number,
            'plantingPeriod' => $this->planting_period,
            'plotVillage' => $this->plot_village,
            'plotDistrict' => $this->plot_district,
            'plotRegency' => $this->plot_regency,
            'totalInsuredArea' => $this->total_insured_area,
            'failedLandArea' => $this->failed_land_area,
            'failureCause' => $this->failure_cause,
            'claimStatus' => $this->claim_status,
            'submissionDate' => $this->submission_date->format('Y-m-d'),
            'surveyorName' => $this->surveyor_name,
            'surveyDate' => $this->survey_date?->format('Y-m-d'),
            'surveyNotes' => $this->survey_notes,
            'compensationAmount' => $this->compensation_amount,
        ];
    }
}
