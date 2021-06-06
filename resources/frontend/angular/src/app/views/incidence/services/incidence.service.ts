import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Incidence,
  IncidenceCollection,
  IncidenceResource,
  IncidenceSearch,
  IncidencesGroup,
  IncidencesGroupCollection,
  IncidencesGroupIncidence,
  IncidencesGroupIncidenceCollection,
  IncidencesGroupIncidenceResource,
  IncidencesGroupResource,
  IncidencesGroupSearch,
} from 'src/app/shared/models/incidence.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class IncidenceService {
  constructor(private http: HttpClient) {}

  //Incidences

  getIncidences(
    display: DisplayResourceCollection,
    search: IncidenceSearch
  ): Observable<IncidenceCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<IncidenceCollection>('/api/incidences/', {
      params: params,
    });
  }

  getIncidence(incidence_id: number): Observable<IncidenceResource> {
    return this.http.get<IncidenceResource>(`/api/incidences/${incidence_id}`);
  }

  postIncidence(incidence: Incidence): Observable<IncidenceResource> {
    return this.http.post<any>(`/api/incidences`, incidence);
  }

  putIncidence(incidence: Incidence): Observable<IncidenceResource> {
    return this.http.put<any>(`/api/incidences/${incidence.id}`, incidence);
  }

  deleteIncidence(id: number): Observable<any> {
    return this.http.delete<any>(`/api/incidences/${id}`);
  }

  // Incidences Groups

  getIncidencesGroups(
    display: DisplayResourceCollection,
    search: IncidencesGroupSearch
  ): Observable<IncidencesGroupCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<IncidencesGroupCollection>('/api/incidences_groups/', {
      params: params,
    });
  }

  getIncidencesGroup(
    incidencesgroup_id: number
  ): Observable<IncidencesGroupResource> {
    return this.http.get<IncidencesGroupResource>(
      `/api/incidences_groups/${incidencesgroup_id}`
    );
  }

  postIncidencesGroup(
    incidencesgroup: IncidencesGroup
  ): Observable<IncidencesGroupResource> {
    return this.http.post<any>(`/api/incidences_groups/`, incidencesgroup);
  }

  putIncidencesGroup(
    incidencesgroup: IncidencesGroup
  ): Observable<IncidencesGroupResource> {
    return this.http.put<any>(
      `/api/incidences_groups/${incidencesgroup.id}`,
      incidencesgroup
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
      `/api/incidences_groups/${incidencesgroup_id}/incidences/?page=${page}`
    );
  }

  getIncidencesGroupIncidence(
    incidencesgroup_id: number,
    incidencesgroupincidence_id: number
  ): Observable<IncidencesGroupIncidenceResource> {
    return this.http.get<IncidencesGroupIncidenceResource>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences/${incidencesgroupincidence_id}`
    );
  }

  postIncidencesGroupIncidence(
    incidencesgroup_id: number,
    incidencesgroupincidence: IncidencesGroupIncidence
  ): Observable<IncidencesGroupIncidenceResource> {
    return this.http.post<any>(
      `/api/incidences_groups/${incidencesgroup_id}/incidences`,
      incidencesgroupincidence
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
