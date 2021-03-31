import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('AdminGuard#canActivate called');

    return this.store.select('authentication', 'user').pipe(
      switchMap((user) => {
        if (!user?.is_admin) return this.router.navigate(['/']);
        return of(true);
      }),
      catchError(() => of(false))
    );
  }
}
