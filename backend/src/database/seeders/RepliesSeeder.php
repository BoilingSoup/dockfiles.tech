<?php

namespace Database\Seeders;

use App\Models\Comments;
use App\Models\Environments;
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
        $seedComments = $this->command->confirm(question: 'Seed demo replies?', default: true);
        if (!$seedComments) {
            return;
        }

        $envId = Environments::where("string_id", "gitea")->first()->id;
        $commentsCount = Comments::where(ForeignKeyCol::environments, $envId)->count();

        if ($commentsCount !== 1000) {
            $this->command->error(
                <<<ERROR
                Expected gitea environment to have 1000 comments, but {$commentsCount} comments were found.
                Re-run the seeder, seed the infinite scroll demo comments, and do not seed the additional dummy comments.
                ERROR
            );
        }

        $secondDemoComment = Comments::find(999);
        $admin = User::admin();

        $reply = Replies::make();
        $reply->content = "This is a reply to the comment above.";
        $reply->author_id = $admin->id;
        $reply->recipient_id = $admin->id;
        $reply->comment_id = $secondDemoComment->id;
        $reply->save();
    }
}
