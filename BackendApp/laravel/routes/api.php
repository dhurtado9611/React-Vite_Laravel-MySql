<?php
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;

// Esto ya cubre todas las rutas necesarias para CRUD
Route::apiResource('reservas', ReservaController::class);

Route::get('/test', function () {
    return response()->json(['message' => 'Ruta funcionando correctamente']);
});
