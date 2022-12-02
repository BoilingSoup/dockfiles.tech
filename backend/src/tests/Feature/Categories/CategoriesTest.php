<?php

namespace Tests\Feature\Categories;

use App\Models\Categories;
use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_categories_index_response()
    {
        $this->seed(CategoriesSeeder::class);

        $response = $this->get(route("categories.index"));

        $response->assertExactJson([
          "success" => true,
          "data" => [
              [
                "name" => "Data Science",
                "id" => 3
              ],
              [
                "name" => "Penetration Testing",
                "id" => 2
              ],
              [
                "name" => "Utilities",
                "id" => 4
              ],
              [
                "name" => "Web Development",
                "id" => 1
              ]
          ]
        ]);
    }

    public function test_categories_show_returns_404_with_invalid_category_id()
    {
        $this->seedTables();

        $response = $this->get(route("categories.show", ["id" => 1000]));

        $response->assertStatus(404);
    }

    public function test_categories_show_returns_404_with_non_numeric_route_param()
    {
        $this->seedTables();

        $response = $this->get(route("categories.show", ["id" => "invalid_param"]));

        $response->assertStatus(404);
    }

    public function test_categories_show_returns_200_with_valid_ids()
    {
        $this->seedTables();
        $ids = Categories::idsCollection();

        $ids->each(function ($id) {
            $response = $this->get(route("categories.show", ["id" => $id]));
            $response->assertStatus(200);
        });
    }

    private function seedTables()
    {
        User::factory()->admin()->create();
        $this->seed([
          CategoriesSeeder::class,
          EnvironmentsSeeder::class
        ]);
    }
}
