import { makeAutoObservable, runInAction } from "mobx";
import { GroupWithExams } from "../models/Group";
import axiosAgent from "../api/axiosAgent";
import { Exam } from "../models/StudentExam";
import { Supervisor } from "../models/ApplicationUser";

/**
 * Represents a store for managing student-related data.
 */
export default class StudentStore {
  // Represents the studentGroupsWithExams property.
  studentGroupsWithExams: GroupWithExams[] = [];

  // Represents the studentGroupDetails property.
  studentGroupDetails: GroupWithExams | null = null;

  // Represents the supervisors property.
  supervisors: Supervisor[] = [];

  // Represents the loading state of various operations.
  loading = {
    studentGroupsWithExams: false,
    studentGroupDetails: false,
    supervisors: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Sets the studentGroupsWithExams property.
  setStudentGroupsWithExams(groups: GroupWithExams[]) {
    this.studentGroupsWithExams = groups;
  }

  // Sets the studentGroupDetails property.
  setStudentGroupDetails(group: GroupWithExams | null) {
    this.studentGroupDetails = group;
  }

  // Sets the supervisors property.
  setSupervisors(supervisors: Supervisor[]) {
    this.supervisors = supervisors;
  }

  /**
   * Returns an array of grouped student exams.
   * Each group represents exams that occurred in the same year and month.
   * The array is sorted in ascending order based on the year and month.
   * @returns {Array<[string, Exam[]]>} An array of tuples, where the first element is the year and month in the format "YYYY-MM",
   * and the second element is an array of exams that occurred in that year and month.
   */
  get groupedStudentExams() {
    if (!this.studentGroupDetails) return [];
    return Object.entries(
      this.getStudentExamsByDate().reduce((studentExams, exam) => {
        const year = new Date(exam.dateOfExamination).getFullYear();
        const month = (new Date(exam.dateOfExamination).getMonth() + 1)
          .toString()
          .padStart(2, "0");

        const yearMonth = `${year}-${month}`;

        studentExams[yearMonth] = studentExams[yearMonth]
          ? [...studentExams[yearMonth], exam]
          : [exam];

        return studentExams;
      }, {} as { [key: string]: Exam[] })
    );
  }

  /**
   * Retrieves the student exams sorted by date of examination.
   * 
   * @returns An array of student exams sorted by date of examination.
   */
  getStudentExamsByDate = () => {
    if (!this.studentGroupDetails) return [];
    return Array.from(this.studentGroupDetails.exams).sort(
      (a, b) =>
        new Date(a.dateOfExamination).getTime() -
        new Date(b.dateOfExamination).getTime()
    );
  };

  // Retrieves a student group with exams by its ID.
  getStudentGroup = (groupId: string) => {
    return this.studentGroupsWithExams.find((group) => group.id === groupId);
  };

  /**
   * Fetches student groups with exams.
   * 
   * @returns {Promise<void>} A promise that resolves when the student groups with exams are fetched.
   * @throws {Error} If an error occurs while fetching the student groups with exams.
   */
  fetchStudentGroupsWithExams = async () => {
    this.loading.studentGroupsWithExams = true;
    try {
      const studentGroupsWithExams =
        await axiosAgent.StudentOperations.getStudentGroupsWithExams();
      runInAction(() => {
        this.setStudentGroupsWithExams(studentGroupsWithExams);
        this.loading.studentGroupsWithExams = false;
      });
    } catch (error) {
      this.loading.studentGroupsWithExams = false;
      console.log(error);
    }
  };

  /**
   * Fetches the details of a student group.
   * 
   * @param groupId - The ID of the group to fetch details for.
   * @returns A promise that resolves to the student group details.
   * @throws If an error occurs during the fetch operation.
   */
  fetchStudentGroupDetails = async (groupId: string) => {
    this.loading.studentGroupDetails = true;
    const group = this.getStudentGroup(groupId);
    if (group) {
      runInAction(() => {
        this.setStudentGroupDetails(group);
        this.loading.studentGroupDetails = false;
      });
      return;
    }
    try {
      const studentGroupDetails =
        await axiosAgent.StudentOperations.getStudentGroupDetailsWithExams(
          groupId
        );
      runInAction(() => {
        this.setStudentGroupDetails(studentGroupDetails);
        this.loading.studentGroupDetails = false;
      });
    } catch (error) {
      this.loading.studentGroupDetails = false;
      console.log(error);
    }
  };

  /**
   * Fetches supervisors from the server.
   * @returns {Promise<void>} A promise that resolves when the supervisors are fetched successfully.
   * @throws {Error} If an error occurs while fetching the supervisors.
   */
  fetchSupervisors = async () => {
    this.loading.supervisors = true;
    try {
      const supervisors = await axiosAgent.StudentOperations.getSupervisors();
      runInAction(() => {
        this.setSupervisors(supervisors);
        this.loading.supervisors = false;
      });
    } catch (error) {
      this.loading.supervisors = false;
      console.log(error);
      throw error;
    }
  };
}
