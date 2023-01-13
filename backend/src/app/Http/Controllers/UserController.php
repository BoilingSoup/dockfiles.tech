<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Change the authenticated User's name and/or email.
     * If the User is registered with OAuth, an attempt to change the email will be ignored.
     *
     * @return User
     */
    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();
        $isOauthAccount = Auth::user()->github_id || Auth::user()->gitlab_id;
        $isVerified = Auth::user()->hasVerifiedEmail();

        $this->updateUserIfValidField($validated, "name");
        if ((!$isOauthAccount) && $isVerified) {
            $this->updateUserIfValidField($validated, "email");
        }

        Auth::user()->saveOrFail();
        return Auth::user();
    }

    /**
     * Compare a field of the authenticated User in the database to the validated form input.
     * If the values are different, update the User model with the validated form input.
     * This method does not save the updated User to the database. To save the new User info,
     * you must call Auth::user()->save() after calling this method.
     */
    private function updateUserIfValidField(array $validated, string $fieldName): void
    {
        if (!array_key_exists($fieldName, $validated)) {
            return;
        }

        $fieldInDB = Auth::user()[$fieldName];
        if ($fieldInDB === $validated[$fieldName]) {
            return;
        }

        Auth::user()[$fieldName] = $validated[$fieldName];

        if ($fieldName === "email") {
            Auth::user()->email_verified_at = null;
            Auth::user()->sendEmailVerificationNotification();
        }
    }

    public function changePassword(UpdatePasswordRequest $request)
    {
    }
}
