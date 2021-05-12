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
import { CalendarService } from '../services/calendar.service';
import * as calendarsActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class CalendarsEffects {
  constructor(
    private actions$: Actions,
    private calendarService: CalendarService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.initCalendars),
      withLatestFrom(this.store.select('calendars')),
      map(([action, calendars]) =>
        calendarsActions.loadCalendars({
          display: calendars.display,
          search: calendars.search,
        })
      ),
      tap(() => this.router.navigate(['/management/calendars']))
    )
  );

  loadCalendars$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.loadCalendars),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService.getCalendars(action.display, action.search).pipe(
          map((calendars) =>
            calendarsActions.loadCalendarsSuccess({ calendars })
          ),
          catchError((error) =>
            of(calendarsActions.loadCalendarsFailure({ error }))
          )
        )
      )
    )
  );

  //loadCalendarsFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.addCalendar),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService.postCalendar(action.calendar).pipe(
          map((calendar) => calendarsActions.addCalendarSuccess({ calendar })),
          tap(() => this.router.navigate(['/management/calendars'])),
          catchError((error) =>
            of(calendarsActions.addCalendarFailure({ error }))
          )
        )
      )
    )
  );

  addCalendarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.addCalendarSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('calendars')),
      map(([action, calendars]) =>
        calendarsActions.loadCalendars({
          display: calendars.display,
          search: calendars.search,
        })
      )
    )
  );

  //addCalendarFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.updateCalendar),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService.putCalendar(action.calendar).pipe(
          map((calendar) =>
            calendarsActions.updateCalendarSuccess({ calendar })
          ),
          tap(() => this.router.navigate(['/management/calendars'])),
          catchError((error) =>
            of(calendarsActions.updateCalendarFailure({ error }))
          )
        )
      )
    )
  );

  updateCalendarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.updateCalendarSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('calendars')),
      map(([action, calendars]) =>
        calendarsActions.loadCalendars({
          display: calendars.display,
          search: calendars.search,
        })
      )
    )
  );

  //updateCalendarFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteCalendar$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.deleteCalendar),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService.deleteCalendar(action.id).pipe(
          map((message) => calendarsActions.deleteCalendarSuccess({ message })),
          tap(() => this.router.navigate(['/management/calendars'])),
          catchError((error) =>
            of(calendarsActions.updateCalendarFailure({ error }))
          )
        )
      )
    )
  );

  deleteCalendarSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.deleteCalendarSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('calendars')),
      map(([action, calendars]) =>
        calendarsActions.loadCalendars({
          display: calendars.display,
          search: calendars.search,
        })
      )
    )
  );

  //updateCalendarFailure ---> PROCESS ERROR MESSAGE / retry /etc

  loadCalendarShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.loadCalendarShifts),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService
          .getCalendarShifts(action.calendar_id, action.page)
          .pipe(
            map((calendarshifts) =>
              calendarsActions.loadCalendarShiftsSuccess({ calendarshifts })
            ),
            catchError((error) =>
              of(calendarsActions.loadCalendarShiftsFailure({ error }))
            )
          )
      )
    )
  );

  updateCalendarShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(calendarsActions.updateCalendarShifts),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.calendarService.postCalendarShifts(action.id, action.days).pipe(
          map((calendarshifts) =>
            calendarsActions.updateCalendarShiftsSuccess({ calendarshifts })
          ),
          catchError((error) =>
            of(calendarsActions.updateCalendarShiftsFailure({ error }))
          )
        )
      )
    )
  );
}
