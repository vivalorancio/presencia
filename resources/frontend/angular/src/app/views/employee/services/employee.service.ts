import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Employee,
  EmployeeCalendar,
  EmployeeCalendarCollection,
  EmployeeCalendarResource,
  EmployeeCollection,
  EmployeeResource,
  EmployeeSearch,
} from 'src/app/shared/models/employee.model';
import { ShiftResource } from 'src/app/shared/models/shift.model';
import { Incidence } from 'src/app/shared/models/incidence.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(
    display: DisplayResourceCollection,
    search: EmployeeSearch
  ): Observable<EmployeeCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.name ? params.append('search_name', search.name) : params;
    params = search.code ? params.append('search_code', search.code) : params;
    params = search.national_id
      ? params.append('search_national_id', search.national_id)
      : params;
    params = search.email
      ? params.append('search_email', search.email)
      : params;
    params = search.validity
      ? params.append('search_validity', search.validity)
      : params;
    params = search.department
      ? params.append('search_department', search.department)
      : params;
    params = search.area ? params.append('search_area', search.area) : params;
    params = search.section
      ? params.append('search_section', search.section)
      : params;

    // return this._HttpClient.get(`${API_URL}/api/v1/data/logs`, { params: params })

    return this.http.get<EmployeeCollection>('/api/employees/', {
      withCredentials: true,
      params: params,
    });

    // return this.http.get<EmployeeCollection>(
    //   `/api/employees/?page=${display.page}&per_page=${display.per_page}&sort_field=${display.sort_field}&sort_direction=${display.sort_direction}`,
    //   {
    //     withCredentials: true,
    //   }
    // );
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
