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
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->string('product_name', 100)->comment('商品名')->nullable()->change();
            $table->decimal('quantity', 8, 3)->comment('数量(重量)')->nullable()->change();
            $table->decimal('unit_price', 12, 3)->comment('単価')->nullable()->change();
            $table->decimal('tax_rate', 8, 3)->comment('税率')->nullable()->change();
            $table->decimal('total_price', 12, 3)->comment('金額')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_details', function (Blueprint $table) {
            $table->string('product_name', 100)->comment('商品名')->change();
            $table->decimal('quantity', 8, 3)->comment('数量(重量)')->change();
            $table->decimal('unit_price', 12, 3)->comment('単価')->change();
            $table->decimal('tax_rate', 8, 3)->comment('税率')->change();
            $table->decimal('total_price', 12, 3)->comment('金額')->change();
        });
    }
};
