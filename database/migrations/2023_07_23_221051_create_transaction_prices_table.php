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
        Schema::create('transaction_prices', function (Blueprint $table) {
            $table->id();

            $table->string('contract_id', 8)->comment('契約ID');
            $table->unsignedBigInteger('transaction_id')->comment('取引ID');

            $table->decimal('tax_rate', 8, 3)->comment('税率');
            $table->decimal('taxable_amount', 12, 3)->comment('単価');
            $table->decimal('tax_include', 12, 3)->comment('内消費税');

            $table->tinyInteger('delete_flag')->default(0)->comment('削除フラグ 0-存在 1-削除');
            $table->timestamps();

            // テーブルコメント
            $table->comment('取引価格');
            // インデックス
            $table->index(['contract_id', 'transaction_id'], 'transaction_prices_index_1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_prices');
    }
};
