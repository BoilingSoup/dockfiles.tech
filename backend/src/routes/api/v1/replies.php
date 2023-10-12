<?php

use App\Http\Controllers\RepliesController;
use Illuminate\Support\Facades\Route;

Route::get('/comments/{id}/replies', [RepliesController::class, 'index'])->name('replies.index');
Route::post('/comments/{id}/replies', [RepliesController::class, 'store'])
  ->middleware(['auth:sanctum', 'verified'])
  ->name('replies.store');

Route::delete('/comments/{id}/replies/{reply_id}', [RepliesController::class, 'destroy'])
  ->middleware(['auth:sanctum', 'verified'])
  ->whereNumber(['id', 'reply_id'])
  ->name('replies.destroy');
