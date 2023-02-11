<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\Bookmarks
 *
 * @property int $id
 * @property int $environment_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\BookmarksFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks query()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks whereEnvironmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmarks whereUserId($value)
 */
	class Bookmarks extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Categories
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Environments[] $environments
 * @property-read int|null $environments_count
 * @method static \Database\Factories\CategoriesFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Categories newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categories newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Categories query()
 * @method static \Illuminate\Database\Eloquent\Builder|Categories whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categories whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categories whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Categories whereUpdatedAt($value)
 */
	class Categories extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Comments
 *
 * @property int $id
 * @property string $content
 * @property int $user_id
 * @property int $environment_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $author
 * @property-read \App\Models\Environments|null $environment
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Replies[] $replies
 * @property-read int|null $replies_count
 * @method static \Database\Factories\CommentsFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments query()
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereEnvironmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Comments whereUserId($value)
 */
	class Comments extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Environments
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $string_id
 * @property string $repo_owner
 * @property string $repo_name
 * @property string $repo_branch
 * @property int $category_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $bookmarkedBy
 * @property-read int|null $bookmarked_by_count
 * @property-read \App\Models\Categories|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comments[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $likes
 * @property-read int|null $likes_count
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\EnvironmentsFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Environments newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Environments query()
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereRepoBranch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereRepoName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereRepoOwner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereStringId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Environments whereUserId($value)
 */
	class Environments extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Likes
 *
 * @property int $id
 * @property int $environment_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\LikesFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Likes newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Likes newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Likes query()
 * @method static \Illuminate\Database\Eloquent\Builder|Likes whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Likes whereEnvironmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Likes whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Likes whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Likes whereUserId($value)
 */
	class Likes extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Replies
 *
 * @property int $id
 * @property string $content
 * @property bool $is_read
 * @property int $author_id
 * @property int $recipient_id
 * @property int $comment_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $author
 * @property-read \App\Models\Comments|null $comment
 * @property-read \App\Models\User|null $recipient
 * @method static \Database\Factories\RepliesFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Replies newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Replies query()
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereAuthorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereCommentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereIsRead($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereRecipientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Replies whereUpdatedAt($value)
 */
	class Replies extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $avatar
 * @property bool $is_admin
 * @property int $is_banned
 * @property int|null $github_id
 * @property string|null $github_token
 * @property string|null $github_refresh_token
 * @property int|null $gitlab_id
 * @property string|null $gitlab_token
 * @property string|null $gitlab_refresh_token
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Environments[] $bookmarks
 * @property-read int|null $bookmarks_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Comments[] $comments
 * @property-read int|null $comments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Environments[] $environments
 * @property-read int|null $environments_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Environments[] $likes
 * @property-read int|null $likes_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Replies[] $repliesAuthored
 * @property-read int|null $replies_authored_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Replies[] $repliesReceived
 * @property-read int|null $replies_received_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGithubId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGithubRefreshToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGithubToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGitlabId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGitlabRefreshToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGitlabToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsAdmin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereIsBanned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePasswordIsNotNull()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent implements \Illuminate\Contracts\Auth\MustVerifyEmail {}
}

