<?php

namespace Database\Seeders;

use App\Models\Environments;
use App\Models\Likes;
use App\Models\User;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Database\Seeder;

class LikesSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $seedLikes = $this->command->confirm(question: 'Seed likes?', default: true);
    if (!$seedLikes) {
      return;
    }

    $environments = Environments::all();
    $users = User::all();

    $users->each(function ($user) use ($environments) {
      $i = random_int(min: 0, max: $environments->count());

      for ($j = 0; $j < $i; $j++) {
        Likes::updateOrCreate([
          ForeignKeyCol::environments => $environments->random()->id,
          ForeignKeyCol::users => $user->id
        ]);
      }
    });
  }
}
