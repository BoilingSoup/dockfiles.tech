<?php

use App\Http\Controllers\EnvironmentsController;
use Illuminate\Support\Facades\Route;

Route::name('environments.')->group(function () {
    Route::get('environments', [EnvironmentsController::class, 'index'])->name('index');

    Route::get('environments/{string_id}', [EnvironmentsController::class, 'show'])->name('show');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('environments/{id}/like', [EnvironmentsController::class, 'like'])
        ->whereNumber('id')
        ->name('like');

        Route::post('environments/{id}/unlike', [EnvironmentsController::class, 'unlike'])
        ->whereNumber('id')
        ->name('unlike');
    });
});
