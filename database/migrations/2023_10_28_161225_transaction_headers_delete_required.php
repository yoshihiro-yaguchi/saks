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
            $table->string('customer_name', 10)->nullable()->comment('お名前')->change();
            $table->string('customer_zip_code', 8)->nullable()->comment('郵便番号')->change();
            $table->string('customer_address1', 10)->nullable()->comment('住所1 都道府県')->change();
            $table->string('customer_address2', 50)->nullable()->comment('住所2 市町村区')->change();
            $table->string('customer_address3', 100)->nullable()->comment('住所3 町・番地')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaction_headers', function (Blueprint $table) {
            $table->string('customer_name', 10)->comment('お名前')->change();
            $table->string('customer_zip_code', 8)->comment('郵便番号')->change();
            $table->string('customer_address1', 10)->comment('住所1 都道府県')->change();
            $table->string('customer_address2', 50)->comment('住所2 市町村区')->change();
            $table->string('customer_address3', 100)->comment('住所3 町・番地')->change();
        });
    }
};
