import { createReducer, on } from '@ngrx/store';
import {
  HolidayPeriodCollection,
  HolidayPeriodSearch,
} from 'src/app/shared/models/holidays.model';

import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as incidencesActions from '../actions';

export interface HolidayPeriodsState {
  error: string | null;
  display: DisplayResourceCollection;
  search: HolidayPeriodSearch;
  pending: boolean;
  holidayperiods: HolidayPeriodCollection;
}

export const initialHolidayPeriodsState: HolidayPeriodsState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as HolidayPeriodSearch,
  pending: false,
  holidayperiods: { data: [], links: null, meta: null },
};

export const _holidayperiodsReducer = createReducer(
  initialHolidayPeriodsState,
  on(incidencesActions.initHolidayPeriods, (state) => ({
    ...initialHolidayPeriodsState,
  })),
  on(incidencesActions.loadHolidayPeriods, (state, { display, search }) => ({
    ...state,
    display,
    search,
    pending: true,
  })),
  on(
    incidencesActions.loadHolidayPeriodsSuccess,
    (state, { holidayperiods }) => ({
      ...state,
      error: null,
      pending: false,
      holidayperiods,
    })
  ),
  on(incidencesActions.loadHolidayPeriodsFailure, (state, { error }) => ({
    ...initialHolidayPeriodsState,
    error,
  })),
  on(incidencesActions.addHolidayPeriod, (state, { holidayperiod }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.addHolidayPeriodSuccess, (state, { holidayperiod }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.addHolidayPeriodFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.updateHolidayPeriod, (state, { holidayperiod }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(
    incidencesActions.updateHolidayPeriodSuccess,
    (state, { holidayperiod }) => ({
      ...state,
      pending: false,
      error: null,
    })
  ),
  on(incidencesActions.updateHolidayPeriodFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(incidencesActions.deleteHolidayPeriod, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(incidencesActions.deleteHolidayPeriodSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(incidencesActions.deleteHolidayPeriodFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function holidayperiodsReducer(state: any, action: any) {
  return _holidayperiodsReducer(state, action);
}
