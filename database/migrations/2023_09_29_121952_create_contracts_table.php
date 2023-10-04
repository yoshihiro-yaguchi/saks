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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // 契約プラン	contract_plan	integer
            $table->integer('contract_plan')->comment('契約プラン');
            // 契約法人名	contract_company_name	varchar	100
            $table->string('contract_company_name', 100)->nullable()->comment('契約法人名');
            // 契約者名	contracters_name	varchar	100
            $table->string('contracters_name', 100)->comment('契約者名');
            // 契約日	contract_date	date
            $table->date('contract_date')->comment('契約日');
            // 解約日	cancellation_date	date
            $table->date('cancellation_date')->comment('解約日');
            // 解約メモ	cancellation_memo	text
            $table->text('cancellation_memo')->nullable()->comment('解約メモ');
            // 郵便番号	contract_zipcode	varchar	8
            $table->string('contract_zipcode', 8)->comment('郵便番号');
            // 契約者住所1 都道府県	contract_address1	varchar	10
            $table->string('contract_address1', 10)->comment('契約者住所1 都道府県');
            // 契約者住所2 市区町村	contract_address2	varchar	50
            $table->string('contract_address2', 50)->comment('契約者住所2 市町村区');
            // 契約者住所3 町・番地	contract_address3	varchar	100
            $table->string('contract_address3', 100)->comment('契約者住所3 町・番地');
            // 契約者住所4 建物名等	contract_address4	varchar	100
            $table->string('contract_address4', 100)->nullable()->comment('契約者住所3 建物名等');

            $table->timestamps();

            $table->comment('契約マスタ');

            $table->unique(['contract_id'], 'contracts_uk1');
            $table->index(['contract_id'], 'contracts_idx1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
