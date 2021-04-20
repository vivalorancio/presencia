<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ($exception instanceof ModelNotFoundException) {
            return response()->json([
                'message' => 'Entry for ' . str_replace('App\\Models\\', '', $exception->getModel()) . ' not found',
                'code' => 'MODEL_ERR_' . str_replace('App\\Models\\', '', $exception->getModel()) . 'NotFound'
            ], 404);
        }

        if ($exception instanceof AuthorizationException) {
            return response()->json([
                'message' => 'This action is unauthorized',
                'code' => 'ACTION_ERR_Unauthorized'
            ], 403);
        }

        if ($exception instanceof AuthenticationException) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => 'ACTION_ERR_Unauthenticated'
            ], 401);
        }

        return parent::render($request, $exception);
    }
}
