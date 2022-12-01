<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Categories;
use Illuminate\Support\Facades\Cache;

class CategoriesRepository
{
    public function index()
    {
        return Cache::tags([CACHE_TAGS::CATEGORIES])->rememberForever(
            CACHE_KEYS::CATEGORIES,
            fn () => Categories::select("name", "id")->orderBy("name")->get()
        );
    }
}
