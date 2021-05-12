import { createReducer, on } from '@ngrx/store';
import {
  SectionCollection,
  SectionSearch,
} from 'src/app/shared/models/organization.model';
import { DisplayResourceCollection } from 'src/app/shared/models/resource.model';
import * as organizationActions from '../actions';

export interface SectionsState {
  error: string | null;
  display: DisplayResourceCollection;
  search: SectionSearch;
  pending: boolean;
  sections: SectionCollection;
}

export const initialSectionState: SectionsState = {
  error: null,
  display: {
    page: '1',
    per_page: '25',
    sort_field: 'code',
    sort_direction: 'asc',
  },
  search: {} as SectionSearch,
  pending: false,
  sections: { data: [], links: null, meta: null },
};

export const _sectionsReducer = createReducer(
  initialSectionState,
  on(organizationActions.initSections, (state) => ({
    ...initialSectionState,
  })),
  on(organizationActions.loadSections, (state, { display, search }) => ({
    ...state,
    display,
    search,
    pending: true,
  })),
  on(organizationActions.loadSectionsSuccess, (state, { sections }) => ({
    ...state,
    error: null,
    pending: false,
    sections,
  })),
  on(organizationActions.loadSectionsFailure, (state, { error }) => ({
    ...initialSectionState,
    error,
  })),
  on(organizationActions.addSection, (state, { section }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.addSectionSuccess, (state, { section }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.addSectionFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.updateSection, (state, { section }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.updateSectionSuccess, (state, { section }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.updateSectionFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  })),
  on(organizationActions.deleteSection, (state, { id }) => ({
    ...state,
    pending: true,
    error: null,
  })),
  on(organizationActions.deleteSectionSuccess, (state, { message }) => ({
    ...state,
    pending: false,
    error: null,
  })),
  on(organizationActions.deleteSectionFailure, (state, { error }) => ({
    ...state,
    pending: false,
    error,
  }))
);

export function sectionsReducer(state: any, action: any) {
  return _sectionsReducer(state, action);
}
