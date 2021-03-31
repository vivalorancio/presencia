import { Injectable } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  Employee,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login({ username, password }: any): Observable<any> {
    return this.http.post(
      '/api/login',
      { username, password },
      { withCredentials: true }
    );
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', {}, { withCredentials: true });
  }

  getUser(): Observable<User> {
    return this.http.get<User>('/api/user', { withCredentials: true });
  }

  getEmployee(employee_id: number): Observable<EmployeeResource> {
    return this.http.get<EmployeeResource>(`/api/employees/${employee_id}`, {
      withCredentials: true,
    });
  }
}
