<?php

namespace App\Repositories;

use App\Helpers\Cache\CACHE_KEYS;
use App\Helpers\Cache\CACHE_TAGS;
use App\Models\Replies;
use Database\Helpers\ForeignKeyCol;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class RepliesRepository
{
  public function index(Request $request)
  {
    $commentId = $request->id;
    $cursor = $request->cursor;

    return Cache::tags([CACHE_TAGS::REPLIES, CACHE_TAGS::REPLIES_INDEX])->rememberForever(
      CACHE_KEYS::COMMENT_REPLIES_($commentId, $cursor),
      function () use ($commentId) {
        return Replies::where(ForeignKeyCol::comments, $commentId)
          ->orderBy("created_at")
          ->cursorPaginate(perPage: 5);
      }
    );
  }
}
