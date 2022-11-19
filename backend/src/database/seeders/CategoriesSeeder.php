<?php

namespace Database\Seeders;

use App\Models\Categories;
use Database\Factories\CategoriesFactory;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CategoriesFactory::categories()->each(
            fn ($category) => Categories::create(['name' => $category])
        );
    }
}
