import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, throttleTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as authenticationActions from 'src/app/views/authentication/actions';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private throttleLogout = new Subject();
  constructor(private store: Store<AppState>) {
    this.throttleLogout.pipe(throttleTime(5000)).subscribe((url) => {
      this.store.dispatch(authenticationActions.logout());
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          // Call logout, but throttled!
          this.throttleLogout.next();
        }
        return throwError(response);
      })
    );
  }
}
