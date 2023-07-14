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
        Schema::create('transaction_headers', function (Blueprint $table) {
            $table->id();
            $table->string('contract_id', 8)->comment('契約ID');
            // 取引情報
            $table->string('transaction_title', 50)->nullable()->comment('件名');
            $table->unsignedTinyInteger('transaction_division')->comment('取引区分 1-買取 2-販売');
            $table->timestamp('transaction_date')->comment('取引日付');
            $table->string('transaction_branch', 50)->comment('取引支店');
            $table->string('transaction_pic_last_name', 10)->comment('担当者(姓)');
            $table->string('transaction_pic_first_name', 10)->comment('担当者(名)');
            $table->string('transaction_note', 1000)->nullable()->comment('取引備考');
            // お客様情報
            $table->unsignedTinyInteger('corporation_division')->comment('法人区分 1-個人 2-法人');
            $table->string('invoice_number', 14)->nullable()->comment('インボイス登録番号');
            $table->string('customer_company', 50)->nullable()->comment('会社名');
            $table->string('customer_branch', 50)->nullable()->comment('支店名');
            $table->string('customer_last_name', 10)->comment('お名前(姓)');
            $table->string('customer_first_name', 10)->comment('お名前(名)');
            $table->string('customer_phone_number', 15)->nullable()->comment('電話番号');
            $table->string('zip_code', 8)->comment('郵便番号');
            $table->string('customer_address1', 10)->comment('住所1 都道府県');
            $table->string('customer_address2', 50)->comment('住所2 市町村区');
            $table->string('customer_address3', 100)->comment('住所3 町・番地');
            $table->string('customer_address4', 100)->nullable()->comment('住所4 建物名等');
            // 会計情報
            $table->bigInteger('subtotal')->comment('小計');
            $table->bigInteger('tax_include')->comment('内消費税');
            $table->bigInteger('total')->comment('合計');

            $table->timestamps();

            $table->comment('取引ヘッダー');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_headers');
    }
};
