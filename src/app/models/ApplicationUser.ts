import { ApplicationRole } from "./Role";

/**
 * Represents the type of a user.
 * Possible values are "RegularUser" and "GuestUser".
 */
export type UserType = "RegularUser" | "GuestUser";

/**
 * Represents a paginated list of application users.
 */
export interface PaginatedApplicationUserList {
  users: ApplicationUser[];
  totalUsersCount: number;
}

/**
 * Represents a paginated list of students.
 */
export interface PaginatedStudentList {
  students: Student[];
  totalStudents: number;
}

/**
 * Represents a student.
 */
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

/**
 * Represents an application user.
 */
export interface ApplicationUser {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isAccountActive: boolean;
  guestUserComment: string;
  deleteUserComment: string;
  createdAt: string;
  deletedAt: string;
  role: ApplicationRole;
  phoneNumber: string;
  userType: UserType;
}

/**
 * Represents the form values for an application user.
 */
export interface ApplicationUserFormValues {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  guestUserComment?: string;
  role: ApplicationRole;
}

/**
 * Represents a supervisor.
 */
export interface Supervisor {
  id: string;
  doctorName: string;
}
