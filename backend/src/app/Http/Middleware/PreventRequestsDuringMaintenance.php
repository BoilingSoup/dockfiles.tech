<?php

namespace App\Http\Middleware;

use App\Exceptions\MaintenanceModeException;
use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];


    public function handle($request, Closure $next)
    {
        if ($this->app->maintenanceMode()->active()) {
            $data = $this->app->maintenanceMode()->data();

            if (isset($data['secret']) && $request->path() === $data['secret']) {
                return $this->bypassResponse($data['secret']);
            }

            if ($this->hasValidBypassCookie($request, $data) ||
                $this->inExceptArray($request)) {
                return $next($request);
            }

            if (isset($data['redirect'])) {
                $path = $data['redirect'] === '/'
                            ? $data['redirect']
                            : trim($data['redirect'], '/');

                if ($request->path() !== $path) {
                    return redirect($path);
                }
            }

            if (isset($data['template'])) {
                return response(
                    $data['template'],
                    $data['status'] ?? 503,
                    $this->getHeaders($data)
                );
            }

            throw new MaintenanceModeException();
        }

        return $next($request);
    }
}
