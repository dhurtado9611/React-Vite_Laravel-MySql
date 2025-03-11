<?php
use App\Http\Controllers\ReservaController;
use Illuminate\Support\Facades\Route;

// Rutas para CRUD
Route::get('/reservas', [ReservaController::class, 'index']);
Route::post('/reservas', [ReservaController::class, 'store']);
Route::get('/reservas/{id}', [ReservaController::class, 'show']);
Route::put('/reservas/{id}', [ReservaController::class, 'update']);
Route::delete('/reservas/{id}', [ReservaController::class, 'destroy']);
