<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('claims', function (Blueprint $table) {
            $table->id();
            $table->string('farmer_name');
            $table->string('farmer_nik', 16);
            $table->string('certificate_number', 50);
            $table->enum('planting_period', ['MT1', 'MT2']);
            $table->string('plot_village');
            $table->string('plot_district');
            $table->string('plot_regency');
            $table->decimal('total_insured_area', 10, 2);
            $table->decimal('failed_land_area', 10, 2);
            $table->enum('failure_cause', ['Banjir', 'Kekeringan', 'Hama Wereng', 'Penyakit Tanaman', 'OPT Lainnya']);
            $table->enum('claim_status', ['Pending', 'Surveyed', 'Approved', 'Rejected'])->default('Pending');
            $table->date('submission_date');
            $table->string('surveyor_name')->nullable();
            $table->date('survey_date')->nullable();
            $table->text('survey_notes')->nullable();
            $table->bigInteger('compensation_amount')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('claims');
    }
};
