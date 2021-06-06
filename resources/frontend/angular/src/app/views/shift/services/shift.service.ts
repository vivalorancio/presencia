import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Shift,
  ShiftCollection,
  ShiftResource,
  ShiftSearch,
} from 'src/app/shared/models/shift.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private http: HttpClient) {}

  getShifts(
    display: DisplayResourceCollection,
    search: ShiftSearch
  ): Observable<ShiftCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<ShiftCollection>('/api/shifts/', {
      params: params,
    });
  }

  getShift(shift_id: number): Observable<ShiftResource> {
    return this.http.get<ShiftResource>(`/api/shifts/${shift_id}`);
  }

  postShift(shift: Shift): Observable<ShiftResource> {
    return this.http.post<any>(`/api/shifts`, shift);
  }

  putShift(shift: Shift): Observable<ShiftResource> {
    return this.http.put<any>(`/api/shifts/${shift.id}`, shift);
  }

  deleteShift(id: number): Observable<any> {
    return this.http.delete<any>(`/api/shifts/${id}`);
  }
}
