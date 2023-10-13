<?php

use App\Http\Controllers\RepliesController;
use Illuminate\Support\Facades\Route;

Route::name('replies.')->group(function () {
    Route::get('/comments/{id}/replies', [RepliesController::class, 'index'])->whereNumber('id')->name('index');

    Route::middleware(['auth:sanctum', 'verified'])->group(function () {
        Route::post('/comments/{id}/replies', [RepliesController::class, 'store'])->whereNumber('id')->name('store');

        Route::delete('/comments/{id}/replies/{reply_id}', [RepliesController::class, 'destroy'])
          ->whereNumber(['id', 'reply_id'])
          ->name('destroy');

        Route::get('/replies/received', [RepliesController::class, 'received'])
          ->name('received');
    });
});
