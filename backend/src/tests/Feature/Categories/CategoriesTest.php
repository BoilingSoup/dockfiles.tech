<?php

namespace Tests\Feature\Categories;

use App\Models\Categories;
use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Traits\PaginatedEnvironmentsJsonStructure;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;
    use PaginatedEnvironmentsJsonStructure;

    public function test_categories_index_response()
    {
        CategoriesSeeder::seedTest();

        $response = $this->get(route('categories.index'));

        $response->assertExactJson([
            'success' => true,
            'data' => [
                [
                    'name' => 'Data Science',
                    'id' => 3,
                ],
                [
                    'name' => 'Penetration Testing',
                    'id' => 2,
                ],
                [
                    'name' => 'Utilities',
                    'id' => 4,
                ],
                [
                    'name' => 'Web Development',
                    'id' => 1,
                ],
            ],
        ]);
    }

    public function test_categories_show_returns_404_with_invalid_category_id()
    {
        $this->seedTables();

        $response = $this->get(route('categories.show', ['id' => 1000]));

        $response->assertStatus(404);
    }

    public function test_categories_show_returns_404_with_non_numeric_route_param()
    {
        $this->seedTables();

        $response = $this->get(route('categories.show', ['id' => 'invalid_param']));

        $response->assertStatus(404);
    }

    public function test_categories_show_returns_200_with_valid_ids()
    {
        $this->seedTables();
        $ids = Categories::idsCollection();

        $ids->each(function ($id) {
            $response = $this->get(route('categories.show', ['id' => $id]));
            $response->assertStatus(200);
            $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
        });
    }

    public function test_categories_search_returns_200_with_valid_ids_and_any_search_param()
    {
        $this->seedTables();
        $id = Categories::idsCollection()->first();

        $response = $this->get(route('categories.show', ['id' => $id, 'search' => '1234567890QWERTYUIOP']));
        $response->assertStatus(200);
        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    private function seedTables()
    {
        User::factory()->admin()->create();
        CategoriesSeeder::seedTest();
        EnvironmentsSeeder::seedTest();
    }
}
