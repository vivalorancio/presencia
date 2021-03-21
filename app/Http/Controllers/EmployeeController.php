<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'code' => 'unique:employees|nullable',
            'national_id' => 'unique:employees|nullable',
            'email' => 'email|nullable',
            'start_date' => 'date|nullable',
            'end_date' => 'date|nullable',
            'supervision_group_id' => 'integer|nullable',
            'shift_id' => 'integer|nullable',
            'is_editor' => 'boolean'
        ]);

        return Employee::create($validated);
    }

    public function show($id)
    {
        return Employee::findOrFail($id);
    }

    public function update(Request $request, $id)
    {

        //
        //   FALTA VALIDAR
        //   Mirar de muntar una regla de validació valida per creació i per mdificació
        //

        $employee = Employee::findOrFail($id);
        $employee->update($request->all());
        $employee->save();
        return $employee;
    }

    public function destroy($id)
    {
        Employee::findOrFail($id)->delete();
    }
}
