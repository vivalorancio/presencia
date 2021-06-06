import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import {
  HolidayPeriod,
  HolidayPeriodCollection,
  HolidayPeriodResource,
  HolidayPeriodSearch,
} from 'src/app/shared/models/holidays.model';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  constructor(private http: HttpClient) {}

  // Holiday Periods

  getHolidayPeriods(
    display: DisplayResourceCollection,
    search: HolidayPeriodSearch
  ): Observable<HolidayPeriodCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<HolidayPeriodCollection>('/api/holiday_periods/', {
      params: params,
    });
  }

  getHolidayPeriod(
    holidayperiod_id: number
  ): Observable<HolidayPeriodResource> {
    return this.http.get<HolidayPeriodResource>(
      `/api/holiday_periods/${holidayperiod_id}`
    );
  }

  postHolidayPeriod(
    holidayperiod: HolidayPeriod
  ): Observable<HolidayPeriodResource> {
    return this.http.post<any>(`/api/holiday_periods`, holidayperiod);
  }

  putHolidayPeriod(
    holidayperiod: HolidayPeriod
  ): Observable<HolidayPeriodResource> {
    return this.http.put<any>(
      `/api/holiday_periods/${holidayperiod.id}`,
      holidayperiod
    );
  }

  deleteHolidayPeriod(id: number): Observable<any> {
    return this.http.delete<any>(`/api/holiday_periods/${id}`);
  }
}
