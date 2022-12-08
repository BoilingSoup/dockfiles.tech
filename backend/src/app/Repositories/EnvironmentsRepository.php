<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Environments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class EnvironmentsRepository
{
    /**
     * Retrieve a CursorPaginator object of all Environments. (Cached for 1 day.)
     *
     * @return \Illuminate\Contracts\Pagination\CursorPaginator
     */
    public function index(Request $request)
    {
        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_INDEX])->remember(
            CACHE_KEYS::ENVIRONMENTS_INDEX_CURSOR_($request->cursor),
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
    public function search(Request $request)
    {
        $searchParam = $request->search;
        $cacheId = $this->generateCacheId($searchParam);

        return Cache::tags([CACHE_TAGS::ENVIRONMENTS, CACHE_TAGS::ENVIRONMENTS_SEARCH])->remember(
            CACHE_KEYS::ENVIRONMENTS_SEARCH_($cacheId, $request->cursor),
            60 * 60 * 24, // Cache for 1 day
            fn () => Environments::select(
                "id",
                "name",
                "string_id"
                // likes ?
                // comments count ?
            )->where("description", "LIKE", "%{$searchParam}%")->orderBy("id")->cursorPaginate()
        );
    }

    /**
     * Convert the search param into a consistent cache-ID string. A search of the same terms [ "redIs", "fLAsk" ], ["REDiS", "flasK"], ["FLAsK", "reDIS"] returns the same ID "flaskredis" regardless of beginning/ending whitepspace, order, or capitalization.
     *
     */
    private function generateCacheId(string $param)
    {
        // Normalize search params by removing whitespace and creating an array of lowercase words
        $searchTerms = array_filter(explode(" ", $param), fn ($el) => $el !== "");
        $searchTerms = array_map(fn ($el) => strtolower($el), $searchTerms);

        // Sort the search terms array alphabetically
        sort($searchTerms);

        // Join the normalized array into a string
        return implode("", $searchTerms);
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
