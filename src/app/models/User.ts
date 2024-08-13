import { ApplicationRole } from "./Role";

/**
 * Represents the response object for a user.
 */
export interface UserResposne {
  name: string;
  userName: string;
  email: string;
  role: ApplicationRole;
  token: string;
}

/**
 * Represents the login form values.
 */
export interface LoginFormValues {
  email: string;
  password: string;
}

/**
 * Represents the values required to change a user's password.
 */
export interface ChangePasswordValues {
  email: string;
  currentPassword: string;
  newPassword: string;
}

/**
 * Represents the values required to reset a user's password.
 */
export interface ResetPasswordValues {
  email: string;
  password: string;
  confirmPassword: string;
  token: string;
}
