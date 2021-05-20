import { createAction, props } from '@ngrx/store';
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
  SupervisionGroup,
  SupervisionGroupResource,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

// ------------ Init Departments ----------
export const initDepartments = createAction(
  '[Department Management] Init Departments'
);
// ------------ Load Departments ----------
export const loadDepartments = createAction(
  '[Department Management] Load Departments',
  props<{ display: DisplayResourceCollection; search: DepartmentSearch }>()
);
export const loadDepartmentsSuccess = createAction(
  '[Department Management] Load Departments Success',
  props<{ departments: DepartmentCollection }>()
);
export const loadDepartmentsFailure = createAction(
  '[Department Management] Load Departments Failure',
  props<{ error: any }>()
);
// ------------ Add Department ----------
export const addDepartment = createAction(
  '[Department Management] Add Department',
  props<{ department: Department }>()
);
export const addDepartmentSuccess = createAction(
  '[Department Management] Add Department Success',
  props<{ department: DepartmentResource }>()
);
export const addDepartmentFailure = createAction(
  '[Department Management] Add Department Failure',
  props<{ error: any }>()
);
// ------------ Update Department ----------
export const updateDepartment = createAction(
  '[Department Management] Update Department',
  props<{ department: Department }>()
);
export const updateDepartmentSuccess = createAction(
  '[Department Management] Update Department Success',
  props<{ department: DepartmentResource }>()
);
export const updateDepartmentFailure = createAction(
  '[Department Management] Update Department Failure',
  props<{ error: any }>()
);
// ------------ Delete Department ----------
export const deleteDepartment = createAction(
  '[Department Management] Delete Department',
  props<{ id: number }>()
);
export const deleteDepartmentSuccess = createAction(
  '[Department Management] Delete Department Success',
  props<{ message: string }>()
);
export const deleteDepartmentFailure = createAction(
  '[Department Management] Delete Department Failure',
  props<{ error: any }>()
);

// ------------ Init Areas ----------
export const initAreas = createAction('[Area Management] Init Areas');
// ------------ Load Areas ----------
export const loadAreas = createAction(
  '[Area Management] Load Areas',
  props<{ display: DisplayResourceCollection; search: AreaSearch }>()
);
export const loadAreasSuccess = createAction(
  '[Area Management] Load Areas Success',
  props<{ areas: AreaCollection }>()
);
export const loadAreasFailure = createAction(
  '[Area Management] Load Areas Failure',
  props<{ error: any }>()
);
// ------------ Add Area ----------
export const addArea = createAction(
  '[Area Management] Add Area',
  props<{ area: Area }>()
);
export const addAreaSuccess = createAction(
  '[Area Management] Add Area Success',
  props<{ area: AreaResource }>()
);
export const addAreaFailure = createAction(
  '[Area Management] Add Area Failure',
  props<{ error: any }>()
);
// ------------ Update Area ----------
export const updateArea = createAction(
  '[Area Management] Update Area',
  props<{ area: Area }>()
);
export const updateAreaSuccess = createAction(
  '[Area Management] Update Area Success',
  props<{ area: AreaResource }>()
);
export const updateAreaFailure = createAction(
  '[Area Management] Update Area Failure',
  props<{ error: any }>()
);
// ------------ Delete Area ----------
export const deleteArea = createAction(
  '[Area Management] Delete Area',
  props<{ id: number }>()
);
export const deleteAreaSuccess = createAction(
  '[Area Management] Delete Area Success',
  props<{ message: string }>()
);
export const deleteAreaFailure = createAction(
  '[Area Management] Delete Area Failure',
  props<{ error: any }>()
);

// ------------ Init Sections ----------
export const initSections = createAction('[Section Management] Init Sections');
// ------------ Load Sections ----------
export const loadSections = createAction(
  '[Section Management] Load Sections',
  props<{ display: DisplayResourceCollection; search: SectionSearch }>()
);
export const loadSectionsSuccess = createAction(
  '[Section Management] Load Sections Success',
  props<{ sections: SectionCollection }>()
);
export const loadSectionsFailure = createAction(
  '[Section Management] Load Sections Failure',
  props<{ error: any }>()
);
// ------------ Add Section ----------
export const addSection = createAction(
  '[Section Management] Add Section',
  props<{ section: Section }>()
);
export const addSectionSuccess = createAction(
  '[Section Management] Add Section Success',
  props<{ section: SectionResource }>()
);
export const addSectionFailure = createAction(
  '[Section Management] Add Section Failure',
  props<{ error: any }>()
);
// ------------ Update Section ----------
export const updateSection = createAction(
  '[Section Management] Update Section',
  props<{ section: Section }>()
);
export const updateSectionSuccess = createAction(
  '[Section Management] Update Section Success',
  props<{ section: SectionResource }>()
);
export const updateSectionFailure = createAction(
  '[Section Management] Update Section Failure',
  props<{ error: any }>()
);
// ------------ Delete Section ----------
export const deleteSection = createAction(
  '[Section Management] Delete Section',
  props<{ id: number }>()
);
export const deleteSectionSuccess = createAction(
  '[Section Management] Delete Section Success',
  props<{ message: string }>()
);
export const deleteSectionFailure = createAction(
  '[Section Management] Delete Section Failure',
  props<{ error: any }>()
);

// ------------ Init SupervisionGroups ----------
export const initSupervisionGroups = createAction(
  '[SupervisionGroup Management] Init SupervisionGroups'
);
// ------------ Load SupervisionGroups ----------
export const loadSupervisionGroups = createAction(
  '[SupervisionGroup Management] Load SupervisionGroups',
  props<{
    display: DisplayResourceCollection;
    search: SupervisionGroupSearch;
  }>()
);
export const loadSupervisionGroupsSuccess = createAction(
  '[SupervisionGroup Management] Load SupervisionGroups Success',
  props<{ supervisiongroups: SupervisionGroupCollection }>()
);
export const loadSupervisionGroupsFailure = createAction(
  '[SupervisionGroup Management] Load SupervisionGroups Failure',
  props<{ error: any }>()
);
// ------------ Add SupervisionGroup ----------
export const addSupervisionGroup = createAction(
  '[SupervisionGroup Management] Add SupervisionGroup',
  props<{ supervisiongroup: SupervisionGroup }>()
);
export const addSupervisionGroupSuccess = createAction(
  '[SupervisionGroup Management] Add SupervisionGroup Success',
  props<{ supervisiongroup: SupervisionGroupResource }>()
);
export const addSupervisionGroupFailure = createAction(
  '[SupervisionGroup Management] Add SupervisionGroup Failure',
  props<{ error: any }>()
);
// ------------ Update SupervisionGroup ----------
export const updateSupervisionGroup = createAction(
  '[SupervisionGroup Management] Update SupervisionGroup',
  props<{ supervisiongroup: SupervisionGroup }>()
);
export const updateSupervisionGroupSuccess = createAction(
  '[SupervisionGroup Management] Update SupervisionGroup Success',
  props<{ supervisiongroup: SupervisionGroupResource }>()
);
export const updateSupervisionGroupFailure = createAction(
  '[SupervisionGroup Management] Update SupervisionGroup Failure',
  props<{ error: any }>()
);
// ------------ Delete SupervisionGroup ----------
export const deleteSupervisionGroup = createAction(
  '[SupervisionGroup Management] Delete SupervisionGroup',
  props<{ id: number }>()
);
export const deleteSupervisionGroupSuccess = createAction(
  '[SupervisionGroup Management] Delete SupervisionGroup Success',
  props<{ message: string }>()
);
export const deleteSupervisionGroupFailure = createAction(
  '[SupervisionGroup Management] Delete SupervisionGroup Failure',
  props<{ error: any }>()
);
