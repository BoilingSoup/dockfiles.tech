<?php

use App\Http\Controllers\CommentsController;

Route::get('environments/{environment}/comments/', [CommentsController::class, 'index'])->name('comments.index');

Route::post('environments/{environment}/comments/{comment}', [CommentsController::class, 'store'])
->middleware('auth')
->name('comments.store');

Route::delete('environments/{environment}/comments/{comment}', [CommentsController::class, 'destroy'])
->middleware('auth')
->name('comments.destroy');
