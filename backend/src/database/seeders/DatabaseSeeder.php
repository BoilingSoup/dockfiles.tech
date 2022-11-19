<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
            CategoriesSeeder::class,
            EnvironmentsSeeder::class,
        ]);
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
