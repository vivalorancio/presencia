import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Department,
  DepartmentCollection,
  DepartmentResource,
  DepartmentSearch,
  Area,
  AreaCollection,
  AreaResource,
  AreaSearch,
  Section,
  SectionCollection,
  SectionResource,
  SectionSearch,
  SupervisionGroupSearch,
  SupervisionGroupCollection,
  SupervisionGroupResource,
  SupervisionGroup,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private http: HttpClient) {}

  //Departments

  getDepartments(
    display: DisplayResourceCollection,
    search: DepartmentSearch
  ): Observable<DepartmentCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<DepartmentCollection>('/api/departments/', {
      params: params,
    });
  }

  getDepartment(department_id: number): Observable<DepartmentResource> {
    return this.http.get<DepartmentResource>(
      `/api/departments/${department_id}`
    );
  }

  postDepartment(department: Department): Observable<DepartmentResource> {
    return this.http.post<any>(`/api/departments/`, department);
  }

  putDepartment(department: Department): Observable<DepartmentResource> {
    return this.http.put<any>(`/api/departments/${department.id}`, department);
  }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete<any>(`/api/departments/${id}`);
  }

  //Areas

  getAreas(
    display: DisplayResourceCollection,
    search: AreaSearch
  ): Observable<AreaCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<AreaCollection>('/api/areas/', {
      params: params,
    });
  }

  getArea(area_id: number): Observable<AreaResource> {
    return this.http.get<AreaResource>(`/api/areas/${area_id}`);
  }

  postArea(area: Area): Observable<AreaResource> {
    return this.http.post<any>(`/api/areas/`, area);
  }

  putArea(area: Area): Observable<AreaResource> {
    return this.http.put<any>(`/api/areas/${area.id}`, area);
  }

  deleteArea(id: number): Observable<any> {
    return this.http.delete<any>(`/api/areas/${id}`);
  }

  //Sections

  getSections(
    display: DisplayResourceCollection,
    search: SectionSearch
  ): Observable<SectionCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<SectionCollection>('/api/sections/', {
      params: params,
    });
  }

  getSection(section_id: number): Observable<SectionResource> {
    return this.http.get<SectionResource>(`/api/sections/${section_id}`);
  }

  postSection(section: Section): Observable<SectionResource> {
    return this.http.post<any>(`/api/sections/`, section);
  }

  putSection(section: Section): Observable<SectionResource> {
    return this.http.put<any>(`/api/sections/${section.id}`, section);
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete<any>(`/api/sections/${id}`);
  }

  //SupervisionGroups

  getSupervisionGroups(
    display: DisplayResourceCollection,
    search: SupervisionGroupSearch
  ): Observable<SupervisionGroupCollection> {
    let params = new HttpParams();

    params = params.append('page', display.page);
    params = params.append('per_page', display.per_page);
    params = params.append('sort_field', display.sort_field);
    params = params.append('sort_direction', display.sort_direction);

    params = search.code ? params.append('search_code', search.code) : params;
    params = search.description
      ? params.append('search_description', search.description)
      : params;

    return this.http.get<SupervisionGroupCollection>(
      '/api/supervision_groups/',
      {
        params: params,
      }
    );
  }

  getSupervisionGroup(
    supervisiongroup_id: number
  ): Observable<SupervisionGroupResource> {
    return this.http.get<SupervisionGroupResource>(
      `/api/supervision_groups/${supervisiongroup_id}`
    );
  }

  postSupervisionGroup(
    supervisiongroup: SupervisionGroup
  ): Observable<SupervisionGroupResource> {
    return this.http.post<any>(`/api/supervision_groups/`, supervisiongroup);
  }

  putSupervisionGroup(
    supervisiongroup: SupervisionGroup
  ): Observable<SupervisionGroupResource> {
    return this.http.put<any>(
      `/api/supervision_groups/${supervisiongroup.id}`,
      supervisiongroup
    );
  }

  deleteSupervisionGroup(id: number): Observable<any> {
    return this.http.delete<any>(`/api/supervision_groups/${id}`);
  }
}
