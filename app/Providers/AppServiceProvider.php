<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 商用環境以外だった場合、SQLログを出力する
        if (config('app.env') !== 'production') {
            DB::listen(function ($query) {
                Log::info("Query Time:{$query->time}s] $query->sql");
            });
        }
    }
}
