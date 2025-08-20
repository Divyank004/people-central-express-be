export interface JWTPayload {
  userId: number;
  userName: string;
}

export interface UserResult {
  name: string;
  username?: string;
  password?: string;
  user_id?: number;
  org_name?: string;
  employee_role?: string;
  no_vacation_days_left?: number;
  employee_id?: number;
}
