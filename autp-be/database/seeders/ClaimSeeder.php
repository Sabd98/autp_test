<?php

namespace Database\Seeders;

use App\Models\Claim;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClaimSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            ['farmer_name' => 'Budi Santoso', 'farmer_nik' => '3312345678901234', 'certificate_number' => 'SRT-2024-001', 'planting_period' => 'MT1', 'plot_village' => 'Keboguci', 'plot_district' => 'Sukodono', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 5.5, 'failed_land_area' => 5.5, 'failure_cause' => 'Banjir', 'claim_status' => 'Pending', 'submission_date' => '2024-01-15', 'surveyor_name' => null, 'survey_date' => null, 'survey_notes' => null, 'compensation_amount' => 0],
            ['farmer_name' => 'Siti Nurhaliza', 'farmer_nik' => '3312345678901235', 'certificate_number' => 'SRT-2024-002', 'planting_period' => 'MT1', 'plot_village' => 'Banjardowo', 'plot_district' => 'Sukodono', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 3.0, 'failed_land_area' => 2.5, 'failure_cause' => 'Kekeringan', 'claim_status' => 'Surveyed', 'submission_date' => '2024-01-20', 'surveyor_name' => 'Ahmad Hidayat', 'survey_date' => '2024-02-01', 'survey_notes' => 'Crop failure due to drought confirmed', 'compensation_amount' => 7500000],
            ['farmer_name' => 'Rinto Harahap', 'farmer_nik' => '3312345678901236', 'certificate_number' => 'SRT-2024-003', 'planting_period' => 'MT2', 'plot_village' => 'Kedungdoro', 'plot_district' => 'Sidoarjo', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 4.2, 'failed_land_area' => 4.2, 'failure_cause' => 'Hama Wereng', 'claim_status' => 'Approved', 'submission_date' => '2024-02-10', 'surveyor_name' => 'Siti Munawaroh', 'survey_date' => '2024-02-25', 'survey_notes' => 'Pest infestation verified. Full claim approved.', 'compensation_amount' => 10500000],
            ['farmer_name' => 'Eka Putri Wulandari', 'farmer_nik' => '3312345678901237', 'certificate_number' => 'SRT-2024-004', 'planting_period' => 'MT1', 'plot_village' => 'Kedungdoro', 'plot_district' => 'Tarik', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 2.8, 'failed_land_area' => 0.5, 'failure_cause' => 'Penyakit Tanaman', 'claim_status' => 'Rejected', 'submission_date' => '2024-02-15', 'surveyor_name' => 'Bambang Setiawan', 'survey_date' => '2024-03-05', 'survey_notes' => 'Plant disease not covered under this policy', 'compensation_amount' => 0],
            ['farmer_name' => 'Kusuma Wijaya', 'farmer_nik' => '3312345678901238', 'certificate_number' => 'SRT-2024-005', 'planting_period' => 'MT2', 'plot_village' => 'Banjarwati', 'plot_district' => 'Tarik', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 6.0, 'failed_land_area' => 3.0, 'failure_cause' => 'Banjir', 'claim_status' => 'Pending', 'submission_date' => '2024-03-01', 'surveyor_name' => null, 'survey_date' => null, 'survey_notes' => null, 'compensation_amount' => 0],
            ['farmer_name' => 'Dewi Lestari', 'farmer_nik' => '3312345678901239', 'certificate_number' => 'SRT-2024-006', 'planting_period' => 'MT1', 'plot_village' => 'Kraton', 'plot_district' => 'Tarik', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 4.5, 'failed_land_area' => 4.5, 'failure_cause' => 'OPT Lainnya', 'claim_status' => 'Surveyed', 'submission_date' => '2024-03-10', 'surveyor_name' => 'Dardi Sumartono', 'survey_date' => '2024-03-25', 'survey_notes' => 'Pest damage confirmed', 'compensation_amount' => 11250000],
            ['farmer_name' => 'Handoko Suseno', 'farmer_nik' => '3312345678901240', 'certificate_number' => 'SRT-2024-007', 'planting_period' => 'MT2', 'plot_village' => 'Sepanjang', 'plot_district' => 'Wonoayu', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 3.5, 'failed_land_area' => 3.5, 'failure_cause' => 'Kekeringan', 'claim_status' => 'Approved', 'submission_date' => '2024-03-15', 'surveyor_name' => 'Erlina Putri', 'survey_date' => '2024-04-01', 'survey_notes' => 'Severe drought impact confirmed', 'compensation_amount' => 8750000],
            ['farmer_name' => 'Suryanti', 'farmer_nik' => '3312345678901241', 'certificate_number' => 'SRT-2024-008', 'planting_period' => 'MT1', 'plot_village' => 'Ngelom', 'plot_district' => 'Wonoayu', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 5.0, 'failed_land_area' => 5.0, 'failure_cause' => 'Banjir', 'claim_status' => 'Pending', 'submission_date' => '2024-03-20', 'surveyor_name' => null, 'survey_date' => null, 'survey_notes' => null, 'compensation_amount' => 0],
            ['farmer_name' => 'Rahmad Gunawan', 'farmer_nik' => '3312345678901242', 'certificate_number' => 'SRT-2024-009', 'planting_period' => 'MT2', 'plot_village' => 'Kedungwulan', 'plot_district' => 'Wonoayu', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 4.0, 'failed_land_area' => 4.0, 'failure_cause' => 'Hama Wereng', 'claim_status' => 'Surveyed', 'submission_date' => '2024-03-25', 'surveyor_name' => 'Firdaus Hermawan', 'survey_date' => '2024-04-10', 'survey_notes' => 'Brown planthopper infestation confirmed', 'compensation_amount' => 10000000],
            ['farmer_name' => 'Yuni Wahyuni', 'farmer_nik' => '3312345678901243', 'certificate_number' => 'SRT-2024-010', 'planting_period' => 'MT1', 'plot_village' => 'Jatirejo', 'plot_district' => 'Wonoayu', 'plot_regency' => 'Sidoarjo', 'total_insured_area' => 3.2, 'failed_land_area' => 2.0, 'failure_cause' => 'Penyakit Tanaman', 'claim_status' => 'Rejected', 'submission_date' => '2024-04-01', 'surveyor_name' => 'Gani Hasibuan', 'survey_date' => '2024-04-15', 'survey_notes' => 'Disease type not covered by policy', 'compensation_amount' => 0],
        ];

        foreach ($data as $claim) {
            Claim::create($claim);
        }

        for ($i = 11; $i <= 30; $i++) {
            $statuses = ['Pending', 'Surveyed', 'Approved', 'Rejected'];
            $causes = ['Banjir', 'Kekeringan', 'Hama Wereng', 'Penyakit Tanaman', 'OPT Lainnya'];
            $villages = ['Keboguci', 'Banjardowo', 'Kedungdoro', 'Banjarwati', 'Kraton', 'Sepanjang', 'Ngelom', 'Kedungwulan', 'Jatirejo', 'Gedongan'];
            $districts = ['Sukodono', 'Sidoarjo', 'Tarik', 'Wonoayu', 'Buduran'];
            $periods = ['MT1', 'MT2'];

            $status = $statuses[array_rand($statuses)];
            $farmerName = 'Petani ' . $i;
            $survey_date = null;
            $surveyor_name = null;
            $survey_notes = null;
            $compensation_amount = 0;

            if ($status !== 'Pending') {
                $survey_date = date('Y-m-d', strtotime('2024-04-20 +' . rand(0, 20) . ' days'));
                $surveyor_name = ['Surveyor A', 'Surveyor B', 'Surveyor C', 'Surveyor D'][rand(0, 3)];
                $survey_notes = 'Survey notes for claim ' . $i;
                if ($status === 'Approved') {
                    $compensation_amount = rand(5000000, 15000000);
                }
            }

            $nik = str_pad(rand(10000000000000, 99999999999999), 16, '0', STR_PAD_LEFT);

            Claim::create([
                'farmer_name' => $farmerName,
                'farmer_nik' => $nik,
                'certificate_number' => 'SRT-2024-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'planting_period' => $periods[array_rand($periods)],
                'plot_village' => $villages[array_rand($villages)],
                'plot_district' => $districts[array_rand($districts)],
                'plot_regency' => 'Sidoarjo',
                'total_insured_area' => round(rand(20, 60) / 10, 1),
                'failed_land_area' => round(rand(10, 60) / 10, 1),
                'failure_cause' => $causes[array_rand($causes)],
                'claim_status' => $status,
                'submission_date' => date('Y-m-d', strtotime('2024-04-01 +' . rand(0, 30) . ' days')),
                'surveyor_name' => $surveyor_name,
                'survey_date' => $survey_date,
                'survey_notes' => $survey_notes,
                'compensation_amount' => $compensation_amount,
            ]);
        }
    }
}
