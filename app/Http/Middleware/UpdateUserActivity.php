<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class UpdateUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $user = Auth::user();
            
            // Only update if last_seen_at is null or older than 1 minute
            // This reduces database writes while maintaining accurate online status
            if (
                is_null($user->last_seen_at) || 
                $user->last_seen_at->diffInMinutes(now()) >= 1
            ) {
                $user->last_seen_at = now();
                $user->saveQuietly(); // Use saveQuietly to skip model events if any
            }
        }

        return $next($request);
    }
}
