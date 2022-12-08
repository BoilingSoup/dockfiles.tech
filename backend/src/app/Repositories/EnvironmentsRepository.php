<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class EnvironmentsRepository
{
    /**
     * Retrieve a CursorPaginator object of all Environments. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(string | null $cursor)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_INDEX])->remember(
            CACHE_KEYS::ENVIRONMENTS_INDEX_CURSOR_($cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "string_id"
                // likes ?
                // comments count ?
            )->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Retrieve a CursorPaginator object of Environments filtered by search param. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function search(string $param)
    {
        $searchTerms = array_filter(explode(" ", $param), fn ($el) => $el !== "");
        $searchTerms = array_map(fn ($el) => strtolower($el), $searchTerms);
        sort($searchTerms);
        $cacheId = implode("", $searchTerms);

        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SEARCH])->remember(
            CACHE_KEYS::ENVIRONMENTS_SEARCH_($cacheId),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "string_id"
                // likes ?
                // comments count ?
            )->where("description", "LIKE", "%{$param}%")->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Retrieve Environment data by string_id.
     *
     * @return Environments
     */
    public function show(string $string_id)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SHOW])->remember(
            CACHE_KEYS::ENVIRONMENTS_SHOW_($string_id),
            60 * 60 * 24,
            fn () => Environments::where('string_id', '=', $string_id)->select(
                "id",
                "name",
                "repo_owner",
                "repo_name",
                "repo_branch"
            )->get()->first()
        );
    }
}
