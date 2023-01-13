<?php

namespace Tests\Feature\User;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
}
