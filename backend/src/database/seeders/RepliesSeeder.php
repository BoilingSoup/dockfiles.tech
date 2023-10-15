<?php

namespace Database\Seeders;

use App\Models\Comments;
use App\Models\Replies;
use App\Models\User;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Seeder;

class RepliesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->demoReplies();
    }

    private function demoReplies()
    {
        // $seedComments = $this->command->confirm(question: 'Seed demo replies?', default: true);
        // if (! $seedComments) {
        //     return;
        // }

        // $envId = Environments::where('string_id', 'gitea')->first()->id;
        // $commentsCount = Comments::where(ForeignKeyCol::environments, $envId)->count();

        // if ($commentsCount !== 200) {
        //     $this->command->error(
        //         <<<ERROR
        //         Expected gitea environment to have 1000 comments, but {$commentsCount} comments were found.
        //         Re-run the seeder, seed the infinite scroll demo comments, and do not seed the additional dummy comments.
        //         ERROR
        //     );
        // }

        // $secondDemoComment = Comments::find(999);
        // $admin = User::admin();

        // Replies::create([
        //     'content' => 'This is a reply to the comment above.',
        //     'is_meta' => false,
        //     ForeignKeyCol::reply_author => $admin->id,
        //     ForeignKeyCol::reply_recipient => $admin->id,
        //     ForeignKeyCol::comments => $secondDemoComment->id,
        // ]);

        $admin = User::admin();
        $commentsCount = Comments::all()->count();
        $repliesSeedCount = 800;

        for ($i = 0; $i < $repliesSeedCount; $i++) {
            Replies::create([
                'content' => 'Randomly seeded reply to demonstrate the reply UI',
                'is_meta' => false,
                ForeignKeyCol::reply_author => $admin->id,
                ForeignKeyCol::reply_recipient => $admin->id,
                ForeignKeyCol::comments => random_int(min: 1, max: $commentsCount),
            ]);
        }
    }
}
