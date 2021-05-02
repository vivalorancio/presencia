import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import * as employeesActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class EmployeesEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployees),
      mergeMap((action) =>
        this.employeeService.getEmployees(action.page).pipe(
          map((employees) =>
            employeesActions.loadEmployeesSuccess({ employees })
          ),
          catchError((error) =>
            of(employeesActions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );

  //loadEmployeesFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addEmployee),
      mergeMap((action) =>
        this.employeeService.postEmployee(action.employee).pipe(
          map((employee) => employeesActions.addEmployeeSuccess({ employee })),
          tap(() => this.router.navigate(['/management/employees'])),
          catchError((error) =>
            of(employeesActions.addEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  addEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addEmployeeSuccess),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //addEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.updateEmployee),
      mergeMap((action) =>
        this.employeeService.putEmployee(action.employee).pipe(
          map((employee) =>
            employeesActions.updateEmployeeSuccess({ employee })
          ),
          tap(() => this.router.navigate(['/management/employees'])),
          catchError((error) =>
            of(employeesActions.updateEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  updateEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.updateEmployeeSuccess),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployee),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map((message) => employeesActions.deleteEmployeeSuccess({ message })),
          //tap(() => this.router.navigate(['/management/employees'])),
          catchError((error) =>
            of(employeesActions.deleteEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  deleteEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployeeSuccess),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  loadEmployeeCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeCalendars),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.employeeService
          .getEmployeeCalendars(action.employee_id, action.page)
          .pipe(
            map((employeecalendars) =>
              employeesActions.loadEmployeeCalendarsSuccess({
                employeecalendars,
              })
            ),
            catchError((error) =>
              of(employeesActions.loadEmployeeCalendarsFailure({ error }))
            )
          )
      )
    )
  );

  addEmployeeCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addEmployeeCalendar),
      mergeMap((action) =>
        this.employeeService
          .postEmployeeCalendar(action.employee_id, action.employeecalendar)
          .pipe(
            map((employeecalendar) =>
              employeesActions.addEmployeeCalendarSuccess({ employeecalendar })
            ),
            //tap(() => this.router.navigate(['/management/employees'])),
            catchError((error) =>
              of(employeesActions.addEmployeeCalendarFailure({ error }))
            )
          )
      )
    )
  );

  addEmployeeCalendarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addEmployeeCalendarSuccess),
      withLatestFrom(this.store.select('employeecalendars')),
      map(([action, employeecalendars]) =>
        employeesActions.loadEmployeeCalendars({
          employee_id: employeecalendars.employee_id,
          page: employeecalendars.page,
        })
      )
    )
  );

  deleteEmployeeCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployeeCalendar),
      mergeMap((action) =>
        this.employeeService
          .deleteEmployeeCalendar(
            action.employee_id,
            action.employeecalendar_id
          )
          .pipe(
            map((message) =>
              employeesActions.deleteEmployeeCalendarSuccess({ message })
            ),
            //tap(() => this.router.navigate(['/management/employees'])),
            catchError((error) =>
              of(employeesActions.deleteEmployeeCalendarFailure({ error }))
            )
          )
      )
    )
  );

  deleteEmployeeCalendarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployeeCalendarSuccess),
      withLatestFrom(this.store.select('employeecalendars')),
      map(([action, employeecalendars]) =>
        employeesActions.loadEmployeeCalendars({
          employee_id: employeecalendars.employee_id,
          page: employeecalendars.page,
        })
      )
    )
  );
}
