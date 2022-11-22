<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class InvalidCredentialsException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'These credentials do not match our records.',
            success: false,
            status: 403
        );
    }
}
