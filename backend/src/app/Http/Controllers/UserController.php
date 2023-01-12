<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(UpdateUserRequest $request)
    {
        $validated = $request->validated();

        $this->updateUserIfValidField($validated, "name");
        $this->updateUserIfValidField($validated, "email");

        //TODO: Only allow changing email if previous user email is verified.
        //TODO: Do not allow changing email if user registered with OAuth.

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
}
