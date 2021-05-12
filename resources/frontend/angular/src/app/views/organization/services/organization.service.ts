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
      withCredentials: true,
      params: params,
    });

    // return this.http.get<DepartmentCollection>(`/api/departments/?page=${page}`, {
    //   withCredentials: true,
    // });
  }

  getDepartment(department_id: number): Observable<DepartmentResource> {
    return this.http.get<DepartmentResource>(
      `/api/departments/${department_id}`,
      {
        withCredentials: true,
      }
    );
  }

  postDepartment(department: Department): Observable<DepartmentResource> {
    return this.http.post<any>(`/api/departments/`, department, {
      withCredentials: true,
    });
  }

  putDepartment(department: Department): Observable<DepartmentResource> {
    return this.http.put<any>(`/api/departments/${department.id}`, department, {
      withCredentials: true,
    });
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
      withCredentials: true,
      params: params,
    });

    // return this.http.get<AreaCollection>(`/api/areas/?page=${page}`, {
    //   withCredentials: true,
    // });
  }

  getArea(area_id: number): Observable<AreaResource> {
    return this.http.get<AreaResource>(`/api/areas/${area_id}`, {
      withCredentials: true,
    });
  }

  postArea(area: Area): Observable<AreaResource> {
    return this.http.post<any>(`/api/areas/`, area, {
      withCredentials: true,
    });
  }

  putArea(area: Area): Observable<AreaResource> {
    return this.http.put<any>(`/api/areas/${area.id}`, area, {
      withCredentials: true,
    });
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
      withCredentials: true,
      params: params,
    });

    // return this.http.get<SectionCollection>(`/api/sections/?page=${page}`, {
    //   withCredentials: true,
    // });
  }

  getSection(section_id: number): Observable<SectionResource> {
    return this.http.get<SectionResource>(`/api/sections/${section_id}`, {
      withCredentials: true,
    });
  }

  postSection(section: Section): Observable<SectionResource> {
    return this.http.post<any>(`/api/sections/`, section, {
      withCredentials: true,
    });
  }

  putSection(section: Section): Observable<SectionResource> {
    return this.http.put<any>(`/api/sections/${section.id}`, section, {
      withCredentials: true,
    });
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete<any>(`/api/sections/${id}`);
  }
}
