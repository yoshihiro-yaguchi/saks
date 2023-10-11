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
        Schema::create('offices', function (Blueprint $table) {
            $table->id();
            // 契約ID	contract_id	varchar	8
            $table->string('contract_id', 8)->comment('契約ID');
            // 事業所ID	office_id	varchar	50
            $table->string('office_code', 50)->comment('事業所ID');
            // 事業所名	office_name	varchar	100
            $table->string('office_name', 100)->comment('事業所名');
            // 電話番号	phone_number	varchar	15
            $table->string('phone_number', 15)->comment('電話番号');
            // 郵便番号	zipcode	varchar	8
            $table->string('zipcode', 8)->comment('郵便番号');
            // 住所 都道府県	address1	varchar	10
            $table->string('address1', 10)->comment('都道府県');
            // 住所 市区町村	address2	varchar	50
            $table->string('address2', 50)->comment('市区町村');
            // 住所 町・番地	address3	varchar	100
            $table->string('address3', 100)->comment('町・番地');
            // 住所 建物名等	address4	varchar	100
            $table->string('address4', 100)->comment('建物名等');
            $table->timestamps();

            $table->unique(['contract_id', 'office_code'], 'offices_uk1');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offices');
    }
};
