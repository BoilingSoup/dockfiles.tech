<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
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
    ];


    public function scopeWherePasswordIsNotNull(Builder $query)
    {
        return $query->whereNotNull('password');
    }


    /**
     * Retrieve user by email only where password is not null.
     * 
     * @param string $email
     * @return Authenticatable | null
     */
    public static function findByEmailWherePasswordExists(string $email)
    {
        return static::where('email', $email)->wherePasswordIsNotNull()->first();
    }


    /**
     * Check if user exists and password is not null.
     * 
     * @param string $email
     * @return bool
     */
    public static function emailAndPasswordExists(string $email)
    {
        return (bool) static::findByEmailWherePasswordExists($email);
    }


    /**
     * Return a query function to find a user by email, password must not be null.
     * 
     * @param string $email
     * @return callable
     */
    public static function queryByEmail(string $email)
    {
        return function (Builder $query) use ($email) {
            $query->where('email', $email)->wherePasswordIsNotNull()->first();
        };
    }
}
