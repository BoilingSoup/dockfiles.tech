<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    return "test";
});

Route::get('/github/redirect', function () {
    return Socialite::driver('github')->stateless()->redirect();
});

Route::get('/github/callback', function () {
    $user = Socialite::driver('github')->stateless()->user();
    dd($user);
});
