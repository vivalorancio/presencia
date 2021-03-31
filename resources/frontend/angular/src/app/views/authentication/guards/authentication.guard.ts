import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { User } from 'src/app/shared/models/user.model';

import * as authenticationActions from 'src/app/views/authentication/actions';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    console.log('AuthenticationGuard#canActivate called');
    return this.loadUser().pipe(
      switchMap((user) => of(true)),
      catchError(() => of(false))
    );
  }

  private loadUser(): Observable<User> {
    return this.store.select('authentication', 'user').pipe(
      tap((user) => {
        if (!user?.username) {
          this.store.dispatch(authenticationActions.getUser());
        }
      }),
      filter((user) => Object.keys(user).length > 0),
      take(1)
    );
  }
}
