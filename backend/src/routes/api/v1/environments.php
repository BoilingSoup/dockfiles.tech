<?php

use App\Http\Controllers\EnvironmentsController;
use Illuminate\Support\Facades\Route;

Route::get('environments', [EnvironmentsController::class, 'index'])->name('environments.index');

Route::get('environments/{string_id}', [EnvironmentsController::class, 'show'])->name('environments.show');

Route::post('environments/{id}/like', [EnvironmentsController::class, 'like'])
->whereNumber('id')
->middleware('auth:sanctum')
->name('environments.like');

Route::post('environments/{id}/unlike', [EnvironmentsController::class, 'unlike'])
->whereNumber('id')
->middleware('auth:sanctum')
->name('environments.unlike');
