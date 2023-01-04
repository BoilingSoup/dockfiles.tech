<?php

namespace Tests\Feature\Bookmarks;

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
        $this->seedTables();
        /** @var Authenticatable */
        $user = User::all()->first();
        $this->actingAs($user);

        $response = $this->get(route("bookmarks.index"));

        $response->assertStatus(200);
    }

    public function test_bookmarks_index_response_json_structure_is_expected_shape()
    {
        $this->seedTables();
        /** @var Authenticatable */
        $user = User::all()->first();
        $this->actingAs($user);

        $response = $this->get(route("bookmarks.index"));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_store_returns_401_response_if_not_authenticated()
    {
        $response = $this->post(route("bookmarks.store", [ForeignKeyCol::environments, "1"]));

        $response->assertStatus(401);
    }

    private function seedTables()
    {
        User::factory()->create();
        CategoriesSeeder::seedTest();
        EnvironmentsSeeder::seedTest();
    }
}
