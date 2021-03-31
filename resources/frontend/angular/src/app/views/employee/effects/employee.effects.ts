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
      tap((action) => console.log(action)),
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
      tap((action) => console.log(action)),
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
      tap((action) => console.log(action)),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //addEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.updateEmployee),
      tap((action) => console.log(action)),
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
      tap((action) => console.log(action)),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployee),
      tap((action) => console.log(action)),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map((message) => employeesActions.deleteEmployeeSuccess({ message })),
          //tap(() => this.router.navigate(['/management/employees'])),
          catchError((error) =>
            of(employeesActions.updateEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  deleteEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployeeSuccess),
      tap((action) => console.log(action)),
      withLatestFrom(this.store.select('employees', 'page')),
      map(([action, page]) => employeesActions.loadEmployees({ page: page }))
    )
  );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc
}
