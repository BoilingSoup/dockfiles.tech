<?php

namespace Database\Seeders;

use App\Models\Comments;
use App\Models\Environments;
use App\Models\User;
use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->infiniteScrollDemo();
        $this->dummyComments();
    }

    private function infiniteScrollDemo()
    {
        $seedComments = $this->command->confirm(question: 'Seed infinite scroll demo comments?', default: true);
        if (!$seedComments) {
            return;
        }

        $gitea = Environments::where("string_id", "gitea")->first();
        $admin = User::admin();
        $seedCount = 100;
        $comments = Comments::factory($seedCount)->make();
        $i = $seedCount;
        $paginationPerPage = 10;

        $comments->each(function ($comment) use ($gitea, $admin, &$i, $paginationPerPage) {
            $pageNum = ceil($i / $paginationPerPage);

            $comment->content =
            <<<COMMENT
              Infinite scroll demo:
              Comment {$i}, Page {$pageNum}
            COMMENT;
            $comment->user_id = $admin->id;
            $comment->environment_id = $gitea->id;
            $comment->created_at = now()->subMinutes($i);
            $comment->save();

            $i--;
        });
    }

    private function dummyComments()
    {
        $seedComments = $this->command->confirm(question: 'Seed dummy comments?', default: true);
        if (!$seedComments) {
            return;
        }

        $environments = Environments::all();
        $users = User::all();
        $comments = Comments::factory(150)->make();

        $comments->each(function ($comment) use ($users, $environments) {
            $randUser = $users->random();
            $randEnv = $environments->random();

            $comment->user_id = $randUser->id;
            $comment->environment_id = $randEnv->id;
            $comment->save();
        });
    }
}
