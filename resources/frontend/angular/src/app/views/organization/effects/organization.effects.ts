import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrganizationService } from '../services/organization.service';
import * as organizationsActions from '../actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class OrganizationEffects {
  constructor(
    private actions$: Actions,
    private organizationService: OrganizationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  // Departments

  initDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.initDepartments),
      withLatestFrom(this.store.select('departments')),
      map(([action, departments]) =>
        organizationsActions.loadDepartments({
          display: departments.display,
          search: departments.search,
        })
      ),
      tap(() => this.router.navigate(['/management/departments']))
    )
  );

  loadDepartments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.loadDepartments),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService
          .getDepartments(action.display, action.search)
          .pipe(
            map((departments) =>
              organizationsActions.loadDepartmentsSuccess({ departments })
            ),
            catchError((error) =>
              of(organizationsActions.loadDepartmentsFailure({ error }))
            )
          )
      )
    )
  );

  //loadDepartmentsFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addDepartment),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.postDepartment(action.department).pipe(
          map((department) =>
            organizationsActions.addDepartmentSuccess({ department })
          ),
          tap(() => this.router.navigate(['/management/departments'])),
          catchError((error) =>
            of(organizationsActions.addDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  addDepartmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addDepartmentSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('departments')),
      map(([action, departments]) =>
        organizationsActions.loadDepartments({
          display: departments.display,
          search: departments.search,
        })
      )
    )
  );

  //addDepartmentFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateDepartment),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.putDepartment(action.department).pipe(
          map((department) =>
            organizationsActions.updateDepartmentSuccess({ department })
          ),
          tap(() => this.router.navigate(['/management/departments'])),
          catchError((error) =>
            of(organizationsActions.updateDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  updateDepartmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateDepartmentSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('departments')),
      map(([action, departments]) =>
        organizationsActions.loadDepartments({
          display: departments.display,
          search: departments.search,
        })
      )
    )
  );

  //updateDepartmentFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteDepartment),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.deleteDepartment(action.id).pipe(
          map((message) =>
            organizationsActions.deleteDepartmentSuccess({ message })
          ),
          tap(() => this.router.navigate(['/management/departments'])),
          catchError((error) =>
            of(organizationsActions.deleteDepartmentFailure({ error }))
          )
        )
      )
    )
  );

  deleteDepartmentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteDepartmentSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('departments')),
      map(([action, departments]) =>
        organizationsActions.loadDepartments({
          display: departments.display,
          search: departments.search,
        })
      )
    )
  );

  // Areas

  initAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.initAreas),
      withLatestFrom(this.store.select('areas')),
      map(([action, areas]) =>
        organizationsActions.loadAreas({
          display: areas.display,
          search: areas.search,
        })
      ),
      tap(() => this.router.navigate(['/management/areas']))
    )
  );

  loadAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.loadAreas),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.getAreas(action.display, action.search).pipe(
          map((areas) => organizationsActions.loadAreasSuccess({ areas })),
          catchError((error) =>
            of(organizationsActions.loadAreasFailure({ error }))
          )
        )
      )
    )
  );

  //loadAreasFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addArea),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.postArea(action.area).pipe(
          map((area) => organizationsActions.addAreaSuccess({ area })),
          tap(() => this.router.navigate(['/management/areas'])),
          catchError((error) =>
            of(organizationsActions.addAreaFailure({ error }))
          )
        )
      )
    )
  );

  addAreaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addAreaSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('areas')),
      map(([action, areas]) =>
        organizationsActions.loadAreas({
          display: areas.display,
          search: areas.search,
        })
      )
    )
  );

  //addAreaFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateArea),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.putArea(action.area).pipe(
          map((area) => organizationsActions.updateAreaSuccess({ area })),
          tap(() => this.router.navigate(['/management/areas'])),
          catchError((error) =>
            of(organizationsActions.updateAreaFailure({ error }))
          )
        )
      )
    )
  );

  updateAreaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateAreaSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('areas')),
      map(([action, areas]) =>
        organizationsActions.loadAreas({
          display: areas.display,
          search: areas.search,
        })
      )
    )
  );

  //updateAreaFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteArea$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteArea),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.deleteArea(action.id).pipe(
          map((message) => organizationsActions.deleteAreaSuccess({ message })),
          tap(() => this.router.navigate(['/management/areas'])),
          catchError((error) =>
            of(organizationsActions.deleteAreaFailure({ error }))
          )
        )
      )
    )
  );

  deleteAreaSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteAreaSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('areas')),
      map(([action, areas]) =>
        organizationsActions.loadAreas({
          display: areas.display,
          search: areas.search,
        })
      )
    )
  );

  // Sections

  initSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.initSections),
      withLatestFrom(this.store.select('sections')),
      map(([action, sections]) =>
        organizationsActions.loadSections({
          display: sections.display,
          search: sections.search,
        })
      ),
      tap(() => this.router.navigate(['/management/sections']))
    )
  );

  loadSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.loadSections),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService
          .getSections(action.display, action.search)
          .pipe(
            map((sections) =>
              organizationsActions.loadSectionsSuccess({ sections })
            ),
            catchError((error) =>
              of(organizationsActions.loadSectionsFailure({ error }))
            )
          )
      )
    )
  );

  //loadSectionsFailure ---> PROCESS ERROR MESSAGE?? /retry /etc

  addSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addSection),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.postSection(action.section).pipe(
          map((section) => organizationsActions.addSectionSuccess({ section })),
          tap(() => this.router.navigate(['/management/sections'])),
          catchError((error) =>
            of(organizationsActions.addSectionFailure({ error }))
          )
        )
      )
    )
  );

  addSectionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.addSectionSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('sections')),
      map(([action, sections]) =>
        organizationsActions.loadSections({
          display: sections.display,
          search: sections.search,
        })
      )
    )
  );

  //addSectionFailure ---> PROCESS ERROR MESSAGE / retry /etc

  updateSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateSection),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.putSection(action.section).pipe(
          map((section) =>
            organizationsActions.updateSectionSuccess({ section })
          ),
          tap(() => this.router.navigate(['/management/sections'])),
          catchError((error) =>
            of(organizationsActions.updateSectionFailure({ error }))
          )
        )
      )
    )
  );

  updateSectionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.updateSectionSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('sections')),
      map(([action, sections]) =>
        organizationsActions.loadSections({
          display: sections.display,
          search: sections.search,
        })
      )
    )
  );

  //updateSectionFailure ---> PROCESS ERROR MESSAGE / retry /etc

  deleteSection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteSection),
      // tap((action) => console.log(action)),
      mergeMap((action) =>
        this.organizationService.deleteSection(action.id).pipe(
          map((message) =>
            organizationsActions.deleteSectionSuccess({ message })
          ),
          tap(() => this.router.navigate(['/management/sections'])),
          catchError((error) =>
            of(organizationsActions.deleteSectionFailure({ error }))
          )
        )
      )
    )
  );

  deleteSectionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(organizationsActions.deleteSectionSuccess),
      // tap((action) => console.log(action)),
      withLatestFrom(this.store.select('sections')),
      map(([action, sections]) =>
        organizationsActions.loadSections({
          display: sections.display,
          search: sections.search,
        })
      )
    )
  );
}
