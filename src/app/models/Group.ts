import { Student } from "./ApplicationUser";
import { Exam } from "./StudentExam";

/**
 * Represents a student group.
 */
export interface StudentGroup {
  id: string;
  groupName: string;
  students: Student[];
}

/**
 * Represents a group with exams.
 */
export interface GroupWithExams {
  id: string;
  groupName: string;
  teacher: string;
  exams: Exam[];
}
