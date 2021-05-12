import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Calendar,
  CalendarCollection,
  CalendarResource,
  CalendarSearch,
  CalendarShiftCollection,
  CalendarShiftResource,
} from 'src/app/shared/models/calendar.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  //Calendars

  getCalendars(
    display: DisplayResourceCollection,
    search: CalendarSearch
  ): Observable<CalendarCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.year ? params.append('search_year', search.year) : params;
    params = search.name ? params.append('search_name', search.name) : params;

    return this.http.get<CalendarCollection>('/api/calendars/', {
      withCredentials: true,
      params: params,
    });
    // return this.http.get<CalendarCollection>(`/api/calendars/?page=${page}`, {
    //   withCredentials: true,
    // });
  }

  getCalendar(calendar_id: number): Observable<CalendarResource> {
    return this.http.get<CalendarResource>(`/api/calendars/${calendar_id}`, {
      withCredentials: true,
    });
  }

  postCalendar(calendar: Calendar): Observable<CalendarResource> {
    return this.http.post<any>(`/api/calendars/`, calendar, {
      withCredentials: true,
    });
  }

  putCalendar(calendar: Calendar): Observable<CalendarResource> {
    return this.http.put<any>(`/api/calendars/${calendar.id}`, calendar, {
      withCredentials: true,
    });
  }

  deleteCalendar(id: number): Observable<any> {
    return this.http.delete<any>(`/api/calendars/${id}`);
  }

  //CalendarShifts

  getCalendarShifts(
    calendar_id: number,
    page: string
  ): Observable<CalendarShiftCollection> {
    return this.http.get<CalendarShiftCollection>(
      `/api/calendars/${calendar_id}/shifts/?page=${page}`,
      {
        withCredentials: true,
      }
    );
  }

  getCalendarShift(
    calendar_id: number,
    calendarshift_id: number
  ): Observable<CalendarShiftResource> {
    return this.http.get<CalendarShiftResource>(
      `/api/calendars/${calendar_id}/shifts/${calendarshift_id}`,
      {
        withCredentials: true,
      }
    );
  }

  postCalendarShifts(
    calendar_id: number,
    days: { day: number; shift_id: number | null }[]
  ): Observable<CalendarShiftCollection> {
    return this.http.post<any>(`/api/calendars/${calendar_id}/shifts/`, days, {
      withCredentials: true,
    });
  }
}
