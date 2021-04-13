import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Shift,
  ShiftCollection,
  ShiftResource,
} from 'src/app/shared/models/shift.model';

@Injectable({
  providedIn: 'root',
})
export class ShiftService {
  constructor(private http: HttpClient) {}

  getShifts(page: string): Observable<ShiftCollection> {
    return this.http.get<ShiftCollection>(`/api/shifts/?page=${page}`, {
      withCredentials: true,
    });
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
