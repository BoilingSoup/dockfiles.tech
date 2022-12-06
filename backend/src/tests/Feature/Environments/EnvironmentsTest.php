<?php

namespace Tests\Feature\Environments;

use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoriesTest extends TestCase
{
    use RefreshDatabase;

    public function test_environments_index_response_is_correct_format_with_pagination()
    {
        $this->seedTables();

        $response = $this->get(route('environments.index'));

        $response->assertStatus(200);
        $response->assertJsonStructure([
          "success",
          "data" => [
            "data" => [
              "*" => [
                  "id",
                  "name",
                  "string_id"
                ],
              ],
            "path",
            "per_page",
            "next_cursor",
            "next_page_url",
            "prev_cursor",
            "prev_page_url"
          ]
        ]);
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

    /**
     * @expectedException App\Exceptions\InvalidEnvironmentIdException
     *
     * @return void
     */
    public function test_environments_show_throws_custom_exception_if_stringid_is_invalid()
    {
        $this->seedTables();
        $invalidId = "INVALID ID";

        $response =$this->get(route("environments.show", $invalidId));

        $response->assertStatus(404);
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
