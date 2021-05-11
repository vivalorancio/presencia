import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Shift,
  ShiftCollection,
  ShiftResource,
} from 'src/app/shared/models/shift.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private http: HttpClient) {}

  getShifts(display: DisplayResourceCollection): Observable<ShiftCollection> {
    return this.http.get<ShiftCollection>(
      `/api/shifts/?page=${display.page}&per_page=${display.per_page}&sort_field=${display.sort_field}&sort_direction=${display.sort_direction}`,
      {
        withCredentials: true,
      }
    );
  }

  getShift(shift_id: number): Observable<ShiftResource> {
    return this.http.get<ShiftResource>(`/api/shifts/${shift_id}`, {
      withCredentials: true,
    });
  }

  postShift(shift: Shift): Observable<ShiftResource> {
    return this.http.post<any>(`/api/shifts/`, shift, {
      withCredentials: true,
    });
  }

  putShift(shift: Shift): Observable<ShiftResource> {
    return this.http.put<any>(`/api/shifts/${shift.id}`, shift, {
      withCredentials: true,
    });
  }

  deleteShift(id: number): Observable<any> {
    return this.http.delete<any>(`/api/shifts/${id}`);
  }
}
