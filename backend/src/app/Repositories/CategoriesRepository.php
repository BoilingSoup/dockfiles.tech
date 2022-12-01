<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Categories;
use App\Models\Environments;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Support\Facades\Cache;

class CategoriesRepository
{
    /**
     * Retrieve the name and id of all categories.
     *
     * @return bool
     */
    public function index()
    {
        return Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_INDEX])->rememberForever(
            CACHE_KEYS::CATEGORIES_INDEX,
            fn () => Categories::select("id", "name")->orderBy("name")->get()
        );
    }

    /**
     * Retrieve environment data by category id. (Cached for 1 day.)
     *
     * @return bool
     */
    public function show(int $id)
    {
        return Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_SHOW])->remember(
            CACHE_KEYS::CATEGORIES_SHOW_($id),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "description",
                "repo_owner",
                "repo_name",
                "repo_branch",
            )->where(ForeignKeyCol::categories, $id)->get()
        );
    }

    /**
     * Use cache to quickly check if a numeric route param is a valid category id.
     *
     * @return bool
     */
    public function checkValidCategoryId(int $id)
    {
        /**@var \Illuminate\Support\Collection*/
        $categories = Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_VALID_IDS])->rememberForever(
            CACHE_KEYS::CATEGORIES_VALID_IDS,
            fn () => Categories::select("id")->get()
        );

        $isValid = false;

        $categories->each(function ($category) use (&$isValid, $id) {
            if ($category->id === $id) {
                $isValid = true;
            }
        });

        return $isValid;
    }
}
