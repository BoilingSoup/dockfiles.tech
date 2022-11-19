<?php

namespace App\Exceptions;

use App\Http\Responses\FormattedApiResponse;
use Exception;

class MaintenanceModeException extends Exception
{
    public function render()
    {
        return new FormattedApiResponse(
            message: 'Service unavailable',
            success: false,
            status: 503
        );
    }
}
