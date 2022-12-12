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
        $seedComments = $this->command->confirm(question: 'Seed Comments?', default: true);
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
