<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserWithEmailAlreadyExistsException extends Exception
{
    protected $code = 403;

    public const message = [
        'message' => 'A user with that email already exists'
    ];

    public function render()
    {
        return new JsonResponse(static::message);
    }
}
