<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ShiftResource;
use App\Http\Resources\IncidenceResource;
use App\Models\Calendar;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index(AuthorizeAdminRequest $request)
    {
        $employees = Employee::paginate(25);
        return EmployeeResource::collection($employees);
    }

    public function store(EmployeeStoreRequest $request)
    {
        $employee = new Employee($request->validated());

        $employee->save();
        if ($request->username) {
            $user = new User([
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'employee_id' => $employee->id,
                'is_admin' => $request->is_admin ?: false,
                'is_blocked' => $request->is_blocked ?: false
            ]);
            $employee->user()->save($user);
        }

        return new EmployeeResource($employee);
    }

    public function show(EmployeeSelfRequest $request, Employee $employee)
    {
        return new EmployeeResource($employee);
    }

    public function update(EmployeeUpdateRequest $request, Employee $employee)
    {
        $employee->update($request->validated());
        $employee->save();

        if ($request->username) //arriben dades d'usuari. modifcar-lo. o crear-lo, si no existeix.
        {
            $user = User::firstOrNew([
                'employee_id' => $employee->id
            ]);
            $user->username = $request->username;
            //$user->password = Hash::make($request->password);
            $user->password = $request->password == null ? $user->password : Hash::make($request->password);
            $user->is_admin = $request->is_admin ?: false;
            $user->is_blocked = $request->is_blocked ?: false;
            $user->save();
        } else { //no arriben dades d'usuari. eliminar-lo, si existeix.
            $user = User::firstWhere('employee_id', $employee->id);
            if ($user)
                $user->delete();
        }
        return new EmployeeResource($employee);
    }

    public function destroy(AuthorizeAdminRequest $request, Employee $employee)
    {
        $user = User::firstWhere(
            'employee_id',
            $employee->id
        );
        if ($user)
            $user->delete();
        $employee->delete();
        return ["message" => "deleted"];
    }

    public function search(AuthorizeAdminRequest $request)
    {
        //WIP
        return ["a" => "OK"];
    }

    public function shift(EmployeeSelfRequest $request, Employee $employee)
    {
        $employeeshift = $employee->shift;
        $calendar = null;
        $year = date("Y");
        $dayofyear = date("z");
        $employeecalendars = $employee->calendars;
        foreach ($employeecalendars as $employeecalendar) {
            if ($employeecalendar->year == $year) {
                $calendar = $employeecalendar->calendar;
                break;
            }
        }
        if ($calendar != null) {
            foreach ($calendar->shifts as $shift) {
                if ($shift->day == $dayofyear) {
                    $employeeshift = $shift->shift;
                }
            }
        }
        return new ShiftResource($employeeshift);
    }

    public function incidences(EmployeeSelfRequest $request, Employee $employee)
    {
        $result = [];
        $employeeincidencesgroupincidences = $employee->incidences_group->incidences;

        foreach ($employeeincidencesgroupincidences as $employeeincidencesgroupincidence) {
            array_push($result, $employeeincidencesgroupincidence->incidence);
        }

        return $result;
    }
}
