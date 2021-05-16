export interface DisplayResourceCollection {
  page: string;
  per_page: string;
  sort_field: string;
  sort_direction: string;
}

export interface DisplayBookingsCollection {
  range: string;
  date: string;
  // page: string;
  // per_page: string;
  // start_date: string;
  // end_date: string;
}

export interface ListHeader {
  text: string;
  sort_by: string;
  hides: boolean;
  search_by: string;
}
