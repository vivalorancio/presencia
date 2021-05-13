<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthorizeAdminRequest;
use App\Http\Requests\EmployeeSelfRequest;
use App\Http\Requests\EmployeeStoreRequest;
use App\Http\Requests\EmployeeUpdateRequest;
use App\Http\Resources\EmployeeResource;
use App\Http\Resources\ShiftResource;
use App\Http\Resources\CalendarResource;
use App\Http\Resources\IncidenceResource;
use App\Models\Calendar;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{

    private $orderBy = 'last_name';
    private $orderDirection = 'asc';
    private $perPage = '25';


    public function index(AuthorizeAdminRequest $request)
    {
        $request_perPage = request('per_page', $this->perPage);

        $request_orderBy = request('sort_field', $this->orderBy);
        if (!in_array($request_orderBy, ['last_name', 'code', 'national_id', 'email', 'start_date', 'department', 'area', 'section'])) {
            $request_orderBy = $this->orderBy;
        }

        $request_orderDirection = request('sort_direction', $this->orderDirection);
        if (!in_array($request_orderDirection, ['asc', 'desc'])) {
            $request_orderDirection = $this->orderDirection;
        }

        $request_order = '';
        $orderbydepartments = false;
        $orderbyareas = false;
        $orderbysections = false;
        switch ($request_orderBy) {
            case 'last_name':
                $request_order = 'last_name ' . $request_orderDirection . ', first_name ' . $request_orderDirection;
                break;
            case 'start_date':
                $request_order = 'start_date ' . $request_orderDirection . ', end_date ' . $request_orderDirection;
                break;
            case 'department':
                $orderbydepartments = true;
                $request_order = 'departments.description ' . $request_orderDirection;
                break;
            case 'area':
                $orderbyareas = true;
                $request_order = 'areas.description ' . $request_orderDirection;
                break;
            case 'section':
                $orderbysections = true;
                $request_order = 'sections.description ' . $request_orderDirection;
                break;
            default:
                $request_order = $request_orderBy . ' ' . $request_orderDirection;
                break;
        }

        $search_name = request('search_name', '');
        $search_code = request('search_code', '');
        $search_national_id = request('search_national_id', '');
        $search_email = request('search_email', '');
        $search_department = request('search_department', '');
        $search_area = request('search_area', '');
        $search_section = request('search_section', '');

        $joindepartments = $orderbydepartments || $search_department != '';
        $joinareas = $orderbyareas || $search_area != '';
        $joinsections = $orderbysections || $search_section != '';

        $employees = Employee::when($search_name != '', function ($query) use ($search_name) {
            $query->where(function ($q) use ($search_name) {
                $q->where('last_name', 'LIKE', '%' . $search_name . '%')
                    ->orWhere('first_name', 'LIKE', '%' . $search_name . '%');
            });
        })->when($search_code != '' && $search_code != '*', function ($query) use ($search_code) {
            $query->where('code', 'LIKE', '%' . $search_code . '%');
        })->when($search_code != '' && $search_code == '*', function ($query) {
            $query->whereNotNull('code');
        })->when($search_national_id != '' && $search_national_id != '*', function ($query) use ($search_national_id) {
            $query->where('national_id', 'LIKE', '%' . $search_national_id . '%');
        })->when($search_national_id != '' && $search_national_id == '*', function ($query) {
            $query->whereNotNull('national_id');
        })->when($search_email != '' && $search_email != '*', function ($query) use ($search_email) {
            $query->where('email', 'LIKE', '%' . $search_email . '%');
        })->when($search_email != '' && $search_email == '*', function ($query) {
            $query->whereNotNull('email');
        })->when($joindepartments, function ($query) use ($orderbydepartments, $search_department, $request_order) {
            $query->leftJoin(
                'departments',
                'departments.id',
                '=',
                'employees.department_id'
            )->when($search_department != '' && $search_department != '*', function ($query) use ($search_department) {
                $query->where('departments.description', 'LIKE', '%' . $search_department . '%');
            })->when($search_department != '' && $search_department == '*', function ($query) {
                $query->whereNotNull('departments.description');
            })->when($orderbydepartments, function ($query) use ($request_order) {
                $query->orderByRaw($request_order);
            })->select('employees.*');
        })->when($joinareas, function ($query) use ($orderbyareas, $search_area, $request_order) {
            $query->leftJoin(
                'areas',
                'areas.id',
                '=',
                'employees.area_id'
            )->when($search_area != '' && $search_area != '*', function ($query) use ($search_area) {
                $query->where('areas.description', 'LIKE', '%' . $search_area . '%');
            })->when($search_area != '' && $search_area == '*', function ($query) {
                $query->whereNotNull('areas.description');
            })->when($orderbyareas, function ($query) use ($request_order) {
                $query->orderByRaw($request_order);
            })->select('employees.*');
        })->when($joinsections, function ($query) use ($orderbysections, $search_section, $request_order) {
            $query->leftJoin(
                'sections',
                'sections.id',
                '=',
                'employees.section_id'
            )->when($search_section != '' && $search_section != '*', function ($query) use ($search_section) {
                $query->where('sections.description', 'LIKE', '%' . $search_section . '%');
            })->when($search_section != '' && $search_section == '*', function ($query) {
                $query->whereNotNull('sections.description');
            })->when($orderbysections, function ($query) use ($request_order) {
                $query->orderByRaw($request_order);
            })->select('employees.*');
        })->when(!($orderbydepartments || $orderbyareas || $orderbysections), function ($query) use ($request_order) {
            $query->orderByRaw($request_order);
        })->paginate($request_perPage);

        // return $employees;
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
        $employee->delete();
        return ["message" => "deleted"];
    }

    public function shift(EmployeeSelfRequest $request, Employee $employee)
    {
        //     $employeeshift = $employee->shift;
        //     $calendar = null;
        //     $year = date("Y");
        //     $dayofyear = date("z");
        //     $employeecalendars = $employee->calendars;
        //     foreach ($employeecalendars as $employeecalendar) {
        //         if ($employeecalendar->year == $year) {
        //             $calendar = $employeecalendar->calendar;
        //             break;
        //         }
        //     }
        //     if ($calendar != null) {
        //         foreach ($calendar->shifts as $shift) {
        //             if ($shift->day == $dayofyear) {
        //                 $employeeshift = $shift->shift;
        //             }
        //         }
        //     }
        //     return new ShiftResource($employeeshift);

        //return new ShiftResource($employee->currentshift);

        $currentshift = $employee->shift;
        $currentcalendarshift = null;
        $currentcalendar = $employee->calendars()->where('year', date("Y"))->first();
        if ($currentcalendar != null) {
            $currentcalendarshift = $currentcalendar->calendar->shifts()->where('day', date("z"))->first();
            if ($currentcalendarshift != null) {
                $currentshift = $currentcalendarshift->shift;
            }
        }
        if ($currentshift == null)
            return new JsonResource(null);

        return new ShiftResource($currentshift);
    }

    public function calendar(EmployeeSelfRequest $request, Employee $employee)
    {
        $currentcalendar = null;
        $currentemployeecalendar = $employee->calendars()->where('year', date("Y"))->first();
        if ($currentemployeecalendar != null) {
            $currentcalendar = $currentemployeecalendar->calendar;
            // $currentcalendar->shifts;
        }

        return new CalendarResource($currentcalendar);
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
