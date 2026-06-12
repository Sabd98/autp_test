<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ClaimController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout'])->middleware(\App\Http\Middleware\JWTAuthenticate::class);
});

Route::middleware(\App\Http\Middleware\JWTAuthenticate::class)->group(function () {
    Route::apiResource('claims', ClaimController::class);
    Route::apiResource('users', UserController::class);

    Route::prefix('profile')->group(function () {
        Route::get('/', [UserController::class, 'profile']);
        Route::put('/', [UserController::class, 'updateProfile']);
        Route::post('reset-password', [UserController::class, 'resetPassword']);
    });
});
