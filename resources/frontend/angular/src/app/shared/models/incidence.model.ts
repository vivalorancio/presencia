export interface Incidence {
  id: number;
  code: string;
  colour: string;
  description: string;
  is_counted: boolean;
  is_absence: boolean;
}

export interface IncidenceResource {
  data: Incidence;
}

export interface IncidenceCollection {
  data: Incidence[];
  links: any;
  meta: any;
}

export interface IncidenceSearch {
  code: string;
  description: string;
}

export interface IncidencesGroup {
  id: number;
  code: string;
  description: string;
}

export interface IncidencesGroupResource {
  data: IncidencesGroup;
}

export interface IncidencesGroupCollection {
  data: IncidencesGroup[];
  links: any;
  meta: any;
}

export interface IncidencesGroupSearch {
  code: string;
  description: string;
}

export interface IncidencesGroupIncidence {
  id: number;
  incedencesgroup_id: number;
  incidence_id: number;
}

export interface IncidencesGroupIncidenceResource {
  data: IncidencesGroupIncidence;
}

export interface IncidencesGroupIncidenceCollection {
  data: IncidencesGroupIncidence[];
  links: any;
  meta: any;
}
