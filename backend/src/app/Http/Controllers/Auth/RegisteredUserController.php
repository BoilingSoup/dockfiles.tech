<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\MissingValidationException;
use App\Exceptions\UserWithEmailAlreadyExistsException;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /** @var extra safe-guard */
    private bool $requestValidated = false;

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        if (User::emailAndPasswordExists($request->email)) {
            throw new UserWithEmailAlreadyExistsException();
        }

        $this->validateCredentials($request);

        $user = $this->createUser($request);

        event(new Registered($user));

        Auth::login($user);

        return [
          "id" => Auth::user()->id,
          "name" => Auth::user()->name,
          "email_verified_at" => "",
          "avatar" => "",
          "is_admin" => false
        ];
    }

    private function validateCredentials(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $this->requestValidated = true;
    }

    private function createUser(Request $request)
    {
        if ($this->requestValidated) {
            return User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
        }

        // Should never reach here. It's an extra safe-guard to
        // prevent logical errors in the future.
        return throw new MissingValidationException();
    }
}
