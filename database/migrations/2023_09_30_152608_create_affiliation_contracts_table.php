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
        Schema::create('affiliation_contracts', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // メールアドレス	email	varchar	255
            $table->string('email', 255)->comment('メールアドレス');
            // 役職区分	job_division	integer
            $table->unsignedInteger('job_division')->comment('役職区分');
            $table->timestamps();

            $table->comment('所属契約マスタ');

            $table->unique(['contract_id', 'email'], 'affiliation_contracts_uk1');
            $table->index(['contract_id', 'email'], 'affiliation_contracts_idx1');
            $table->index(['contract_id'], 'affiliation_contracts_idx2');
            $table->index(['email'], 'affiliation_contracts_idx3');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affiliation_contracts');
    }
};
