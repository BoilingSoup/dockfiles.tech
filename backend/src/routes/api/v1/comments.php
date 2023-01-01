<?php

use App\Http\Controllers\CommentsController;

Route::get('environments/{string_id}/comments/', [CommentsController::class, 'index'])->name('comments.index');

Route::get("environments/{string_id}/comments/count", [CommentsController::class, 'count'])->name('comments.count');

Route::post('environments/{string_id}/comments/{comment}', [CommentsController::class, 'store'])
->middleware('auth')
->name('comments.store');

Route::delete('environments/{string_id}/comments/{comment}', [CommentsController::class, 'destroy'])
->middleware('auth')
->name('comments.destroy');
