<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\CalendarShiftsController;
use App\Http\Controllers\EmployeeCalendarController;
use App\Http\Controllers\EmployeeHolidayPeriodController;
use App\Http\Controllers\EmployeeHolidayController;
use App\Http\Controllers\IncidenceController;
use App\Http\Controllers\IncidencesGroupController;
use App\Http\Controllers\IncidencesGroupIncidenceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\SupervisionGroupController;
use App\Http\Controllers\SupervisionGroupSupervisorController;
use App\Http\Controllers\HolidayPeriodController;

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
    //Auth
    Route::get('user', [AuthController::class, 'user']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::apiResource('users', UserController::class);

    //Employees
    Route::apiResource('employees', EmployeeController::class);
    Route::get('employees/{employee}/shift', [EmployeeController::class, 'shift']);
    Route::get('employees/{employee}/calendar', [EmployeeController::class, 'calendar']);
    Route::get('employees/{employee}/incidences', [EmployeeController::class, 'incidences']);
    Route::get('employees/{employee}/supervisor', [EmployeeController::class, 'supervisor']);

    Route::apiResource('employees/{employee}/calendars', EmployeeCalendarController::class);

    Route::apiResource('employees/{employee}/bookings', BookingController::class);
    Route::apiResource('employees/{employee}/absences', AbsenceController::class);

    Route::get('employees/{employee}/requests/supervised', [RequestController::class, 'supervised']);
    Route::apiResource('employees/{employee}/requests', RequestController::class)->parameters([
        'requests' => 'req'
    ]);

    Route::apiResource('employees/{employee}/holiday_periods', EmployeeHolidayPeriodController::class);
    Route::apiResource('employees/{employee}/holiday_periods/{holiday_period}/holidays', EmployeeHolidayController::class);


    //Shifts
    Route::apiResource('shifts', ShiftController::class);

    //Calendars
    Route::apiResource('calendars', CalendarController::class);
    Route::apiResource('calendars/{calendar}/shifts', CalendarShiftsController::class);

    //Incidences
    Route::apiResource('incidences', IncidenceController::class);

    //Incidences Groups
    Route::apiResource('incidences_groups', IncidencesGroupController::class);
    Route::apiResource('incidences_groups/{incidences_group}/incidences', IncidencesGroupIncidenceController::class);

    //Departments
    Route::apiResource('departments', DepartmentController::class);
    //Areas
    Route::apiResource('areas', AreaController::class);
    //Sections
    Route::apiResource('sections', SectionController::class);
    //Supervision Groups
    Route::apiResource('supervision_groups', SupervisionGroupController::class);
    Route::apiResource('supervision_groups/{supervision_group}/supervisors', SupervisionGroupSupervisorController::class);
    //Holiday Periods
    Route::apiResource('holiday_periods', HolidayPeriodController::class);
});


Route::fallback(function () {
    return response()->json([
        'message' => 'Page Not Found',
        'code' => 'ACTION_ERR_PageNotFound',
    ], 404);
});
