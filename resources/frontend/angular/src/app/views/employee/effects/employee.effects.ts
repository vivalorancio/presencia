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

  initEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.initEmployees),
      withLatestFrom(this.store.select('employees')),
      map(([action, employees]) =>
        employeesActions.loadEmployees({
          display: employees.display,
          search: employees.search,
        })
      ),
      tap(() => this.router.navigate(['/management/employees']))
    )
  );

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployees),
      mergeMap((action) =>
        this.employeeService.getEmployees(action.display, action.search).pipe(
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
      withLatestFrom(this.store.select('employees')),
      map(([action, employees]) =>
        employeesActions.loadEmployees({
          display: employees.display,
          search: employees.search,
        })
      )
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
      withLatestFrom(this.store.select('employees')),
      map(([action, employees]) =>
        employeesActions.loadEmployees({
          display: employees.display,
          search: employees.search,
        })
      )
    )
  );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployee),
      mergeMap((action) =>
        this.employeeService.deleteEmployee(action.id).pipe(
          map((message) => employeesActions.deleteEmployeeSuccess({ message })),
          tap(() => this.router.navigate(['/management/employees'])),
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
      withLatestFrom(this.store.select('employees')),
      map(([action, employees]) =>
        employeesActions.loadEmployees({
          display: employees.display,
          search: employees.search,
        })
      )
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

  initEmployeeBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.initEmployeeBookings),
      withLatestFrom(this.store.select('bookings')),
      map(([action, bookings]) =>
        employeesActions.loadEmployeeBookings({
          employee_id: action.employee_id,
          bookingsdisplay: bookings.bookingsdisplay,
        })
      ),
      tap(() => this.router.navigate(['/dashboard/bookings']))
    )
  );

  loadEmployeeBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeBookings),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.employeeService
          .getEmployeeBookings(action.employee_id, action.bookingsdisplay)
          .pipe(
            map((bookings) =>
              employeesActions.loadEmployeeBookingsSuccess({ bookings })
            ),
            catchError((error) =>
              of(employeesActions.loadEmployeeBookingsFailure({ error }))
            )
          )
      )
    )
  );

  loadBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadBooking),
      mergeMap((action) =>
        this.employeeService
          .getBooking(action.employee_id, action.booking_id)
          .pipe(
            map((booking) => employeesActions.loadBookingSuccess({ booking })),
            catchError((error) =>
              of(employeesActions.loadBookingFailure({ error }))
            )
          )
      )
    )
  );

  book$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.book),
      mergeMap((action) =>
        this.employeeService
          .postBooking(action.employee_id, action.booking)
          .pipe(
            map((res) => employeesActions.bookSuccess({ res })),
            //tap(() => this.router.navigate(['/management/employees'])),
            catchError((error) => of(employeesActions.bookFailure({ error })))
          )
      )
    )
  );

  addBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addEmployeeBooking),
      mergeMap((action) =>
        this.employeeService
          .postBooking(action.employee_id, action.booking)
          .pipe(
            map((res) => employeesActions.addEmployeeBookingSuccess({ res })),
            tap(() =>
              this.router.navigate([
                `/management/employees/employee/${action.employee_id}/bookings`,
              ])
            ),
            catchError((error) =>
              of(employeesActions.addEmployeeBookingFailure({ error }))
            )
          )
      )
    )
  );

  // addBookingSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(employeesActions.addEmployeeBookingSuccess),
  //     withLatestFrom(this.store.select('employees')),
  //     map(([action, employees]) =>
  //       employeesActions.loadEmployees({
  //         display: employees.display,
  //         search: employees.search,
  //       })
  //     )
  //   )
  // );

  //addEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateEmployeeBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.updateEmployeeBooking),
      mergeMap((action) =>
        this.employeeService
          .putBooking(action.employee_id, action.booking)
          .pipe(
            map((res) =>
              employeesActions.updateEmployeeBookingSuccess({ res })
            ),
            tap(() =>
              this.router.navigate([
                `/management/employees/employee/${action.employee_id}/bookings`,
              ])
            ),
            catchError((error) =>
              of(employeesActions.updateEmployeeBookingFailure({ error }))
            )
          )
      )
    )
  );

  // updateEmployeeSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(employeesActions.updateEmployeeSuccess),
  //     withLatestFrom(this.store.select('employees')),
  //     map(([action, employees]) =>
  //       employeesActions.loadEmployees({
  //         display: employees.display,
  //         search: employees.search,
  //       })
  //     )
  //   )
  // );

  //updateEmployeeFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteEmployeeBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteEmployeeBooking),
      mergeMap((action) =>
        this.employeeService
          .deleteBooking(action.employee_id, action.booking_id)
          .pipe(
            map((message) =>
              employeesActions.deleteEmployeeBookingSuccess({ message })
            ),
            tap(() =>
              this.router.navigate([
                `/management/employees/employee/${action.employee_id}/bookings`,
              ])
            ),
            catchError((error) =>
              of(employeesActions.deleteEmployeeBookingFailure({ error }))
            )
          )
      )
    )
  );

  // deleteEmployeeSuccess$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(employeesActions.deleteEmployeeSuccess),
  //     withLatestFrom(this.store.select('employees')),
  //     map(([action, employees]) =>
  //       employeesActions.loadEmployees({
  //         display: employees.display,
  //         search: employees.search,
  //       })
  //     )
  //   )
  // );

  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployee),
      mergeMap((action) =>
        this.employeeService.getEmployee(action.employee_id).pipe(
          map((employee) => employeesActions.loadEmployeeSuccess({ employee })),
          catchError((error) =>
            of(employeesActions.loadEmployeeFailure({ error }))
          )
        )
      )
    )
  );

  loadEmployeeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeSuccess),
      map((action) =>
        employeesActions.loadEmployeeShift({
          employee_id: action.employee.data.id,
        })
      )
    )
  );

  loadEmployeeShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeShift),
      mergeMap((action) =>
        this.employeeService.getEmployeeShift(action.employee_id).pipe(
          map((shift) => employeesActions.loadEmployeeShiftSuccess({ shift })),
          catchError((error) =>
            of(employeesActions.loadEmployeeShiftFailure({ error }))
          )
        )
      )
    )
  );

  loadEmployeeSuccess2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeSuccess),
      map((action) =>
        employeesActions.loadEmployeeIncidences({
          employee_id: action.employee.data.id,
        })
      )
    )
  );

  loadEmployeeIncidences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeIncidences),
      mergeMap((action) =>
        this.employeeService.getEmployeeIncidences(action.employee_id).pipe(
          map((incidences) =>
            employeesActions.loadEmployeeIncidencesSuccess({ incidences })
          ),
          catchError((error) =>
            of(employeesActions.loadEmployeeIncidencesFailure({ error }))
          )
        )
      )
    )
  );

  initEmployeeRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.initEmployeeRequests),
      withLatestFrom(this.store.select('requests')),
      map(([action, requests]) =>
        employeesActions.loadEmployeeRequests({
          employee_id: action.employee_id,
          display: requests.display,
        })
      ),
      tap(() => this.router.navigate(['/dashboard/requests']))
    )
  );

  loadEmployeeRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeRequests),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.employeeService
          .getEmployeeRequests(action.employee_id, action.display)
          .pipe(
            map((requests) =>
              employeesActions.loadEmployeeRequestsSuccess({ requests })
            ),
            catchError((error) =>
              of(employeesActions.loadEmployeeRequestsFailure({ error }))
            )
          )
      )
    )
  );

  initEmployeeSupervisedRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.initEmployeeSupervisedRequests),
      withLatestFrom(this.store.select('requests')),
      map(([action, requests]) =>
        employeesActions.loadEmployeeSupervisedRequests({
          employee_id: action.employee_id,
          display: requests.display,
        })
      ),
      tap(() => this.router.navigate(['/dashboard/supervisedrequests']))
    )
  );

  loadEmployeeSupervisedRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployeeSupervisedRequests),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.employeeService
          .getEmployeeSupervisedRequests(action.employee_id, action.display)
          .pipe(
            map((requests) =>
              employeesActions.loadEmployeeSupervisedRequestsSuccess({
                requests,
              })
            ),
            catchError((error) =>
              of(
                employeesActions.loadEmployeeSupervisedRequestsFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );

  addRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.addRequest),
      mergeMap((action) =>
        this.employeeService
          .postRequest(action.employee_id, action.request)
          .pipe(
            map((res) => employeesActions.addRequestSuccess({ res })),
            tap(() => this.router.navigate(['/dashboard'])),
            catchError((error) =>
              of(employeesActions.addRequestFailure({ error }))
            )
          )
      )
    )
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.updateRequest),
      mergeMap((action) =>
        this.employeeService
          .putRequest(action.employee_id, action.request)
          .pipe(
            map((res) => employeesActions.updateRequestSuccess({ res })),
            tap(() => this.router.navigate([`/dashboard/supervisedrequests/`])),
            catchError((error) =>
              of(employeesActions.updateRequestFailure({ error }))
            )
          )
      )
    )
  );

  deleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.deleteRequest),
      mergeMap((action) =>
        this.employeeService
          .deleteRequest(action.employee_id, action.request_id)
          .pipe(
            map((message) =>
              employeesActions.deleteRequestSuccess({ message })
            ),
            tap(() => this.router.navigate([`/dashboard/requests/`])),
            catchError((error) =>
              of(employeesActions.deleteRequestFailure({ error }))
            )
          )
      )
    )
  );
}
