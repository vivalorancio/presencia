export interface User {
  id: number;
  username: string;
  employee_id: number;
  is_blocked: boolean;
  is_admin: boolean;
  is_supervisor: boolean;
}

export interface UserResource {
  data: User;
}
