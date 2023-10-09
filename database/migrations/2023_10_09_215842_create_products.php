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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // 商品コード	production_code	varchar	8
            $table->string('production_code', 8)->comment('商品コード');
            // 商品名	production_name	varchar	100
            $table->string('production_name', 100)->comment('商品名');
            // 単価	unit_price	decimal
            $table->decimal('unit_price', 12, 3)->comment('単価');
            // 税区分	tax_division	tinyint unsigned
            $table->tinyInteger('tax_division',false, true)->comment('税区分');
            // 税率	tax_rate	decimal
            $table->decimal('tax_rate', 8, 3)->comment('税率');
            // 単位	unit	varchar	5
            $table->string('unit', 5)->nullable()->comment('単位');
            $table->timestamps();

            $table->unique(['contract_id', 'production_code'], 'products_uk1');
            $table->index(['production_name'], 'products_idx1');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
