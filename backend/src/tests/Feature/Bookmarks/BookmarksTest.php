<?php

namespace Tests\Feature\Bookmarks;

use App\Models\Categories;
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
        $response = $this->get(route('bookmarks.index'));

        $response->assertStatus(401);
    }

    public function test_bookmarks_index_returns_200_response_if_authenticated()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route('bookmarks.index'));

        $response->assertStatus(200);
    }

    public function test_bookmarks_index_with_no_filter_query_params_returns_response_json_structure_in_expected_shape()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route('bookmarks.index'));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_index_with_non_numeric_category_id_param_returns_404_response()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route('bookmarks.index', [ForeignKeyCol::categories => 'non-numeric']));

        $response->assertStatus(404);
    }

    public function test_bookmarks_index_with_a_numeric_but_invalid_category_id_param_returns_404_response()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $allCategoryIds = Categories::all()->pluck('id');
        $invalidId = [];
        while (true) {
            $randId = random_int(1, PHP_INT_MAX);
            if (! $allCategoryIds->has($randId)) {
                $invalidId[] = $randId;
                break;
            }
        }
        $invalidId = $invalidId[0];

        $response = $this->getJson(route('bookmarks.index', [ForeignKeyCol::categories => $invalidId]));

        $response->assertStatus(404);
    }

    public function test_bookmarks_index_with_valid_category_id_param_returns_response_json_structure_in_expected_shape()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $categoryId = Categories::first()->id;

        $response = $this->getJson(route('bookmarks.index', [ForeignKeyCol::categories => $categoryId]));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_index_with_search_param_returns_response_json_structure_in_expected_shape()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->getJson(route('bookmarks.index', ['search' => 'a search string']));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_index_with_search_param_and_non_numeric_category_id_param_returns_404_response()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->get(route('bookmarks.index', [ForeignKeyCol::categories => 'non-numeric', 'search' => 'a search string']));

        $response->assertStatus(404);
    }

    public function test_bookmarks_index_with_search_param_and_a_numeric_but_invalid_category_id_param_returns_404_response()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $allCategoryIds = Categories::all()->pluck('id');
        $invalidId = [];
        while (true) {
            $randId = random_int(1, PHP_INT_MAX);
            if (! $allCategoryIds->has($randId)) {
                $invalidId[] = $randId;
                break;
            }
        }
        $invalidId = $invalidId[0];

        $response = $this->getJson(route('bookmarks.index', [ForeignKeyCol::categories => $invalidId, 'search' => 'a search string']));

        $response->assertStatus(404);
    }

    public function test_bookmarks_index_with_search_param_and_a_valid_category_id_return_response_json_with_expected_shape()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $categoryId = Categories::all()->first()->id;

        $response = $this->getJson(route('bookmarks.index', [ForeignKeyCol::categories => $categoryId, 'search' => 'a search string']));

        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_bookmarks_store_returns_401_response_if_not_authenticated()
    {
        $this->seedTables();
        $categoryId = Categories::first()->id;

        $response = $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => $categoryId]);

        $response->assertStatus(401);
    }

    public function test_bookmarks_store_returns_422_reponse_if_environment_id_in_request_body_is_not_numeric()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => 'non-numeric']);

        $response->assertStatus(422);
        $response->assertExactJson([
            'message' => 'The environment id must be an integer.',
            'errors' => [
                ForeignKeyCol::environments => [
                    'The environment id must be an integer.',
                ],
            ],
        ]);
    }

    public function test_bookmarks_store_writes_to_database_and_returns_201_response_if_user_is_authenticated_and_environment_id_is_not_already_bookmarked_by_the_user()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $envId = Environments::first()->id;

        $response = $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => $envId]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('bookmarks', [
            ForeignKeyCol::environments => $envId,
            ForeignKeyCol::users => $user->id,
        ]);
    }

    public function test_bookmarks_store_returns_500_response_and_does_not_write_duplicate_record_to_database_if_environment_id_is_already_bookmarked_by_the_user()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $envId = Environments::first()->id;
        $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => $envId])->assertStatus(201);

        $response = $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => $envId]);

        $response->assertStatus(500);
        $this->assertDatabaseCount('bookmarks', 1);
    }

    public function test_bookmarks_destroy_returns_401_response_if_not_authenticated()
    {
        $response = $this->deleteJson(route('bookmarks.destroy'), [ForeignKeyCol::environments => '1']);

        $response->assertStatus(401);
    }

    public function test_bookmarks_destroy_returns_204_no_content_response_and_deletes_the_record_from_the_database_if_successful()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);
        $envId = Environments::first()->id;
        $this->postJson(route('bookmarks.store'), [ForeignKeyCol::environments => $envId])->assertStatus(201);
        $record = [
            ForeignKeyCol::environments => $envId,
            ForeignKeyCol::users => $user->id,
        ];
        $this->assertDatabaseHas('bookmarks', $record);

        $response = $this->deleteJson(route('bookmarks.destroy'), [ForeignKeyCol::environments => $envId]);

        $response->assertStatus(204)->assertNoContent();
        $this->assertDatabaseMissing('bookmarks', $record);
    }

    public function test_bookmarks_destroy_returns_422_reponse_if_environment_id_in_request_body_is_not_numeric()
    {
        $user = $this->seedTablesAndGetUser();
        $this->actingAs($user);

        $response = $this->postJson(route('bookmarks.destroy'), [ForeignKeyCol::environments => 'non numeric']);

        $response->assertStatus(422);
        $response->assertExactJson([
            'message' => 'The environment id must be an integer.',
            'errors' => [
                ForeignKeyCol::environments => [
                    'The environment id must be an integer.',
                ],
            ],
        ]);
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
