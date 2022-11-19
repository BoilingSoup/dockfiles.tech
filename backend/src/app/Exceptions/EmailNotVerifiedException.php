<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class EmailNotVerifiedException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'Your email address is not verified.',
            success: false,
            status: 409
        );
    }
}
