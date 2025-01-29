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
        Schema::create('stocks_change_history', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // 商品コード	production_code	varchar	50
            $table->string('production_code', 50)->comment('商品コード');
            // 変動区分	change_classification	varchar	5
            $table->string('change_division', 5)->comment('変動区分');
            // 変動数	change_quantity	number
            $table->decimal('change_quantity', 8, 3)->comment('変動数');
            // 在庫数	quantity_of_stock	number
            $table->decimal('quantity_of_stock', 12, 3)->comment('在庫数');
            // メモ	memo	text
            $table->text('memo')->comment('メモ')->nullable();
            $table->timestamps();

            $table->unique(['contract_id', 'production_code', 'created_at'], 'stocks_change_history_uk1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks_change_history');
    }
};
