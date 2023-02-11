<?php

namespace App\Helpers\Cache;

class CACHE_TAGS
{
  public const CATEGORIES = 'CATEGORIES';

  public const CATEGORIES_INDEX = 'CATEGORIES_INDEX';

  public const CATEGORIES_SHOW = 'CATEGORIES_SHOW';

  public const CATEGORIES_SEARCH = 'CATEGORIES_SEARCH';

  public const CATEGORIES_VALID_IDS = 'CATEGORIES_VALID_IDS';

  public const ENVIRONMENTS = 'ENVIRONMENTS';

  public const ENVIRONMENTS_INDEX = 'ENVIRONMENTS_INDEX';

  public const ENVIRONMENTS_SHOW = 'ENVIRONMENTS_SHOW';

  public const ENVIRONMENTS_SEARCH = 'ENVIRONMENTS_SEARCH';

  public const ENVIRONMENTS_IDS = 'ENVIRONMENTS_IDS';

  public const COMMENTS = 'COMMENTS';

  public const COMMENTS_INDEX = 'COMMENTS_INDEX';

  public const COMMENTS_COUNT = 'COMMENTS_COUNT';

  public static function USER_BOOKMARKS_(string $userId)
  {
    return "USER_BOOKMARKS_{$userId}";
  }

  public const USER_BOOKMARKS_INDEX = 'USER_BOOKMARKS_INDEX';

  public static function USER_BOOKMARKS_INDEX_CATEGORY_(string $categoryId)
  {
    return "USER_BOOKMARKS_INDEX_CATEGORY_{$categoryId}";
  }

  public const USER_BOOKMARKS_SEARCH = 'USER_BOOKMARKS_SEARCH';

  public static function USER_BOOKMARKS_SEARCH_CATEGORY_(string $categoryId)
  {
    return "USER_BOOKMARKS_SEARCH_CATEGORY_{$categoryId}";
  }

  public const USER_ALL_BOOKMARKS_IDS = 'USER_ALL_BOOKMARKS_IDS';

  public static function REPLIES_(string $commentId)
  {
    return "REPLIES_{$commentId}";
  }
}
