<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\Feature\Traits\UserInfoJsonStructure;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use UserInfoJsonStructure;

    public function test_user_update_route_returns_401_response_if_not_authenticated()
    {
        $response = $this->postJson(route("user.update"), ["name" => "not authenticated, does not matter"]);

        $response->assertStatus(401);
    }

    public function test_user_update_changes_user_name_if_authenticated_and_new_name_is_between_4_and_20_characters()
    {
        $initialName = "initialName";
        /** @var Authenticatable | Model */
        $user = User::factory()->create(["name" => $initialName]);
        $this->actingAs($user);
        $newName = "validName";

        $response = $this->postJson(route("user.update"), ["name" => $newName]);

        $response->assertStatus(200);
        $this->assertDatabaseHas("users", $user->toArray());
        $this->assertDatabaseMissing("users", [...$user->toArray(), "name" => $initialName]);
    }

    public function test_user_update_does_not_change_email_if_authenticated_user_is_registered_with_oauth()
    {
        /** @var Authenticatable | Model */
        $githubUser = User::factory()->github()->create();
        $this->actingAs($githubUser);
        $email = $githubUser->email;
        $newEmail = "cantChangeEmail@email.com";

        $response = $this->postJson(route("user.update"), ["email" => $newEmail]);

        $response->assertStatus(200);
        $this->assertEquals($githubUser->email, $email);
        $this->assertNotEquals($githubUser->email, $newEmail);
        $this->assertDatabaseHas("users", $githubUser->toArray());
        $this->assertDatabaseMissing("users", [...$githubUser->toArray(), "email" => $newEmail]);

        /** @var Authenticatable | Model */
        $gitlabUser = User::factory()->gitlab()->create();
        $this->actingAs($gitlabUser);
        $email = $gitlabUser->email;

        $response = $this->postJson(route("user.update"), ["email" => $newEmail]);

        $response->assertStatus(200);
        $this->assertEquals($gitlabUser->email, $email);
        $this->assertNotEquals($gitlabUser->email, $newEmail);
        $this->assertDatabaseHas("users", $gitlabUser->toArray());
        $this->assertDatabaseMissing("users", [...$gitlabUser->toArray(), "email" => $newEmail]);
    }

    public function test_change_password_returns_422_response_if_current_password_is_not_sent_in_request_body()
    {
        /** @var Authenticatable | Model */
        $user = User::factory()->create(["password" => Hash::make("password")]);
        $this->actingAs($user);

        $response = $this->postJson(route("user.changePassword"), [
          "password" => "newPassword",
          "password_confirmation" => "newPassword"
        ]);

        $response->assertStatus(422);
    }

    public function test_change_password_returns_422_response_if_current_password_is_incorrect()
    {
        /** @var Authenticatable | Model */
        $user = User::factory()->create(["password" => Hash::make("password")]);
        $this->actingAs($user);

        $response = $this->postJson(route("user.changePassword"), [
          "current_password" => "notMyCurrentPassword",
          "password" => "newPassword",
          "password_confirmation" => "newPassword",
        ]);

        $response->assertStatus(422)->assertExactJson([
          "message" => "The password is incorrect.",
          "errors" => [
            "current_password" => [
              "The password is incorrect."
            ]
          ]
        ]);
    }

    public function test_change_password_returns_403_response_if_user_is_registered_with_oauth()
    {
        /** @var Authenticatable | Model */
        $githubUser = User::factory()->github()->create();
        $this->actingAs($githubUser);

        $response = $this->postJson(route("user.changePassword"), [
          "current_password" => "password",
          "password" => "cantChange",
          "password_confirmation" => "cantChange"
        ]);

        $response->assertStatus(403);

        /** @var Authenticatable | Model */
        $gitlabUser = User::factory()->github()->create();
        $this->actingAs($gitlabUser);

        $response = $this->postJson(route("user.changePassword"), [
          "current_password" => "password",
          "password" => "cantChange",
          "password_confirmation" => "cantChange"
        ]);

        $response->assertStatus(403);
    }

    public function test_change_password_changes_the_authenticated_users_password_if_current_password_is_correct_and_a_valid_new_password_and_confirmation_is_given()
    {
        /** @var Authenticatable | Model */
        $user = User::factory()->create(["password" => Hash::make("password")]);
        $email = $user->email;
        $oldPassword = "password";
        $newPassword = "newPassword";
        $this->actingAs($user);

        $response = $this->postJson(route("user.changePassword"), [
          "current_password" => $oldPassword,
          "password" => $newPassword,
          "password_confirmation" => $newPassword
        ]);

        $response->assertStatus(204);
        $this->assertTrue(Hash::check("newPassword", $user->password));

        $this->post(route("logout"));
        $response = $this->postJson(route("login"), [
          "email" => $email,
          "password" => $oldPassword
        ]);

        $response->assertStatus(403);
        $response->assertExactJson([
          "success" => false,
          "message" => "These credentials do not match our records."
        ]);

        $response = $this->postJson(route("login"), [
          "email" => $email,
          "password" => $newPassword
        ]);
        $response->assertStatus(200);
        $response->assertJsonStructure($this->userInfoJsonStructure());
    }
}
