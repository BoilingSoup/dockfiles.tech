<?php

namespace App\Helpers\Cache;

class CACHE_KEYS
{
    public const CATEGORIES_INDEX = 'CATEGORIES_INDEX';

    public static function CATEGORIES_SHOW_(int $id, string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "CATEGORIES_SHOW_{$id}_{$cursor}";
    }

    public const CATEGORIES_VALID_IDS = 'CATEGORIES_VALID_IDS';

    public static function CATEGORIZED_ENVIRONMENTS_SEARCH_(string $categoryId, string $cacheId, string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "CATEGORIZED_ENVIRONMENTS_SEARCH_{$categoryId}_{$cacheId}_{$cursor}";
    }

    public static function ENVIRONMENTS_INDEX_CURSOR_(string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "ENVIRONMENTS_INDEX_CURSOR_{$cursor}";
    }

    public static function ENVIRONMENTS_SHOW_(string $stringId)
    {
        return "ENVIRONMENTS_SHOW_{$stringId}";
    }

    public static function ENVIRONMENTS_SEARCH_(string $cacheId, string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "ENVIRONMENTS_SEARCH_{$cacheId}_{$cursor}";
    }

    public static function ENVIRONMENTS_COMMENTS_(string $stringId, string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "ENVIRONMENTS_COMMENTS_{$stringId}_{$cursor}";
    }

    public static function ENVIRONMENTS_COMMENTS_COUNT_(string $stringId)
    {
        return "ENVIRONMENTS_COMMENTS_COUNT_{$stringId}";
    }

    public static function USER_BOOKMARKS_INDEX_CURSOR_(string $userId, string|null $cursor)
    {
        $cursor = $cursor ?? 'NULL';

        return "USER_{$userId}_BOOKMARKS_INDEX_CURSOR_{$cursor}";
    }
}
