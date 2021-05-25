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
import { AuthenticationService } from '../services/authentication.service';
import * as authenticationActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeService } from '../../employee/services/employee.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private employeeService: EmployeeService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.login),
      mergeMap((action) =>
        this.authenticationService
          .login({
            username: action.username,
            password: action.password,
          })
          .pipe(
            map((user) => authenticationActions.loginSuccess({ user })),
            catchError((error) =>
              of(authenticationActions.loginFailure({ error }))
            )
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.loginSuccess),
        tap((action) => {
          if (action.user.data?.is_admin) {
            this.router.navigate(['/management']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        })
        // map((action) =>
        //   authenticationActions.getEmployee({
        //     employee_id: action.user.employee_id,
        //   })
        // )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.logout),
      mergeMap((action) =>
        this.authenticationService.logout().pipe(
          map(() => authenticationActions.logoutSuccess()),
          catchError((error) =>
            of(authenticationActions.logoutFailure({ error }))
          )
        )
      )
    )
  );

  logoutEnd$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          authenticationActions.logoutSuccess,
          authenticationActions.logoutFailure
        ),
        tap((action) => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.getUser),
      mergeMap((action) =>
        this.authenticationService.getUser().pipe(
          map((user) => authenticationActions.getUserSuccess({ user })),
          catchError((error) =>
            of(authenticationActions.getUserFailure({ error }))
          )
        )
      )
    )
  );

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.getUserFailure),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
