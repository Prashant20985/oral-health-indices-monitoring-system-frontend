import { makeAutoObservable, runInAction } from "mobx";
import { GroupWithExams } from "../models/Group";
import axiosAgent from "../api/axiosAgent";
import { Exam } from "../models/StudentExam";
import { Supervisor } from "../models/ApplicationUser";

export default class StudentStore {
  studentGroupsWithExams: GroupWithExams[] = [];
  studentGroupDetails: GroupWithExams | null = null;
  supervisors: Supervisor[] = [];

  loading = {
    studentGroupsWithExams: false,
    studentGroupDetails: false,
    supervisors: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setStudentGroupsWithExams(groups: GroupWithExams[]) {
    this.studentGroupsWithExams = groups;
  }

  setStudentGroupDetails(group: GroupWithExams | null) {
    this.studentGroupDetails = group;
  }

  setSupervisors(supervisors: Supervisor[]) {
    this.supervisors = supervisors;
  }

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

  getStudentExamsByDate = () => {
    if (!this.studentGroupDetails) return [];
    return Array.from(this.studentGroupDetails.exams).sort(
      (a, b) =>
        new Date(a.dateOfExamination).getTime() -
        new Date(b.dateOfExamination).getTime()
    );
  };

  get getTop3ExamsByDate() {
    return this.studentGroupsWithExams
      .flatMap((group) => group.exams)
      .sort(
        (a, b) =>
          new Date(a.dateOfExamination).getTime() -
          new Date(b.dateOfExamination).getTime()
      )
      .filter((exam) => new Date(exam.dateOfExamination) >= new Date())
      .slice(0, 3);
  }

  getStudentGroup = (groupId: string) => {
    return this.studentGroupsWithExams.find((group) => group.id === groupId);
  };

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
