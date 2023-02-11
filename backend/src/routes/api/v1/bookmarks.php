<?php

use App\Http\Controllers\BookmarksController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'verified'])->name('bookmarks.')->group(function () {
    Route::get('bookmarks/environments', [BookmarksController::class, 'index'])->name('index');

    Route::post('bookmarks/environments', [BookmarksController::class, 'store'])->name('store');

    Route::delete('bookmarks/environments', [BookmarksController::class, 'destroy'])->name('destroy');
});
