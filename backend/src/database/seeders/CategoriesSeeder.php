<?php

namespace Database\Seeders;

use App\Models\Categories;
use Database\Factories\CategoriesFactory;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Get available categories
     *
     * @return \Illuminate\Support\Collection
     */
    private function categories()
    {
        return collect([
            "Web Development",
            "Penetration Testing",
            "Data Science"
        ]);
    }


    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->categories()->each(
            fn ($category) => Categories::create(['name' => $category])
        );
    }
}
