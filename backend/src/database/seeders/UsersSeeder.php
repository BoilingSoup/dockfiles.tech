<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seedAdmin = $this->command->confirm(question: 'Seed admin user?', default: true);
        if ($seedAdmin) {
            User::factory()->admin()->create();
            $this->command->info('Admin user seeded');
        }

        $seedOauth = $this->command->confirm(question: "Seed OAuth mock users?", default: false);
        if ($seedOauth) {
            User::factory()->github()->create();
            $this->command->info('GitHub user seeded');

            User::factory()->gitlab()->create();
            $this->command->info('GitLab user seeded');
        }

        $seedUsers = $this->command->confirm(question: 'Seed dummy users?', default: false);
        if ($seedUsers) {
            User::factory(50)->create();
        }
    }
}
