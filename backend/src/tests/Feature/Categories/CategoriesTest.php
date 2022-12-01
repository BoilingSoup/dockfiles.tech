<?php

namespace Tests\Feature\Categories;

use Database\Seeders\CategoriesSeeder;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    public function test_categories_index_response()
    {
        $this->seed(CategoriesSeeder::class);

        $response = $this->get(route("categories.index"));

        $response->assertExactJson([
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
        ]);
    }
}
