<?php

use App\Http\Controllers\RepliesController;
use Illuminate\Support\Facades\Route;

Route::get('/comments/{id}/replies', [RepliesController::class, 'index'])->name('replies.index');
Route::post('/comments/{id}/replies', [RepliesController::class, 'store'])
  ->middleware(['auth:sanctum', 'verified'])
  ->name('replies.store');
