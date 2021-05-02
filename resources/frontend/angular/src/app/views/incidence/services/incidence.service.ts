import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Incidence,
  IncidenceCollection,
  IncidenceResource,
  IncidencesGroup,
  IncidencesGroupCollection,
  IncidencesGroupIncidence,
  IncidencesGroupIncidenceCollection,
  IncidencesGroupIncidenceResource,
  IncidencesGroupResource,
} from 'src/app/shared/models/incidence.model';

@Injectable({
  providedIn: 'root',
})
export class IncidenceService {
  constructor(private http: HttpClient) {}

  //Incidences

  getIncidences(page: string): Observable<IncidenceCollection> {
    return this.http.get<IncidenceCollection>(`/api/incidences/?page=${page}`, {
      withCredentials: true,
    });
  }

  getIncidence(incidence_id: number): Observable<IncidenceResource> {
    return this.http.get<IncidenceResource>(`/api/incidences/${incidence_id}`, {
      withCredentials: true,
    });
  }

  postIncidence(incidence: Incidence): Observable<IncidenceResource> {
    return this.http.post<any>(`/api/incidences/`, incidence, {
      withCredentials: true,
    });
  }

  putIncidence(incidence: Incidence): Observable<IncidenceResource> {
    return this.http.put<any>(`/api/incidences/${incidence.id}`, incidence, {
      withCredentials: true,
    });
  }

  deleteIncidence(id: number): Observable<any> {
    return this.http.delete<any>(`/api/incidences/${id}`);
  }

  // Incidences Groups

  getIncidencesGroups(page: string): Observable<IncidencesGroupCollection> {
    return this.http.get<IncidencesGroupCollection>(
      `/api/incidences_groups/?page=${page}`,
      {
        withCredentials: true,
      }
    );
  }

  getIncidencesGroup(
    incidencesgroup_id: number
  ): Observable<IncidencesGroupResource> {
    return this.http.get<IncidencesGroupResource>(
      `/api/incidences_groups/${incidencesgroup_id}`,
      {
        withCredentials: true,
      }
    );
  }

  postIncidencesGroup(
    incidencesgroup: IncidencesGroup
  ): Observable<IncidencesGroupResource> {
    return this.http.post<any>(`/api/incidences_groups/`, incidencesgroup, {
      withCredentials: true,
    });
  }

  putIncidencesGroup(
    incidencesgroup: IncidencesGroup
  ): Observable<IncidencesGroupResource> {
    return this.http.put<any>(
      `/api/incidences_groups/${incidencesgroup.id}`,
      incidencesgroup,
      {
        withCredentials: true,
      }
    );
  }

  deleteIncidencesGroup(id: number): Observable<any> {
    return this.http.delete<any>(`/api/incidences_groups/${id}`);
  }

  // Incidences Groups Incidences

  getIncidencesGroupIncidences(
    incidencesgroup_id: number,
    page: string
  ): Observable<IncidencesGroupIncidenceCollection> {
    return this.http.get<IncidencesGroupIncidenceCollection>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences/?page=${page}`,
      {
        withCredentials: true,
      }
    );
  }

  getIncidencesGroupIncidence(
    incidencesgroup_id: number,
    incidencesgroupincidence_id: number
  ): Observable<IncidencesGroupIncidenceResource> {
    return this.http.get<IncidencesGroupIncidenceResource>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences/${incidencesgroupincidence_id}`,
      {
        withCredentials: true,
      }
    );
  }

  postIncidencesGroupIncidence(
    incidencesgroup_id: number,
    incidencesgroupincidence: IncidencesGroupIncidence
  ): Observable<IncidencesGroupIncidenceResource> {
    return this.http.post<any>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences/`,
      incidencesgroupincidence,
      {
        withCredentials: true,
      }
    );
  }

  deleteIncidencesGroupIncidence(
    incidencesgroup_id: number,
    incidencesgroupincidence_id: number
  ): Observable<any> {
    return this.http.delete<any>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences/${incidencesgroupincidence_id}`
    );
  }
}
