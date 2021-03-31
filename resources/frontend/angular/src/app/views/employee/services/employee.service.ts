import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Employee,
  EmployeeCollection,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(page: string): Observable<EmployeeCollection> {
    return this.http.get<EmployeeCollection>(`/api/employees/?page=${page}`, {
      withCredentials: true,
    });
  }

  getEmployee(employee_id: number): Observable<EmployeeResource> {
    return this.http.get<EmployeeResource>(`/api/employees/${employee_id}`, {
      withCredentials: true,
    });
  }

  postEmployee(employee: Employee): Observable<EmployeeResource> {
    return this.http.post<any>(`/api/employees/`, employee, {
      withCredentials: true,
    });
  }

  putEmployee(employee: Employee): Observable<EmployeeResource> {
    return this.http.put<any>(`/api/employees/${employee.id}`, employee, {
      withCredentials: true,
    });
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`/api/employees/${id}`);
  }
}
