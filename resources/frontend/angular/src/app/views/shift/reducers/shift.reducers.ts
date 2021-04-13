import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Shift, ShiftCollection } from 'src/app/shared/models/shift.model';
import * as shiftsActions from '../actions';

export interface ShiftsState {
  error: string | null;
  page: string;
  pending: boolean;
  shifts: ShiftCollection;
}

export const initialState: ShiftsState = {
  error: null,
  page: '',
  pending: false,
  shifts: { data: [], links: null, meta: null },
};

export const _shiftsReducer = createReducer(
  initialState,
  on(shiftsActions.loadShifts, (state, { page }) => ({
    ...state,
    page,
    pending: true,
  })),
  on(shiftsActions.loadShiftsSuccess, (state, { shifts }) => ({
    ...state,
    error: null,
    pending: false,
    shifts,
  })),
  on(shiftsActions.loadShiftsFailure, (state, { error }) => ({
    ...initialState,
    error,
  })),
  on(shiftsActions.addShift, (state, { shift }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(shiftsActions.addShiftSuccess, (state, { shift }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(shiftsActions.addShiftFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(shiftsActions.updateShift, (state, { shift }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(shiftsActions.updateShiftSuccess, (state, { shift }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(shiftsActions.updateShiftFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(shiftsActions.deleteShift, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(shiftsActions.deleteShiftSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(shiftsActions.deleteShiftFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function shiftsReducer(state: any, action: any) {
  return _shiftsReducer(state, action);
}
