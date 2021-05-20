export interface Department {
  id: number;
  code: string;
  description: string;
}

export interface DepartmentResource {
  data: Department;
}

export interface DepartmentCollection {
  data: Department[];
  links: any;
  meta: any;
}

export interface DepartmentSearch {
  code: string;
  description: string;
}

export interface Area {
  id: number;
  code: string;
  description: string;
}

export interface AreaResource {
  data: Area;
}

export interface AreaCollection {
  data: Area[];
  links: any;
  meta: any;
}

export interface AreaSearch {
  code: string;
  description: string;
}

export interface Section {
  id: number;
  code: string;
  description: string;
}

export interface SectionResource {
  data: Section;
}

export interface SectionCollection {
  data: Section[];
  links: any;
  meta: any;
}

export interface SectionSearch {
  code: string;
  description: string;
}
export interface SupervisionGroup {
  id: number;
  code: string;
  description: string;
}

export interface SupervisionGroupResource {
  data: SupervisionGroup;
}

export interface SupervisionGroupCollection {
  data: SupervisionGroup[];
  links: any;
  meta: any;
}

export interface SupervisionGroupSearch {
  code: string;
  description: string;
}
