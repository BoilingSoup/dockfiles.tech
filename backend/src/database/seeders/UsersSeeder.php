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
        User::factory()->admin()->create();
        $this->command->info("Admin user seeded");

        $seedUsers = $this->command->confirm(question: 'Seed dummy users?', default: true);
        if ($seedUsers) {
            User::factory(50)->create();
        }
    }
}
