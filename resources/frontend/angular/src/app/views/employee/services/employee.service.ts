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
import {
  Incidence,
  IncidenceCollection,
} from 'src/app/shared/models/incidence.model';
import {
  Absence,
  AbsenceResource,
  Booking,
  BookingResource,
  DayBookingsCollection,
} from 'src/app/shared/models/booking.model';
import {
  DisplayBookingsCollection,
  DisplayRequestsCollection,
  DisplayResourceCollection,
} from 'src/app/shared/models/resource.model';
import {
  AbsenceRequest,
  BookingRequest,
  Request,
  RequestCollection,
} from 'src/app/shared/models/request.model';

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
    params = search.supervision_group
      ? params.append('search_supervision_group', search.supervision_group)
      : params;

    return this.http.get<EmployeeCollection>('/api/employees/', {
      params: params,
    });
  }

  getEmployee(employee_id: number): Observable<EmployeeResource> {
    return this.http.get<EmployeeResource>(`/api/employees/${employee_id}`);
  }

  postEmployee(employee: Employee): Observable<EmployeeResource> {
    return this.http.post<any>(`/api/employees/`, employee);
  }

  putEmployee(employee: Employee): Observable<EmployeeResource> {
    return this.http.put<any>(`/api/employees/${employee.id}`, employee);
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
      `/api/employees/${employee_id}/calendars/?page=${page}`
    );
  }

  getEmployeeCalendar(
    employee_id: number,
    employeecalendar_id: number
  ): Observable<EmployeeCalendarResource> {
    return this.http.get<EmployeeCalendarResource>(
      `/api/employees/${employee_id}/calendars/${employeecalendar_id}`
    );
  }

  postEmployeeCalendar(
    employee_id: number,
    employeecalendar: EmployeeCalendar
  ): Observable<EmployeeCalendarResource> {
    return this.http.post<any>(
      `/api/employees/${employee_id}/calendars`,
      employeecalendar
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

  //Current Employee Shift

  getEmployeeShift(employee_id: number): Observable<ShiftResource> {
    return this.http.get<ShiftResource>(`/api/employees/${employee_id}/shift`);
  }

  getEmployeeIncidences(employee_id: number): Observable<IncidenceCollection> {
    return this.http.get<IncidenceCollection>(
      `/api/employees/${employee_id}/incidences`
    );
  }

  //Employee Bookings

  getEmployeeBookings(
    employee_id: number,
    bookingsdisplay: DisplayBookingsCollection
  ): Observable<DayBookingsCollection> {
    let params = new HttpParams();

    params = params.append('range', bookingsdisplay.range);
    params = params.append('date', bookingsdisplay.date);

    return this.http.get<DayBookingsCollection>(
      `/api/employees/${employee_id}/bookings`,
      {
        params: params,
      }
    );
  }

  //Booking

  getBooking(
    employee_id: number,
    booking_id: number
  ): Observable<BookingResource> {
    return this.http.get<BookingResource>(
      `/api/employees/${employee_id}/bookings/${booking_id}`
    );
  }

  postBooking(employee_id: number, booking: Booking): Observable<any> {
    return this.http.post<any>(
      `/api/employees/${employee_id}/bookings`,
      booking
    );
  }

  putBooking(employee_id: number, booking: Booking): Observable<any> {
    return this.http.put<any>(
      `/api/employees/${employee_id}/bookings/${booking.id}`,
      booking
    );
  }

  deleteBooking(employee_id: number, booking_id: number): Observable<any> {
    return this.http.delete<any>(
      `/api/employees/${employee_id}/bookings/${booking_id}`
    );
  }
  //Absence

  getAbsence(
    employee_id: number,
    absence_id: number
  ): Observable<AbsenceResource> {
    return this.http.get<AbsenceResource>(
      `/api/employees/${employee_id}/absences/${absence_id}`
    );
  }

  postAbsence(employee_id: number, absence: Absence): Observable<any> {
    return this.http.post<any>(
      `/api/employees/${employee_id}/absences`,
      absence
    );
  }

  putAbsence(employee_id: number, absence: Absence): Observable<any> {
    return this.http.put<any>(
      `/api/employees/${employee_id}/absences/${absence.id}`,
      absence
    );
  }

  deleteAbsence(employee_id: number, absence_id: number): Observable<any> {
    return this.http.delete<any>(
      `/api/employees/${employee_id}/absences/${absence_id}`
    );
  }

  //Employee Requests

  getEmployeeRequests(
    employee_id: number,
    display: DisplayRequestsCollection
  ): Observable<RequestCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);
    params = params.append('type', display.type);
    params = params.append('status', display.status);

    return this.http.get<RequestCollection>(
      `/api/employees/${employee_id}/requests`,
      {
        params: params,
      }
    );
  }

  getEmployeeSupervisedRequests(
    employee_id: number,
    display: DisplayRequestsCollection
  ): Observable<RequestCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);
    params = params.append('type', display.type);
    params = params.append('status', display.status);

    return this.http.get<RequestCollection>(
      `/api/employees/${employee_id}/requests/supervised`,
      {
        params: params,
      }
    );
  }

  //Request

  postRequest(employee_id: number, request: any): Observable<any> {
    return this.http.post<any>(
      `/api/employees/${employee_id}/requests`,
      request
    );
  }

  putRequest(employee_id: number, request: Request): Observable<any> {
    return this.http.put<any>(
      `/api/employees/${employee_id}/requests/${request.id}`,
      request
    );
  }

  deleteRequest(employee_id: number, request_id: number): Observable<any> {
    return this.http.delete<any>(
      `/api/employees/${employee_id}/requests/${request_id}`
    );
  }
}
