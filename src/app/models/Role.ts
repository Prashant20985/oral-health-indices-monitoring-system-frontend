/**
 * Represents the available application roles.
 * 
 * - `Admin`: Represents an administrator role.
 * - `Student`: Represents a student role.
 * - `Dentist_Teacher_Researcher`: Represents a role for dentists, teachers, and researchers.
 * - `Dentist_Teacher_Examiner`: Represents a role for dentists, teachers, and examiners.
 */
export type ApplicationRole =
  | "Admin"
  | "Student"
  | "Dentist_Teacher_Researcher"
  | "Dentist_Teacher_Examiner";

/**
 * Represents the available roles in the application.
 */
export const roles: ApplicationRole[] = [
  "Student",
  "Admin",
  "Dentist_Teacher_Researcher",
  "Dentist_Teacher_Examiner",
];
