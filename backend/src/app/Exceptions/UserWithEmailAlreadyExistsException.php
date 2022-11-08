<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserWithEmailAlreadyExistsException extends Exception
{
    public const message = [
        'errors' => [
            'message' => 'A user with that email already exists',
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
