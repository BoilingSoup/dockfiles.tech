<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();

        Auth::user()->name = $validated["name"];
        Auth::user()->saveOrFail();
        return Auth::user();
    }
}
