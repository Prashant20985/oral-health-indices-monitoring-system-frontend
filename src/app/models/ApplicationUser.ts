import { ApplicationRole } from "./Role";

export type UserType = "RegularUser" | "GuestUser";

export interface PaginatedApplicationUserList {
  users: ApplicationUser[];
  totalUsersCount: number;
}

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

export interface ApplicationUserFormValues {
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  guestUserComment?: string;
  role: ApplicationRole;
}

export interface Supervisor {
  id: string;
  doctorName: string;
}
