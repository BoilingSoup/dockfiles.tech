<?php

namespace App\Http\Requests\Traits;

trait CommentsRepliesRules
{
    protected function commentsAndRepliesRules(): array
    {
        return [
            'content' => ['required', 'max:200', 'min:4'],
        ];
    }
}
