<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class MissingValidationException extends Exception
{
    public const message = [
        'errors' => [
            'message' => 'The request was not validated.',
        ],
    ];

    public function render()
    {
        return new JsonResponse(
            data: static::message,
            status: 403
        );
    }
}
