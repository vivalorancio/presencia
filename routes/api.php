<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CalendarShiftsController;
use App\Http\Controllers\EmployeeCalendarController;
use App\Http\Controllers\IncidenceController;
use App\Http\Controllers\IncidencesGroupController;
use App\Http\Controllers\IncidencesGroupIncidenceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class);

    Route::apiResource('employees', EmployeeController::class);
    Route::post('employees/search', [EmployeeController::class, 'search']);
    Route::get('employees/{employee}/shift', [EmployeeController::class, 'shift']);
    Route::get('employees/{employee}/calendar', [EmployeeController::class, 'calendar']);
    Route::get('employees/{employee}/incidences', [EmployeeController::class, 'incidences']);

    Route::apiResource('employees/{employee}/bookings', BookingController::class);

    Route::apiResource('shifts', ShiftController::class);

    Route::apiResource('calendars', CalendarController::class);
    Route::apiResource('calendars/{calendar}/shifts', CalendarShiftsController::class);

    Route::apiResource('employees/{employee}/calendars', EmployeeCalendarController::class);

    Route::apiResource('incidences', IncidenceController::class);
    Route::apiResource('incidences_groups', IncidencesGroupController::class);
    Route::apiResource('incidences_groups/{incidences_group}/incidences', IncidencesGroupIncidenceController::class);
});


Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found',
        'code' => 'ACTION_ERR_PageNotFound',
    ], 404);
});
