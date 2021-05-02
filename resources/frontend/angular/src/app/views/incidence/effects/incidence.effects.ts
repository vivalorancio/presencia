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
import { IncidenceService } from '../services/incidence.service';
import * as incidencesActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class IncidencesEffects {
  constructor(
    private actions$: Actions,
    private incidenceService: IncidenceService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  loadIncidences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.loadIncidences),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.getIncidences(action.page).pipe(
          map((incidences) =>
            incidencesActions.loadIncidencesSuccess({ incidences })
          ),
          catchError((error) =>
            of(incidencesActions.loadIncidencesFailure({ error }))
          )
        )
      )
    )
  );

  //loadIncidencesFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addIncidence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidence),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.postIncidence(action.incidence).pipe(
          map((incidence) =>
            incidencesActions.addIncidenceSuccess({ incidence })
          ),
          tap(() => this.router.navigate(['/management/incidences'])),
          catchError((error) =>
            of(incidencesActions.addIncidenceFailure({ error }))
          )
        )
      )
    )
  );

  addIncidenceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidenceSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidences', 'page')),
      map(([action, page]) => incidencesActions.loadIncidences({ page: page }))
    )
  );

  //addIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateIncidence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.updateIncidence),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.putIncidence(action.incidence).pipe(
          map((incidence) =>
            incidencesActions.updateIncidenceSuccess({ incidence })
          ),
          tap(() => this.router.navigate(['/management/incidences'])),
          catchError((error) =>
            of(incidencesActions.updateIncidenceFailure({ error }))
          )
        )
      )
    )
  );

  updateIncidenceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.updateIncidenceSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidences', 'page')),
      map(([action, page]) => incidencesActions.loadIncidences({ page: page }))
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteIncidence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidence),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.deleteIncidence(action.id).pipe(
          map((message) =>
            incidencesActions.deleteIncidenceSuccess({ message })
          ),
          //tap(() => this.router.navigate(['/management/incidences'])),
          catchError((error) =>
            of(incidencesActions.deleteIncidenceFailure({ error }))
          )
        )
      )
    )
  );

  deleteIncidenceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidenceSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidences', 'page')),
      map(([action, page]) => incidencesActions.loadIncidences({ page: page }))
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc
  loadIncidencesGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.loadIncidencesGroups),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.getIncidencesGroups(action.page).pipe(
          map((incidencesgroups) =>
            incidencesActions.loadIncidencesGroupsSuccess({ incidencesgroups })
          ),
          catchError((error) =>
            of(incidencesActions.loadIncidencesGroupsFailure({ error }))
          )
        )
      )
    )
  );

  //loadIncidencesFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addIncidencesGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidencesGroup),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.postIncidencesGroup(action.incidencesgroup).pipe(
          map((incidencesgroup) =>
            incidencesActions.addIncidencesGroupSuccess({ incidencesgroup })
          ),
          tap(() => this.router.navigate(['/management/incidencesgroups'])),
          catchError((error) =>
            of(incidencesActions.addIncidencesGroupFailure({ error }))
          )
        )
      )
    )
  );

  addIncidencesGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidencesGroupSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidencesgroups', 'page')),
      map(([action, page]) =>
        incidencesActions.loadIncidencesGroups({ page: page })
      )
    )
  );

  //addIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateIncidencesGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.updateIncidencesGroup),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.putIncidencesGroup(action.incidencesgroup).pipe(
          map((incidencesgroup) =>
            incidencesActions.updateIncidencesGroupSuccess({ incidencesgroup })
          ),
          tap(() => this.router.navigate(['/management/incidencesgroups'])),
          catchError((error) =>
            of(incidencesActions.updateIncidencesGroupFailure({ error }))
          )
        )
      )
    )
  );

  updateIncidencesGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.updateIncidencesGroupSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidencesgroups', 'page')),
      map(([action, page]) =>
        incidencesActions.loadIncidencesGroups({ page: page })
      )
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteIncidencesGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidencesGroup),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService.deleteIncidencesGroup(action.id).pipe(
          map((message) =>
            incidencesActions.deleteIncidencesGroupSuccess({ message })
          ),
          //tap(() => this.router.navigate(['/management/incidences'])),
          catchError((error) =>
            of(incidencesActions.deleteIncidencesGroupFailure({ error }))
          )
        )
      )
    )
  );

  deleteIncidencesGroupSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidencesGroupSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('incidencesgroups', 'page')),
      map(([action, page]) =>
        incidencesActions.loadIncidencesGroups({ page: page })
      )
    )
  );

  //updateIncidenceFailure ---> PROCESS ERROR MESSAGE / retry /etc

  loadIncidencesGroupIncidences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.loadIncidencesGroupIncidences),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.incidenceService
          .getIncidencesGroupIncidences(action.incidencesgroup_id, action.page)
          .pipe(
            map((incidencesgroupincidences) =>
              incidencesActions.loadIncidencesGroupIncidencesSuccess({
                incidencesgroupincidences,
              })
            ),
            catchError((error) =>
              of(
                incidencesActions.loadIncidencesGroupIncidencesFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );

  addIncidencesGroupIncidence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidencesGroupIncidence),
      mergeMap((action) =>
        this.incidenceService
          .postIncidencesGroupIncidence(
            action.incidencesgroup_id,
            action.incidencesgroupincidence
          )
          .pipe(
            map((incidencesgroupincidence) =>
              incidencesActions.addIncidencesGroupIncidenceSuccess({
                incidencesgroupincidence,
              })
            ),
            //tap(() => this.router.navigate(['/management/employees'])),
            catchError((error) =>
              of(
                incidencesActions.addIncidencesGroupIncidenceFailure({ error })
              )
            )
          )
      )
    )
  );

  addIncidencesGroupIncidenceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.addIncidencesGroupIncidenceSuccess),
      withLatestFrom(this.store.select('incidencesgroupincidences')),
      map(([action, incidencesgroupincidences]) =>
        incidencesActions.loadIncidencesGroupIncidences({
          incidencesgroup_id: incidencesgroupincidences.incidencesgroup_id,
          page: incidencesgroupincidences.page,
        })
      )
    )
  );

  deleteIncidencesGroupIncidence$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidencesGroupIncidence),
      mergeMap((action) =>
        this.incidenceService
          .deleteIncidencesGroupIncidence(
            action.incidencesgroup_id,
            action.incidencesgroupincidence_id
          )
          .pipe(
            map((message) =>
              incidencesActions.deleteIncidencesGroupIncidenceSuccess({
                message,
              })
            ),
            //tap(() => this.router.navigate(['/management/employees'])),
            catchError((error) =>
              of(
                incidencesActions.deleteIncidencesGroupIncidenceFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );

  deleteIncidencesGroupIncidenceSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incidencesActions.deleteIncidencesGroupIncidenceSuccess),
      withLatestFrom(this.store.select('incidencesgroupincidences')),
      map(([action, incidencesgroupincidences]) =>
        incidencesActions.loadIncidencesGroupIncidences({
          incidencesgroup_id: incidencesgroupincidences.incidencesgroup_id,
          page: incidencesgroupincidences.page,
        })
      )
    )
  );
}
