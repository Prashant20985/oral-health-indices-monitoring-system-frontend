import { ApplicationRole } from "./Role";

type UserType = "RegularUser" | "GuestUser";

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
  lastName: string;
  email: string;
  phoneNumber: string;
  guestUserComment?: string;
}
