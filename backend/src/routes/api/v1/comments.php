<?php

use App\Http\Controllers\CommentsController;
use Illuminate\Support\Facades\Route;

Route::name('comments.')->group(function () {
    Route::get('environments/{string_id}/comments/', [CommentsController::class, 'index'])->name('index');

    Route::get('environments/{string_id}/comments/count', [CommentsController::class, 'count'])->name('count');

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('environments/{string_id}/comments/', [CommentsController::class, 'store'])
          ->name('store');

        Route::delete('environments/{string_id}/comments/{comment}', [CommentsController::class, 'destroy'])
          ->whereNumber('comment')
          ->name('destroy');

        Route::get('comment/{id}', [CommentsController::class, 'show'])->name('show');
    });
});
