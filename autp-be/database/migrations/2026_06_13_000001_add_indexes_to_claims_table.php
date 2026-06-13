<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('claims', function (Blueprint $table) {
            $table->index('claim_status');
            $table->index('failure_cause');
            $table->index('farmer_name');
            $table->index('certificate_number');
            $table->index('farmer_nik');
        });
    }

    public function down(): void
    {
        Schema::table('claims', function (Blueprint $table) {
            $table->dropIndex(['claim_status']);
            $table->dropIndex(['failure_cause']);
            $table->dropIndex(['farmer_name']);
            $table->dropIndex(['certificate_number']);
            $table->dropIndex(['farmer_nik']);
        });
    }
};
