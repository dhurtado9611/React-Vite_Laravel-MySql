<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define las rutas base para la aplicación.
     */
    public function boot()
    {
        $this->routes(function () {
            // Rutas para API (usa el prefijo 'api')
            Route::prefix('api')
                ->middleware('api')
                ->group(base_path('routes/api.php'));

            // Rutas para la web
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}