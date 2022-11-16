<?php

namespace App\Http\Middleware;

use App\Exceptions\InvalidSignatureException;
use Closure;
use Illuminate\Routing\Middleware\ValidateSignature as Middleware;

class ValidateSignature extends Middleware
{
    /**
     * The names of the query string parameters that should be ignored.
     *
     * @var array<int, string>
     */
    protected $except = [
        // 'fbclid',
        // 'utm_campaign',
        // 'utm_content',
        // 'utm_medium',
        // 'utm_source',
        // 'utm_term',
    ];

    public function handle($request, Closure $next, $relative = null)
    {
        $ignore = property_exists($this, 'except') ? $this->except : $this->ignore;

        if ($request->hasValidSignatureWhileIgnoring($ignore, $relative !== 'relative')) {
            return $next($request);
        }

        throw new InvalidSignatureException();
    }
}
