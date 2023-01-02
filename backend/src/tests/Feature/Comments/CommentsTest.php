<?php

namespace Tests\Feature\Environments;

use App\Models\Comments;
use App\Models\Environments;
use App\Models\User;
use Database\Seeders\CategoriesSeeder;
use Database\Seeders\EnvironmentsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_comments_index_response_is_correct_format_with_pagination()
    {
        $this->seedTables();
        $environments = Environments::all();

        $environments->each(function ($env) {
            $response = $this->get(route('comments.index', $env->string_id));
            $response->assertStatus(200);
            $response->assertJsonStructure(
                [
                  "success",
                  "data" => [
                    "*" => [
                      "id",
                      "content",
                      "environment_id",
                      "created_at",
                      "replies_count",
                      "author" => [
                        "id",
                        "name",
                        "avatar",
                        "is_admin"
                      ]
                    ],
                  ],
                  "links" => [
                    "first",
                    "last",
                    "prev",
                    "next"
                  ],
                  "meta" => [
                    "path",
                    "per_page",
                    "next_cursor",
                    "prev_cursor"
                  ],
                ]
            );
        });
    }

    public function test_comments_count_response_is_correct_format()
    {
        $this->seedTables();
        $environments = Environments::all();

        $environments->each(function ($env) {
            $response = $this->get(route('comments.count', $env->string_id));
            $response->assertStatus(200);
            $response->assertJsonStructure(
                [
                  "success",
                  "data" => [
                    "comments_count"
                  ]
                ]
            );
        });
    }

    private function seedTables()
    {
        $admin = User::factory()->admin()->create();
        CategoriesSeeder::seedTest();
        EnvironmentsSeeder::seedTest();
        $environmentId = Environments::where("string_id", "gitea")->first()->id;

        Comments::factory()->create([
          "environment_id" =>$environmentId,
          "user_id" => $admin->id
        ]);
    }
}
