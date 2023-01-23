<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    $this->askToRefreshDB();

    $this->call([
      UsersSeeder::class,
      CategoriesSeeder::class,
      EnvironmentsSeeder::class,
      BookmarksSeeder::class,
      CommentsSeeder::class,
      RepliesSeeder::class,
      LikesSeeder::class,
    ]);

    Cache::flush();
  }

  private function askToRefreshDB()
  {
    $refresh = $this->command->confirm(question: 'Refresh database?', default: true);

    if ($refresh) {
      $this->command->call('migrate:refresh');
      $this->command->info('Database was refreshed');
    }
  }
}
