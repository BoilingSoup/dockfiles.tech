<?php

use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

Route::name('categories.')->group(function () {
    Route::get('categories', [CategoriesController::class, 'index'])->name('index');

    Route::get('categories/{id}/environments', [CategoriesController::class, 'show'])
      ->whereNumber('id')
      ->name('show');
});
