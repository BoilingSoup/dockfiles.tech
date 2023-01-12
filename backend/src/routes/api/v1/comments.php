<?php

use App\Http\Controllers\CommentsController;
use Illuminate\Support\Facades\Route;

Route::get('environments/{string_id}/comments/', [CommentsController::class, 'index'])->name('comments.index');

Route::get('environments/{string_id}/comments/count', [CommentsController::class, 'count'])->name('comments.count');

Route::post('environments/{string_id}/comments/{comment}', [CommentsController::class, 'store'])
->middleware('auth:sanctum')
->name('comments.store');

Route::delete('environments/{string_id}/comments/{comment}', [CommentsController::class, 'destroy'])
->middleware('auth:sanctum')
->name('comments.destroy');
