<?php

namespace Tests\Feature\Bookmarks;

use App\Models\Environments;
use App\Models\User;
use Database\Helpers\ForeignKeyCol;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Traits\PaginatedEnvironmentsJsonStructure;
use Tests\TestCase;

class BookmarksTest extends TestCase
{
    use RefreshDatabase;
    use PaginatedEnvironmentsJsonStructure;

    public function test_bookmarks_index_returns_401_response_if_not_authenticated()
    {
        $response = $this->get(route("bookmarks.index"));

        $response->assertStatus(401);
    }

    public function test_bookmarks_index_returns_200_response_if_authenticated()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route("bookmarks.index"));

        $response->assertStatus(200);
    }

    public function test_bookmarks_index_response_json_structure_is_expected_shape()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route("bookmarks.index"));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_store_returns_401_response_if_not_authenticated()
    {
        $response = $this->postJson(route("bookmarks.store"), [ForeignKeyCol::environments => "1"]);

        $response->assertStatus(401);
    }

    public function test_bookmarks_store_returns_422_reponse_if_environment_id_in_request_body_is_not_numeric()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->postJson(route("bookmarks.store"), [ForeignKeyCol::environments => "non-numeric param"]);

        $response->assertStatus(422);
        $response->assertExactJson([
          "message" => "The environment id must be an integer.",
          "errors" => [
            ForeignKeyCol::environments => [
              "The environment id must be an integer."
            ]
          ]
        ]);
    }

    public function test_bookmarks_store_writes_to_database_and_returns_201_response_if_user_is_authenticated_and_environment_id_is_not_already_bookmarked_by_the_user()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $envId = Environments::first()->id;

        $response = $this->postJson(route("bookmarks.store"), [ForeignKeyCol::environments => $envId]);

        $response->assertStatus(201);
        $this->assertDatabaseHas("bookmarks", [
          ForeignKeyCol::environments => $envId,
          ForeignKeyCol::users => $user->id
        ]);
    }

    public function test_bookmarks_store_returns_500_error_and_does_not_write_duplicate_record_to_database_if_environment_id_is_already_bookmarked_by_the_user()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $envId = Environments::first()->id;
        $this->postJson(route("bookmarks.store"), [ForeignKeyCol::environments => $envId])->assertStatus(201);

        $response = $this->postJson(route("bookmarks.store"), [ForeignKeyCol::environments => $envId]);

        $response->assertStatus(500);
        $this->assertDatabaseCount("bookmarks", 1);
    }

    /** @return Authenticatable */
    private function seedTablesAndGetUser()
    {
        $this->seedTables();
        return User::all()->first();
    }

    private function seedTables()
    {
        User::factory()->create();
        CategoriesSeeder::seedTest();
        EnvironmentsSeeder::seedTest();
    }
}
