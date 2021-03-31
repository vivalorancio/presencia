import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication.service';
import * as authenticationActions from '../actions';
import { User } from 'src/app/shared/models/user.model';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // reuquireLogin$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(authenticationActions.requirelogin),
  //       tap((action) => {
  //         this.router.navigate(['/login']);
  //       })
  //     ),
  //   { dispatch: false }
  // );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.login),
      tap((action) => console.log(action)),
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
          console.log(action.user);
          if (action.user.is_admin) {
            this.router.navigate(['/management']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }),
        map((action) =>
          authenticationActions.getEmployee({
            employee_id: action.user.employee_id,
          })
        )
      )
    //{ dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.logout),
      tap((action) => console.log(action)),
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
          console.log(action);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.getUser),
      tap((action) => console.log(action)),
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

  getUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.getUserSuccess),
      tap((action) => console.log(action.user)),
      map((action) =>
        authenticationActions.getEmployee({
          employee_id: action.user.employee_id,
        })
      )
    )
  );

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticationActions.getUserFailure),
        tap((action) => console.log(action)),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authenticationActions.getEmployee),
      tap((action) => console.log(action)),
      mergeMap((action) =>
        this.authenticationService.getEmployee(action.employee_id).pipe(
          map((employee) =>
            authenticationActions.getEmployeeSuccess({ employee })
          ),
          catchError((error) =>
            of(authenticationActions.getEmployeeFailure({ error }))
          )
        )
      )
    )
  );
}
