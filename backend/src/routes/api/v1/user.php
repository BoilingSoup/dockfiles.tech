<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::post('user', [UserController::class, 'update'])->name('user.update')
->middleware("auth:sanctum");

Route::post("user/password", [UserController::class, 'changePassword'])->name('user.changePassword');
