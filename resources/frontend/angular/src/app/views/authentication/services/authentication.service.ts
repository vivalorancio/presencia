import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login({ username, password }: any): Observable<any> {
    return this.http.post('/api/login', { username, password });
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', {});
  }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user');
  }
}
