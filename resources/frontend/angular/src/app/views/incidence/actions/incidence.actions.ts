import { createAction, props } from '@ngrx/store';
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

// ------------ Init Incidences ----------
export const initIncidences = createAction(
  '[Incidence Management] Init Incidences'
);
// ------------ Load Incidences ----------
export const loadIncidences = createAction(
  '[Incidence Management] Load Incidences',
  props<{ display: DisplayResourceCollection; search: IncidenceSearch }>()
);
export const loadIncidencesSuccess = createAction(
  '[Incidence Management] Load Incidences Success',
  props<{ incidences: IncidenceCollection }>()
);
export const loadIncidencesFailure = createAction(
  '[Incidence Management] Load Incidences Failure',
  props<{ error: any }>()
);
// ------------ Add Incidence ----------
export const addIncidence = createAction(
  '[Incidence Management] Add Incidence',
  props<{ incidence: Incidence }>()
);
export const addIncidenceSuccess = createAction(
  '[Incidence Management] Add Incidence Success',
  props<{ incidence: IncidenceResource }>()
);
export const addIncidenceFailure = createAction(
  '[Incidence Management] Add Incidence Failure',
  props<{ error: any }>()
);
// ------------ Update Incidence ----------
export const updateIncidence = createAction(
  '[Incidence Management] Update Incidence',
  props<{ incidence: Incidence }>()
);
export const updateIncidenceSuccess = createAction(
  '[Incidence Management] Update Incidence Success',
  props<{ incidence: IncidenceResource }>()
);
export const updateIncidenceFailure = createAction(
  '[Incidence Management] Update Incidence Failure',
  props<{ error: any }>()
);
// ------------ Delete Incidence ----------
export const deleteIncidence = createAction(
  '[Incidence Management] Delete Incidence',
  props<{ id: number }>()
);
export const deleteIncidenceSuccess = createAction(
  '[Incidence Management] Delete Incidence Success',
  props<{ message: string }>()
);
export const deleteIncidenceFailure = createAction(
  '[Incidence Management] Delete Incidence Failure',
  props<{ error: any }>()
);
// ------------ Init IncidencesGroups ----------
export const initIncidencesGroups = createAction(
  '[Incidence Management] Init IncidencesGroups'
);
// ------------ Load IncidencesGroups ----------
export const loadIncidencesGroups = createAction(
  '[Incidence Management] Load IncidencesGroups',
  props<{ display: DisplayResourceCollection; search: IncidencesGroupSearch }>()
);
export const loadIncidencesGroupsSuccess = createAction(
  '[Incidence Management] Load IncidencesGroups Success',
  props<{ incidencesgroups: IncidencesGroupCollection }>()
);
export const loadIncidencesGroupsFailure = createAction(
  '[Incidence Management] Load IncidencesGroups Failure',
  props<{ error: any }>()
);
// ------------ Add IncidencesGroup ----------
export const addIncidencesGroup = createAction(
  '[Incidence Management] Add IncidencesGroup',
  props<{ incidencesgroup: IncidencesGroup }>()
);
export const addIncidencesGroupSuccess = createAction(
  '[Incidence Management] Add IncidencesGroup Success',
  props<{ incidencesgroup: IncidencesGroupResource }>()
);
export const addIncidencesGroupFailure = createAction(
  '[Incidence Management] Add IncidencesGroup Failure',
  props<{ error: any }>()
);
// ------------ Update IncidencesGroup ----------
export const updateIncidencesGroup = createAction(
  '[Incidence Management] Update IncidencesGroup',
  props<{ incidencesgroup: IncidencesGroup }>()
);
export const updateIncidencesGroupSuccess = createAction(
  '[Incidence Management] Update IncidencesGroup Success',
  props<{ incidencesgroup: IncidencesGroupResource }>()
);
export const updateIncidencesGroupFailure = createAction(
  '[Incidence Management] Update IncidencesGroup Failure',
  props<{ error: any }>()
);
// ------------ Delete IncidencesGroup ----------
export const deleteIncidencesGroup = createAction(
  '[Incidence Management] Delete IncidencesGroup',
  props<{ id: number }>()
);
export const deleteIncidencesGroupSuccess = createAction(
  '[Incidence Management] Delete IncidencesGroup Success',
  props<{ message: string }>()
);
export const deleteIncidencesGroupFailure = createAction(
  '[Incidence Management] Delete IncidencesGroup Failure',
  props<{ error: any }>()
);
// ------------ Load IncidencesGroupIncidences ----------
export const loadIncidencesGroupIncidences = createAction(
  '[Incidence Management] Load IncidencesGroupIncidences',
  props<{ incidencesgroup_id: number; page: string }>()
);
export const loadIncidencesGroupIncidencesSuccess = createAction(
  '[Incidence Management] Load IncidencesGroupIncidences Success',
  props<{ incidencesgroupincidences: IncidencesGroupIncidenceCollection }>()
);
export const loadIncidencesGroupIncidencesFailure = createAction(
  '[Incidence Management] Load IncidencesGroupIncidences Failure',
  props<{ error: any }>()
);
// ------------ Add IncidencesGroup ----------
export const addIncidencesGroupIncidence = createAction(
  '[Incidence Management] Add IncidencesGroupIncidence',
  props<{
    incidencesgroup_id: number;
    incidencesgroupincidence: IncidencesGroupIncidence;
  }>()
);
export const addIncidencesGroupIncidenceSuccess = createAction(
  '[Incidence Management] Add IncidencesGroupIncidence Success',
  props<{ incidencesgroupincidence: IncidencesGroupIncidenceResource }>()
);
export const addIncidencesGroupIncidenceFailure = createAction(
  '[Incidence Management] Add IncidencesGroupIncidence Failure',
  props<{ error: any }>()
);
// ------------ Delete IncidencesGroup ----------
export const deleteIncidencesGroupIncidence = createAction(
  '[Incidence Management] Delete IncidencesGroupIncidence',
  props<{ incidencesgroup_id: number; incidencesgroupincidence_id: number }>()
);
export const deleteIncidencesGroupIncidenceSuccess = createAction(
  '[Incidence Management] Delete IncidencesGroupIncidence Success',
  props<{ message: string }>()
);
export const deleteIncidencesGroupIncidenceFailure = createAction(
  '[Incidence Management] Delete IncidencesGroupIncidence Failure',
  props<{ error: any }>()
);
