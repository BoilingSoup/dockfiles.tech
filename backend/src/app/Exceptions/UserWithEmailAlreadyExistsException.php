<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class UserWithEmailAlreadyExistsException extends Exception
{
    protected $code = 403;


    public function render()
    {
        return new JsonResponse([
            'message' => 'A user with that email already exists'
        ]);
    }
}
