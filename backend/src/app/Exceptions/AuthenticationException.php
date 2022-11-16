<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Illuminate\Auth\AuthenticationException as BaseAuthenticationException;

class AuthenticationException extends BaseAuthenticationException
{
    public function render()
    {
        return new FormattedApiResponse(
            message: "Unauthenticated",
            success: false,
            status: 401
        );
    }
}
