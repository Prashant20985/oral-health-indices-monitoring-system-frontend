import { Student } from "./ApplicationUser";
import { Exam } from "./StudentExam";

export interface StudentGroup {
  id: string;
  groupName: string;
  students: Student[];
}

export interface GroupWithExams {
  id: string;
  groupName: string;
  teacher: string;
  exams: Exam[];
}
