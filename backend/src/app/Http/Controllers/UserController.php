<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\UserUpdateAvatarRequest;
use App\Http\Responses\FormattedApiResponse;
use App\Models\User;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

        $this->updateUserIfValidField($validated, 'name');
        if ((! $isOauthAccount) && $isVerified) {
            $this->updateUserIfValidField($validated, 'email');
        }

        Auth::user()->saveOrFail();

        return Auth::user();
    }

    public function updateAvatar(UserUpdateAvatarRequest $request)
    {
        $validated = (array) $request->validated();
        $newAvatar = $validated['avatar'];

        $currAvatarSrc = Auth::user()->avatar;

        $isCloudinary = ImageHelper::isCloudinaryURL($currAvatarSrc);

        if ($isCloudinary) {
            Cloudinary::destroy(ImageHelper::UrlToPublicID($currAvatarSrc));
        }

        $avatarSrc = Cloudinary::upload($newAvatar->getRealPath())->getSecurePath();

        Auth::user()->avatar = $avatarSrc;
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
        if (! array_key_exists($fieldName, $validated)) {
            return;
        }

        $fieldInDB = Auth::user()[$fieldName];
        if ($fieldInDB === $validated[$fieldName]) {
            return;
        }

        Auth::user()[$fieldName] = $validated[$fieldName];

        if ($fieldName === 'email') {
            Auth::user()->email_verified_at = null;
            Auth::user()->sendEmailVerificationNotification();
        }
    }

    /**
     * Change the authenticated User's password.
     * If the User is registered with OAuth the action will return a 403 response.
     *
     * @return Response
     */
    public function changePassword(UpdatePasswordRequest $request)
    {
        $validated = $request->validated(); // validation will throw an error if current_password is incorrect.

        $isOauthAccount = Auth::user()->github_id || Auth::user()->gitlab_id;
        abort_if($isOauthAccount, 403);

        $newPassword = $validated['password'];
        Auth::user()->password = Hash::make($newPassword);
        Auth::user()->saveOrFail();

        return response()->noContent();
    }

    /**
     * Check whether the authenticated User has liked or bookmarked the Environment by numeric ID.
     *
     * @return FormattedApiResponse
     */
    public function checkEnvironmentStatus(Request $request)
    {
        $environmentId = $request->id;
        $isBookmarked = Auth::user()->bookmarks()->where(ForeignKeyCol::environments, $environmentId)->exists();
        $isLiked = Auth::user()->likes()->where(ForeignKeyCol::environments, $environmentId)->exists();

        return new FormattedApiResponse(
            success: true,
            data: [
                'is_bookmarked' => $isBookmarked,
                'is_liked' => $isLiked,
            ]
        );
    }
}
