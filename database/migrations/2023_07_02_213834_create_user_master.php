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
        Schema::create('user_master', function (Blueprint $table) {
            $table->id()->comment('ID');
            $table->string('contract_id', 8)->comment('契約ID');
            $table->string('mail_address', 256)->comment('メールアドレス');
            $table->string('password', 256)->comment('パスワード');
            $table->unsignedInteger('authority_level')->comment('権限レベル');
            $table->string('name', 128)->comment('氏名');
            $table->unsignedInteger('delete_flag')->comment('削除フラグ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_master');
    }
};
