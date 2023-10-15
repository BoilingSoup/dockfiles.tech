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
        if (! $seedComments) {
            return;
        }

        // $gitea = Environments::where('string_id', 'gitea')->first();
        $environments = Environments::all();
        $admin = User::admin();
        $seedCount = 200;
        $i = $seedCount;
        $paginationPerPage = 10;

        $environments->each(function ($environment) use ($admin, &$i, $paginationPerPage, $seedCount) {
            $comments = Comments::factory($seedCount)->make();
            $comments->each(function ($comment) use ($admin, &$i, $paginationPerPage, $seedCount, $environment) {
                if ($i === 1) {
                    $comment->content =
                    <<<COMMENT
                This environment was seeded with {$seedCount} dummy comments to demonstrate the infinite scroll UI.
                More comments are fetched {$paginationPerPage} at a time as you scroll near the end of the page.
                COMMENT;
                } elseif ($i === 2) {
                    $comment->content =
                    <<<'COMMENT'
                This comment was seeded with replies to demonstrate the replies UI.
                COMMENT;
                } else {
                    $comment->content =
                    <<<COMMENT
                This is comment {$i} of {$seedCount}.
                COMMENT;
                }
                $comment->user_id = $admin->id;
                $comment->environment_id = $environment->id;
                $comment->created_at = now()->subDays($i);
                $comment->save();

                $i--;
            });
            $i = $seedCount;
        });
    }

    private function dummyComments()
    {
        $seedComments = $this->command->confirm(question: 'Seed dummy comments?', default: false);
        if (! $seedComments) {
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
