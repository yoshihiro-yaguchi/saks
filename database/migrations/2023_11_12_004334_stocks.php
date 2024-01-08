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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // 商品コード	production_code	varchar	50
            $table->string('production_code', 50)->comment('商品ID');
            // 在庫数	quantity_of_stock	integer
            $table->decimal('quantity_of_stock', 12, 3)->comment('在庫数');
            $table->timestamps();

            // UK
            $table->unique(['contract_id', 'production_code'], 'stocks_uk1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
