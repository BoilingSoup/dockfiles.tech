<?php

use App\Http\Controllers\CategoriesController;
use Illuminate\Support\Facades\Route;

Route::get('categories/list', [CategoriesController::class, 'index'])->name('categories.index');

Route::get('categories/{id}', [CategoriesController::class, 'show'])
->whereNumber('id')
->name('categories.show');
