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

use App\Helpers\Routes\RouteHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

RouteHelper::includeRouteFiles(__DIR__ . '/auth');

Route::get('/', function () {
  $authStatus = Auth::check() ? 'Authenticated' : 'Unauthenticated';
  // dump(Auth::user());

  return 'test' . '<br>' . $authStatus;
});

Route::get('/verified-only', function () {
  $verifiedStatus = Auth::user()?->hasVerifiedEmail() ? 'Verified' : 'Unverified';

  return 'test' . '<br>' . $verifiedStatus;
})->middleware('auth');
