<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::name('user.')->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('user', [UserController::class, 'update'])->name('update');

        Route::post('user/password', [UserController::class, 'changePassword'])->name('changePassword');

        Route::get('user/environment/{id}/status', [UserController::class, 'checkEnvironmentStatus'])
        ->whereNumber('id')
        ->name('checkEnvironmentStatus');

        Route::post('user/avatar', [UserController::class, 'updateAvatar'])->name('updateAvatar');

        Route::delete('user', [UserController::class, 'destroy'])->name('destroy');
    });
});
