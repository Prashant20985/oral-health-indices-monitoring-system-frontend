import { ApplicationRole } from "./Role";

export interface UserResposne {
  name: string;
  userName: string;
  email: string;
  role: ApplicationRole;
  token: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface ChangePasswordValues {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface ResetPasswordValues {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}
