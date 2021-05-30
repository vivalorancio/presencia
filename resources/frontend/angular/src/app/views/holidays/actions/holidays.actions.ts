import { createAction, props } from '@ngrx/store';
import {
  HolidayPeriod,
  HolidayPeriodCollection,
  HolidayPeriodResource,
  HolidayPeriodSearch,
} from 'src/app/shared/models/holidays.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';

// ------------ Init HolidayPeriods ----------
export const initHolidayPeriods = createAction(
  '[Holidays Management] Init HolidayPeriods'
);
// ------------ Load HolidayPeriods ----------
export const loadHolidayPeriods = createAction(
  '[Holidays Management] Load HolidayPeriods',
  props<{ display: DisplayResourceCollection; search: HolidayPeriodSearch }>()
);
export const loadHolidayPeriodsSuccess = createAction(
  '[Holidays Management] Load HolidayPeriods Success',
  props<{ holidayperiods: HolidayPeriodCollection }>()
);
export const loadHolidayPeriodsFailure = createAction(
  '[Holidays Management] Load HolidayPeriods Failure',
  props<{ error: any }>()
);
// ------------ Add HolidayPeriod ----------
export const addHolidayPeriod = createAction(
  '[Holidays Management] Add HolidayPeriod',
  props<{ holidayperiod: HolidayPeriod }>()
);
export const addHolidayPeriodSuccess = createAction(
  '[Holidays Management] Add HolidayPeriod Success',
  props<{ holidayperiod: HolidayPeriodResource }>()
);
export const addHolidayPeriodFailure = createAction(
  '[Holidays Management] Add HolidayPeriod Failure',
  props<{ error: any }>()
);
// ------------ Update HolidayPeriod ----------
export const updateHolidayPeriod = createAction(
  '[Holidays Management] Update HolidayPeriod',
  props<{ holidayperiod: HolidayPeriod }>()
);
export const updateHolidayPeriodSuccess = createAction(
  '[Holidays Management] Update HolidayPeriod Success',
  props<{ holidayperiod: HolidayPeriodResource }>()
);
export const updateHolidayPeriodFailure = createAction(
  '[Holidays Management] Update HolidayPeriod Failure',
  props<{ error: any }>()
);
// ------------ Delete HolidayPeriod ----------
export const deleteHolidayPeriod = createAction(
  '[Holidays Management] Delete HolidayPeriod',
  props<{ id: number }>()
);
export const deleteHolidayPeriodSuccess = createAction(
  '[Holidays Management] Delete HolidayPeriod Success',
  props<{ message: string }>()
);
export const deleteHolidayPeriodFailure = createAction(
  '[Holidays Management] Delete HolidayPeriod Failure',
  props<{ error: any }>()
);
