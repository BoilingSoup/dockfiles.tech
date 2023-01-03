<?php

namespace Database\Seeders;

use App\Models\Bookmarks;
use App\Models\Environments;
use App\Models\User;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Seeder;

class BookmarksSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seedBookmarks = $this->command->confirm(question: "Seed admin bookmarks?", default: true);
        if (!$seedBookmarks) {
            return;
        }

        $environments = Environments::all();
        $admin = User::admin();

        $environments->each(function ($env) use ($admin) {
            Bookmarks::create([
              ForeignKeyCol::environments => $env->id,
              ForeignKeyCol::users => $admin->id
            ]);
        });
    }
}
