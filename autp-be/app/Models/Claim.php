<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
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
}
