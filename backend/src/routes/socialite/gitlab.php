<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;

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
