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
            $table->id();

            $table->string('contract_id', 8)->comment('契約ID');
            $table->unsignedBigInteger('transaction_id')->comment('取引ID');
            $table->string('product_no', 50)->comment('商品番号')->nullable();
            $table->string('production_name', 100)->comment('商品名');
            $table->decimal('quantity', 5, 3)->comment('数量(重量)');
            $table->decimal('unit_price', 9, 3)->comment('単価');
            $table->decimal('tax_rate', 5, 3)->comment('税率');
            $table->decimal('total_price', 9, 3)->comment('金額');

            $table->tinyInteger('delete_flag')->default(0)->comment('削除フラグ 0-存在 1-削除');

            $table->timestamps();
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
