import { Exam } from "./StudentExam";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
}

export interface PaginatedStudentNotInGroupList {
  students: Student[];
  totalStudents: number;
}

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
