<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Get available categories.
     *
     * @return \Illuminate\Support\Collection
     */
    private static function categories()
    {
        return collect([
            'Web Development',
            'Penetration Testing',
            'Data Science',
            'Utilities',
        ]);
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seedCategories = $this->command->confirm(question: 'Seed categories?', default: true);
        if (! $seedCategories) {
            return;
        }

        CategoriesSeeder::categories()->each(
            fn ($category) => Categories::create(['name' => $category])
        );
    }

    public static function seedTest()
    {
        CategoriesSeeder::categories()->each(
            fn ($category) => Categories::create(['name' => $category])
        );
    }
}
