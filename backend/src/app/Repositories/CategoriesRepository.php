<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Categories;
use App\Models\Environments;
use App\Repositories\Traits\HandleSearchWords;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CategoriesRepository
{
    use HandleSearchWords;

    /**
     * Retrieve the name and ID of all Categories.
     *
     * @return array
     */
    public function index()
    {
        return Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_INDEX])->rememberForever(
            CACHE_KEYS::CATEGORIES_INDEX,
            fn () => Categories::select('id', 'name')->orderBy('name')->get()->toArray()
        );
    }

    /**
     * Retrieve a CursorPaginator object of Environments filtered by Category ID and search param. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function search(Request $request)
    {
        $searchWords = $this->getKeyWords($request->search);
        $cacheId = $this->generateSearchWordsCacheId($searchWords);
        $categoryId = $request->id;

        return Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_SEARCH])->remember(
            CACHE_KEYS::CATEGORIZED_ENVIRONMENTS_SEARCH_($categoryId, $cacheId, $request->cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                'id',
                'name',
                'string_id'
                // likes ?
                // comments count ?
            )->where(ForeignKeyCol::categories, '=', $categoryId)
            ->where(function ($query) use ($searchWords) {
                foreach ($searchWords as $keyword) {
                    $query->orWhere('description', 'like', "%$keyword%");
                }
            })->withCount('comments')->orderBy('id')->cursorPaginate()
        );
    }

    /**
     * Retrieve a CursorPaginator object of Environments filtered by Category ID. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function show(Request $request)
    {
        $categoryId = $request->id;
        $cursor = $request->cursor;

        return Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_SHOW])->remember(
            CACHE_KEYS::CATEGORIES_SHOW_($categoryId, $cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                'id',
                'name',
                'string_id',
                // "description",
                // "repo_owner",
                // "repo_name",
                // "repo_branch",
            )->where(ForeignKeyCol::categories, $categoryId)->withCount('comments')->orderBy('id')->cursorPaginate()
        );
    }

    /**
     * Use cache to quickly check if a numeric route param is a valid Category ID.
     *
     * @return bool
     */
    public function checkValidCategoryId(int $id)
    {
        /** @var array */
        $categoryIds = Cache::tags([CACHE_TAGS::CATEGORIES, CACHE_TAGS::CATEGORIES_VALID_IDS])->rememberForever(
            CACHE_KEYS::CATEGORIES_VALID_IDS,
            fn () => Categories::idsMap()
        );

        return isset($categoryIds[$id]);
    }
}
