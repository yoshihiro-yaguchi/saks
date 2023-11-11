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
        Schema::table('transaction_headers', function (Blueprint $table) {
            $table->dropColumn('transaction_note');
            // お客様情報
            $table->dropColumn('corporation_division');
            $table->dropColumn('customer_invoice_number');
            $table->dropColumn('customer_company');
            $table->dropColumn('customer_branch');
            $table->dropColumn('customer_name');
            $table->dropColumn('customer_phone_number');
            $table->dropColumn('customer_zip_code');
            $table->dropColumn('customer_address1');
            $table->dropColumn('customer_address2');
            $table->dropColumn('customer_address3');
            $table->dropColumn('customer_address4');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_headers', function (Blueprint $table) {
            $table->string('transaction_note', 1000)->nullable()->comment('取引備考');
            // お客様情報
            $table->unsignedTinyInteger('corporation_division')->comment('法人区分 1-個人 2-法人');
            $table->string('customer_invoice_number', 14)->nullable()->comment('インボイス登録番号');
            $table->string('customer_company', 50)->nullable()->comment('会社名');
            $table->string('customer_branch', 50)->nullable()->comment('支店名');
            $table->string('customer_name', 10)->comment('お名前');
            $table->string('customer_phone_number', 15)->nullable()->comment('電話番号');
            $table->string('customer_zip_code', 8)->comment('郵便番号');
            $table->string('customer_address1', 10)->comment('住所1 都道府県');
            $table->string('customer_address2', 50)->comment('住所2 市町村区');
            $table->string('customer_address3', 100)->comment('住所3 町・番地');
            $table->string('customer_address4', 100)->nullable()->comment('住所4 建物名等');
        });
    }
};
