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
import { ShiftService } from '../services/shift.service';
import * as shiftsActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class ShiftsEffects {
  constructor(
    private actions$: Actions,
    private shiftService: ShiftService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.loadShifts),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.shiftService.getShifts(action.page).pipe(
          map((shifts) => shiftsActions.loadShiftsSuccess({ shifts })),
          catchError((error) => of(shiftsActions.loadShiftsFailure({ error })))
        )
      )
    )
  );

  //loadShiftsFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.addShift),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.shiftService.postShift(action.shift).pipe(
          map((shift) => shiftsActions.addShiftSuccess({ shift })),
          tap(() => this.router.navigate(['/management/shifts'])),
          catchError((error) => of(shiftsActions.addShiftFailure({ error })))
        )
      )
    )
  );

  addShiftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.addShiftSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('shifts', 'page')),
      map(([action, page]) => shiftsActions.loadShifts({ page: page }))
    )
  );

  //addShiftFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.updateShift),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.shiftService.putShift(action.shift).pipe(
          map((shift) => shiftsActions.updateShiftSuccess({ shift })),
          tap(() => this.router.navigate(['/management/shifts'])),
          catchError((error) => of(shiftsActions.updateShiftFailure({ error })))
        )
      )
    )
  );

  updateShiftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.updateShiftSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('shifts', 'page')),
      map(([action, page]) => shiftsActions.loadShifts({ page: page }))
    )
  );

  //updateShiftFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.deleteShift),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.shiftService.deleteShift(action.id).pipe(
          map((message) => shiftsActions.deleteShiftSuccess({ message })),
          //tap(() => this.router.navigate(['/management/shifts'])),
          catchError((error) => of(shiftsActions.updateShiftFailure({ error })))
        )
      )
    )
  );

  deleteShiftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(shiftsActions.deleteShiftSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('shifts', 'page')),
      map(([action, page]) => shiftsActions.loadShifts({ page: page }))
    )
  );

  //updateShiftFailure ---> PROCESS ERROR MESSAGE / retry /etc
}
