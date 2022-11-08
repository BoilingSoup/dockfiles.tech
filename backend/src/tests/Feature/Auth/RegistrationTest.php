<?php

namespace Tests\Feature\Auth;

use App\Exceptions\UserWithEmailAlreadyExistsException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    protected $payload = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ];

    public function test_new_users_can_register()
    {
        $response = $this->attemptRegistration();

        $this->assertAuthenticated();
        $response->assertNoContent();
    }

    public function test_users_cant_register_with_same_email()
    {
        $this->attemptRegistration();
        $this->post('/logout');

        $this->attemptRegistration()
            ->assertStatus(403)
            ->assertJson(UserWithEmailAlreadyExistsException::class);

        $this->assertGuest();
    }

    private function attemptRegistration()
    {
        return $this->post('/register', $this->payload);
    }
}
