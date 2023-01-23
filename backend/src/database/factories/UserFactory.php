<?php

namespace Database\Factories;

use Hash;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Create an admin user.
     *
     * @return static
     */
    public function admin()
    {
        return $this->state([
            'name' => config('admin.name'),
            'email' => config('admin.email'),
            'email_verified_at' => now(),
            'password' => Hash::make(config('admin.password')),
            'avatar' => config('admin.avatar'),
            'is_admin' => true,
            'remember_token' => Str::random(10),
        ]);
    }

    /**
     * Create a dummy user simulating a GitHub OAuth registration.
     *
     * @return static
     */
    public function github()
    {
        return $this->state([
            'name' => 'dummyGithubUser',
            'email' => 'github@github.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'avatar' => 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
            'is_admin' => false,
            'remember_token' => Str::random(10),
            'github_id' => 1111,
        ]);
    }

    /**
     * Create a dummy user simulating a GitLab OAuth registration.
     *
     * @return static
     */
    public function gitlab()
    {
        return $this->state([
            'name' => 'dummyGitlabUser',
            'email' => 'gitlab@gitlab.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'avatar' => 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/144_Gitlab_logo_logos-512.png',
            'is_admin' => false,
            'remember_token' => Str::random(10),
            'gitlab_id' => 2222,
        ]);
    }
}
