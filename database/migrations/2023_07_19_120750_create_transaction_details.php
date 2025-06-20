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
        Schema::create('transaction_details', function (Blueprint $table) {
            // カラム
            $table->id();

            $table->string('contract_id', 8)->comment('契約ID');
            $table->unsignedBigInteger('transaction_id')->comment('取引ID');
            $table->string('product_no', 50)->comment('商品番号')->nullable();
            $table->string('product_name', 100)->comment('商品名');
            $table->decimal('quantity', 8, 3)->comment('数量(重量)');
            $table->string('unit', 5)->comment('単位')->nullable();
            $table->decimal('unit_price', 12, 3)->comment('単価');
            $table->decimal('tax_rate', 8, 3)->comment('税率');
            $table->decimal('total_price', 12, 3)->comment('金額');

            $table->timestamps();

            // テーブルコメント
            $table->comment('取引明細');
            // インデックス
            $table->index(['contract_id', 'transaction_id'], 'transaction_details_index_1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_details');
    }
};
