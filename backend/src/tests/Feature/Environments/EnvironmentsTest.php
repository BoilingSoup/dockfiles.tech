<?php

namespace Tests\Feature\Environments;

use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Feature\Traits\PaginatedEnvironmentsJsonStructure;
use Tests\TestCase;

class EnvironmentsTest extends TestCase
{
    use RefreshDatabase;
    use PaginatedEnvironmentsJsonStructure;

    public function test_environments_index_response_is_correct_format_with_pagination()
    {
        $this->seedTables();

        $response = $this->get(route('environments.index'));

        $response->assertStatus(200);
        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_environments_show_response_has_expected_fields()
    {
        $this->seedTables();
        $environments = $this->get(route('environments.index'));
        $environments = collect($environments['data']['data']);

        $environments->each(function ($environment) {
            $response = $this->get(route('environments.show', $environment["string_id"]));
            $response->assertStatus(200);
            $response->assertJsonStructure([
              "success",
              "data" => [
                "id",
                "name",
                "repo_owner",
                "repo_name",
                "repo_branch"
              ]
            ]);
        });
    }

    public function test_environments_show_response_404_if_stringid_is_invalid()
    {
        $this->seedTables();
        $invalidId = "INVALID ID";

        $response =$this->get(route("environments.show", $invalidId));

        $response->assertStatus(404);
    }

    public function test_environments_search_success_returns_paginated_collection()
    {
        $this->seedTables();

        $response = $this->get(route('environments.index', ["search" => "angular"]));

        $response->assertStatus(200);
        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
    }

    public function test_environments_search_with_no_results_returns_200_status_code()
    {
        $this->seedTables();

        $response = $this->get(route('environments.index', ["search" => "1234567890QWERTYUIOP"]));

        $response->assertStatus(200);
        $response->assertJsonStructure($this->paginatedEnvironmentsJsonStructure());
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
