<?php

namespace App\Helpers\Cache;

class CACHE_KEYS
{
    public const CATEGORIES_INDEX = "CATEGORIES_INDEX";

    public static function CATEGORIES_SHOW_(int $id)
    {
        return "CATEGORIES_SHOW_{$id}";
    }

    public const CATEGORIES_VALID_IDS = "CATEGORIES_VALID_IDS";

    public static function ENVIRONMENTS_INDEX_CURSOR_(string $cursor)
    {
        return "ENVIRONMENTS_INDEX_CURSOR_{$cursor}";
    }
}
