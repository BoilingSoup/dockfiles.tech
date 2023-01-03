<?php

namespace App\Models;

use App\Notifications\PasswordReset;
use App\Notifications\VerifyEmail;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'avatar',
        'email',
        'email_verified_at',
        'password',
        'github_token',
        'github_refresh_token',
        'github_id',
        'gitlab_token',
        'gitlab_refresh_token',
        'gitlab_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'is_banned',
        'email',
        'email_verified_at',
        'password',
        'remember_token',
        'github_token',
        'github_refresh_token',
        'github_id',
        'gitlab_token',
        'gitlab_refresh_token',
        'gitlab_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    public function comments()
    {
        return $this->hasMany(Comments::class, ForeignKeyCol::users);
    }

    public function repliesAuthored()
    {
        return $this->hasMany(Replies::class, ForeignKeyCol::reply_author);
    }

    public function repliesReceived()
    {
        return $this->hasMany(Replies::class, ForeignKeyCol::reply_recipient);
    }

    public function bookmarks()
    {
        return $this->belongsToMany(Environments::class, 'bookmarks', ForeignKeyCol::users, ForeignKeyCol::environments);
    }

    public function environments()
    {
        return $this->hasMany(Environments::class, ForeignKeyCol::users);
    }

    public function likes()
    {
        return $this->hasMany(Likes::class, ForeignKeyCol::users);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail());
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordReset($token));
    }

    public function scopeWherePasswordIsNotNull(Builder $query)
    {
        return $query->whereNotNull('password');
    }

    /**
     * Retrieve admin user created by factory
     */
    public static function admin()
    {
        return static::where('email', config('admin.email'))->wherePasswordIsNotNull()->first();
    }

    /**
     * Retrieve user by email only where password is not null.
     *
     * @param  string  $email
     * @return Authenticatable | null
     */
    public static function findByEmailWherePasswordExists(string $email)
    {
        return static::where('email', $email)->wherePasswordIsNotNull()->first();
    }

    /**
     * Check if user exists and password is not null.
     *
     * @param  string  $email
     * @return bool
     */
    public static function emailAndPasswordExists(string $email)
    {
        return (bool) static::findByEmailWherePasswordExists($email);
    }

    /**
     * Return a query function to find a user by email, password must not be null.
     *
     * @param  string  $email
     * @return callable
     */
    public static function queryByEmailWherePasswordIsNotNull(string $email)
    {
        return function (Builder $query) use ($email) {
            $query->where('email', $email)->wherePasswordIsNotNull()->first();
        };
    }
}
