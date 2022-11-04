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

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

Route::get('/', function () {
    $authStatus = Auth::check() ? 'Authenticated' : 'Unauthenticated';
    return 'test' . '<br>' . $authStatus;
});

Route::get('/github/redirect', function () {
    return Socialite::driver('github')->redirect();
});

Route::get('/github/callback', function () {
    $githubUser = Socialite::driver('github')->user();

    $user = User::updateOrCreate(
        ['github_id' => $githubUser->id],
        [
            'name' => $githubUser->name,
            'email' => $githubUser->email,
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken
        ]
    );

    Auth::login($user);

    return redirect('/');
});

Route::get('/gitlab/redirect', function () {
    return Socialite::driver('gitlab')->redirect();
});

Route::get('/gitlab/callback', function () {
    $gitlabUser = Socialite::driver('gitlab')->user();

    $user = User::updateOrCreate(
        ['gitlab_id' => $gitlabUser->id],
        [
            'name' => $gitlabUser->name,
            'email' => $gitlabUser->email,
            'gitlab_token' => $gitlabUser->token,
            'gitlab_refresh_token' => $gitlabUser->refreshToken
        ]
    );

    Auth::login($user);

    return redirect('/');
});
