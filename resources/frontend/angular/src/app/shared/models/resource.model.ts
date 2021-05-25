export interface ListHeader {
  text: string;
  sort_by: string;
  hides: boolean;
  search_by: string;
}
export interface DisplayResourceCollection {
  page: string;
  per_page: string;
  sort_field: string;
  sort_direction: string;
}

export interface DisplayBookingsCollection {
  range: string;
  date: string;
}

export interface RequestsListHeader extends ListHeader {
  for_supevisor: boolean;
}

export interface DisplayRequestsCollection extends DisplayResourceCollection {
  type: string;
  status: string;
}
