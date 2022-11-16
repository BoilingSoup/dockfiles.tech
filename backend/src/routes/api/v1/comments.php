<?php

use App\Http\Controllers\CommentsController;

Route::get('configuration/{configuration}/comments/', [CommentsController::class, 'index'])->name('comments.index');

Route::post('configurations/{configuration}/comments/{comment}', [CommentsController::class, 'store'])->name('comments.store');

Route::delete('configurations/{configuration}/comments/{comment}', [CommentsController::class, 'destroy'])->name('comments.destroy');
