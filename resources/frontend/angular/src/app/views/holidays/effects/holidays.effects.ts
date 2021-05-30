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
import { HolidaysService } from '../services/holidays.service';
import * as holidaysActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class HolidaysEffects {
  constructor(
    private actions$: Actions,
    private holidaysService: HolidaysService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  initHolidayPeriods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.initHolidayPeriods),
      withLatestFrom(this.store.select('holidayperiods')),
      map(([action, holidayperiods]) =>
        holidaysActions.loadHolidayPeriods({
          display: holidayperiods.display,
          search: holidayperiods.search,
        })
      ),
      tap(() => this.router.navigate(['/management/holidays']))
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc
  loadHolidayPeriods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.loadHolidayPeriods),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.holidaysService
          .getHolidayPeriods(action.display, action.search)
          .pipe(
            map((holidayperiods) =>
              holidaysActions.loadHolidayPeriodsSuccess({
                holidayperiods,
              })
            ),
            catchError((error) =>
              of(holidaysActions.loadHolidayPeriodsFailure({ error }))
            )
          )
      )
    )
  );

  //loadIncidencesFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addHolidayPeriod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.addHolidayPeriod),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.holidaysService.postHolidayPeriod(action.holidayperiod).pipe(
          map((holidayperiod) =>
            holidaysActions.addHolidayPeriodSuccess({ holidayperiod })
          ),
          tap(() => this.router.navigate(['/management/holidays'])),
          catchError((error) =>
            of(holidaysActions.addHolidayPeriodFailure({ error }))
          )
        )
      )
    )
  );

  addHolidayPeriodSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.addHolidayPeriodSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('holidayperiods')),
      map(([action, holidayperiods]) =>
        holidaysActions.loadHolidayPeriods({
          display: holidayperiods.display,
          search: holidayperiods.search,
        })
      )
    )
  );

  //addIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateHolidayPeriod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.updateHolidayPeriod),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.holidaysService.putHolidayPeriod(action.holidayperiod).pipe(
          map((holidayperiod) =>
            holidaysActions.updateHolidayPeriodSuccess({ holidayperiod })
          ),
          tap(() => this.router.navigate(['/management/holidays'])),
          catchError((error) =>
            of(holidaysActions.updateHolidayPeriodFailure({ error }))
          )
        )
      )
    )
  );

  updateHolidayPeriodSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.updateHolidayPeriodSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('holidayperiods')),
      map(([action, holidayperiods]) =>
        holidaysActions.loadHolidayPeriods({
          display: holidayperiods.display,
          search: holidayperiods.search,
        })
      )
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteHolidayPeriod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.deleteHolidayPeriod),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.holidaysService.deleteHolidayPeriod(action.id).pipe(
          map((message) =>
            holidaysActions.deleteHolidayPeriodSuccess({ message })
          ),
          tap(() => this.router.navigate(['/management/holidays'])),
          catchError((error) =>
            of(holidaysActions.deleteHolidayPeriodFailure({ error }))
          )
        )
      )
    )
  );

  deleteHolidayPeriodSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.deleteHolidayPeriodSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('holidayperiods')),
      map(([action, holidayperiods]) =>
        holidaysActions.loadHolidayPeriods({
          display: holidayperiods.display,
          search: holidayperiods.search,
        })
      )
    )
  );
}
