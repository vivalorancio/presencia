import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Employee,
  EmployeeCalendar,
  EmployeeCalendarCollection,
  EmployeeCalendarResource,
  EmployeeCollection,
  EmployeeResource,
} from 'src/app/shared/models/employee.model';
import { ShiftResource } from 'src/app/shared/models/shift.model';
import { Incidence } from 'src/app/shared/models/incidence.model';

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

  //Employee Calendars

  getEmployeeCalendars(
    employee_id: number,
    page: string
  ): Observable<EmployeeCalendarCollection> {
    return this.http.get<EmployeeCalendarCollection>(
      `/api/employees/${employee_id}/calendars/?page=${page}`,
      {
        withCredentials: true,
      }
    );
  }

  getEmployeeCalendar(
    employee_id: number,
    employeecalendar_id: number
  ): Observable<EmployeeCalendarResource> {
    return this.http.get<EmployeeCalendarResource>(
      `/api/employees/${employee_id}/calendars/${employeecalendar_id}`,
      {
        withCredentials: true,
      }
    );
  }

  postEmployeeCalendar(
    employee_id: number,
    employeecalendar: EmployeeCalendar
  ): Observable<EmployeeCalendarResource> {
    return this.http.post<any>(
      `/api/employees/${employee_id}/calendars`,
      employeecalendar,
      { withCredentials: true }
    );
  }

  deleteEmployeeCalendar(
    employee_id: number,
    employeecalendar_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `/api/employees/${employee_id}/calendars/${employeecalendar_id}`
    );
  }

  getEmployeeShift(employee_id: number): Observable<ShiftResource> {
    return this.http.get<ShiftResource>(`/api/employees/${employee_id}/shift`, {
      withCredentials: true,
    });
  }

  getEmployeeIncidences(employee_id: number): Observable<Incidence[]> {
    return this.http.get<Incidence[]>(
      `/api/employees/${employee_id}/incidences`,
      {
        withCredentials: true,
      }
    );
  }
}
