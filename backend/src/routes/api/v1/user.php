<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('user', [UserController::class, 'update'])->name('user.update')
->middleware('auth:sanctum');

Route::post('user/password', [UserController::class, 'changePassword'])->name('user.changePassword');

Route::get('user/environment/{id}/status', [UserController::class, 'checkEnvironmentStatus'])
->whereNumber('id')
->middleware('auth:sanctum')
->name('user.checkEnvironmentStatus');

Route::post('user/avatar', [UserController::class, 'updateAvatar'])->middleware(['auth:sanctum']);
