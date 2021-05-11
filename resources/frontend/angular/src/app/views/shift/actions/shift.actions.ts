import { createAction, props } from '@ngrx/store';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import {
  Shift,
  ShiftCollection,
  ShiftResource,
} from 'src/app/shared/models/shift.model';

// ------------ Load Shifts ----------
export const initShifts = createAction('[Shift Management] Init Shifts');
// ------------ Load Shifts ----------
export const loadShifts = createAction(
  '[Shift Management] Load Shifts',
  props<{ display: DisplayResourceCollection }>()
);
export const loadShiftsSuccess = createAction(
  '[Shift Management] Load Shifts Success',
  props<{ shifts: ShiftCollection }>()
);
export const loadShiftsFailure = createAction(
  '[Shift Management] Load Shifts Failure',
  props<{ error: any }>()
);
// ------------ Add Shift ----------
export const addShift = createAction(
  '[Shift Management] Add Shift',
  props<{ shift: Shift }>()
);
export const addShiftSuccess = createAction(
  '[Shift Management] Add Shift Success',
  props<{ shift: ShiftResource }>()
);
export const addShiftFailure = createAction(
  '[Shift Management] Add Shift Failure',
  props<{ error: any }>()
);
// ------------ Update Shift ----------
export const updateShift = createAction(
  '[Shift Management] Update Shift',
  props<{ shift: Shift }>()
);
export const updateShiftSuccess = createAction(
  '[Shift Management] Update Shift Success',
  props<{ shift: ShiftResource }>()
);
export const updateShiftFailure = createAction(
  '[Shift Management] Update Shift Failure',
  props<{ error: any }>()
);
// ------------ Delete Shift ----------
export const deleteShift = createAction(
  '[Shift Management] Delete Shift',
  props<{ id: number }>()
);
export const deleteShiftSuccess = createAction(
  '[Shift Management] Delete Shift Success',
  props<{ message: string }>()
);
export const deleteShiftFailure = createAction(
  '[Shift Management] Delete Shift Failure',
  props<{ error: any }>()
);
