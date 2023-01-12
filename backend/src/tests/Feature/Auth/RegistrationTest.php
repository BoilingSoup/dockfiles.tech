<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Traits\UserInfoJsonStructure;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;
    use UserInfoJsonStructure;

    private array $userWithEmailAlreadyExistsResponse = [
        'success' => false,
        'message' => 'A user with that email already exists.',
    ];

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
        $response->assertJsonStructure($this->userInfoJsonStructure());
    }

    public function test_users_cant_register_with_same_email()
    {
        $this->attemptRegistration();
        $this->post('/logout');

        $this->attemptRegistration()
            ->assertStatus(403)
            ->assertJson($this->userWithEmailAlreadyExistsResponse);

        $this->assertGuest();
    }

    public function test_user_name_less_than_4_characters_returns_422_response()
    {
        $response = $this->postJson('/register', [
          "name" => "x",
          "email" => "test@example.com",
          "password" => "password",
          "password_confirmation" => "password"
          ]);

        $response->assertStatus(422);
        $this->assertEquals($response["message"], "The name must be at least 4 characters.");
    }

    private function attemptRegistration()
    {
        return $this->postJson('/register', $this->payload);
    }
}
