import { makeAutoObservable, reaction, runInAction } from "mobx";
import { StudentGroup } from "../models/Group";
import axiosAgent from "../api/axiosAgent";
import {
  PaginatedResearchGroupPatients,
  ResearchGroup,
  ResearchGroupFormValues,
  ResearchGroupPatient,
} from "../models/ResearchGroup";
import { PaginatedStudentList, Student } from "../models/ApplicationUser";

export default class DentistTeacherStore {
  studentsNotInGroup: PaginatedStudentList = {
    students: [],
    totalStudents: 0,
  };
  studentGroups: StudentGroup[] = [];
  researchGroups: ResearchGroup[] = [];
  patientsNotInResearchGroup: PaginatedResearchGroupPatients = {
    totalNumberOfPatients: 0,
    patients: [],
  };
  selectedResearchGroup: ResearchGroup | undefined;
  selectedStudentGroup: StudentGroup | undefined;

  supervisedStudents: PaginatedStudentList = { totalStudents: 0, students: [] };
  unsupervisedStudents: PaginatedStudentList = {
    totalStudents: 0,
    students: [],
  };

  researchGroupName: string = "";

  patientnNotInResearchGroupSearchParams: {
    patientName: string;
    email: string;
    page: number;
    pageSize: number;
  } = {
    patientName: "",
    email: "",
    page: 0,
    pageSize: 20,
  };

  studentsNotInGroupSearchParams: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  } = {
    studentName: "",
    email: "",
    page: 0,
    pageSize: 20,
  };

  supervisedStudentsSearchParam: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  } = {
    studentName: "",
    email: "",
    page: 0,
    pageSize: 20,
  };

  unsupervisedStudentsSearchParam: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  } = {
    studentName: "",
    email: "",
    page: 0,
    pageSize: 20,
  };

  loading = {
    createStudentGroup: false,
    addStudentToGroup: false,
    removeStudentFromGroup: false,
    deleteStudentGroup: false,
    updateStudentGroupName: false,
    studentsNotInGroup: false,
    studentGroups: false,
    studentGroupDetails: false,
    researchGroups: false,
    researchGroupDetails: false,
    patientsNotInResearchGroup: false,
    createResearchGroup: false,
    deleteResearchGroup: false,
    updateResearchGroup: false,
    addPatientToResearchGroup: false,
    removePatientFromResearchGroup: false,
    superviseStudent: false,
    unsuperviseStudent: false,
    supervisedStudents: false,
    unsupervisedStudents: false,
  };

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({ researchGroupName: this.researchGroupName }),
      () => {
        this.setResearchGroups([]);
        this.getResearchGroups();
      }
    );

    reaction(
      () => ({
        patientName: this.patientnNotInResearchGroupSearchParams.patientName,
        email: this.patientnNotInResearchGroupSearchParams.email,
        page: this.patientnNotInResearchGroupSearchParams.page,
        pageSize: this.patientnNotInResearchGroupSearchParams.pageSize,
      }),
      () => {
        this.getPatientsNotInResearchGroup();
      }
    );

    reaction(
      () => ({
        studentName: this.studentsNotInGroupSearchParams.studentName,
        email: this.studentsNotInGroupSearchParams.email,
        page: this.studentsNotInGroupSearchParams.page,
        pageSize: this.studentsNotInGroupSearchParams.pageSize,
      }),
      () => {
        this.getStudentsNotInStudentGroup(this.selectedStudentGroup!.id);
      }
    );

    reaction(
      () => ({
        studentName: this.supervisedStudentsSearchParam.studentName,
        email: this.supervisedStudentsSearchParam.email,
        page: this.supervisedStudentsSearchParam.page,
        pageSize: this.supervisedStudentsSearchParam.pageSize,
      }),
      () => {
        this.fetchSupervisedStudents();
      }
    );

    reaction(
      () => ({
        studentName: this.unsupervisedStudentsSearchParam.studentName,
        email: this.unsupervisedStudentsSearchParam.email,
        page: this.unsupervisedStudentsSearchParam.page,
        pageSize: this.unsupervisedStudentsSearchParam.pageSize,
      }),
      () => {
        this.fetchUnsupervisedStudents();
      }
    );
  }

  get patientsNotInResearchGroupParams() {
    const params = new URLSearchParams();
    params.append(
      "patientName",
      this.patientnNotInResearchGroupSearchParams.patientName
    );
    params.append("email", this.patientnNotInResearchGroupSearchParams.email);
    params.append(
      "page",
      this.patientnNotInResearchGroupSearchParams.page.toString()
    );
    params.append(
      "pageSize",
      this.patientnNotInResearchGroupSearchParams.pageSize.toString()
    );
    return params;
  }

  get studentsNotInGroupParams() {
    const params = new URLSearchParams();
    params.append(
      "studentName",
      this.studentsNotInGroupSearchParams.studentName
    );
    params.append("email", this.studentsNotInGroupSearchParams.email);
    params.append("page", this.studentsNotInGroupSearchParams.page.toString());
    params.append(
      "pageSize",
      this.studentsNotInGroupSearchParams.pageSize.toString()
    );
    return params;
  }

  get supervisedStudentsParams() {
    const params = new URLSearchParams();
    params.append(
      "studentName",
      this.supervisedStudentsSearchParam.studentName
    );
    params.append("email", this.supervisedStudentsSearchParam.email);
    params.append("page", this.supervisedStudentsSearchParam.page.toString());
    params.append(
      "pageSize",
      this.supervisedStudentsSearchParam.pageSize.toString()
    );
    return params;
  }

  get unsupervisedStudentsParams() {
    const params = new URLSearchParams();
    params.append(
      "studentName",
      this.unsupervisedStudentsSearchParam.studentName
    );
    params.append("email", this.unsupervisedStudentsSearchParam.email);
    params.append("page", this.unsupervisedStudentsSearchParam.page.toString());
    params.append(
      "pageSize",
      this.unsupervisedStudentsSearchParam.pageSize.toString()
    );
    return params;
  }

  setSupervisedStudentSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.supervisedStudentsSearchParam = params;
  };

  setUnsupervisedStudentSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.unsupervisedStudentsSearchParam = params;
  };

  setStudentsNotInGroupSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.studentsNotInGroupSearchParams = params;
  };

  setSelectedStudentGroup = (studentGroup: StudentGroup) => {
    this.selectedStudentGroup = studentGroup;
  };

  setSelectedResearchGroup = (researchGroup: ResearchGroup | undefined) => {
    this.selectedResearchGroup = researchGroup;
  };

  clearSelectedResearchGroup = () => {
    this.selectedResearchGroup = undefined;
  };

  clearSelectedStudentGroup = () => {
    this.selectedStudentGroup = undefined;
  };

  setResearchGroupName = (researchGroupName: string) => {
    this.researchGroupName = researchGroupName;
  };

  setStudentsNotInGroup = (students: PaginatedStudentList) => {
    this.studentsNotInGroup = students;
  };

  setStudentGroups = (groups: StudentGroup[]) => {
    this.studentGroups = groups;
  };

  setResearchGroups = (researchGroups: ResearchGroup[]) => {
    this.researchGroups = researchGroups;
  };

  setPatientsNotInResearchGroup = (
    patients: PaginatedResearchGroupPatients
  ) => {
    this.patientsNotInResearchGroup = patients;
  };

  setSupervisedStudents = (students: PaginatedStudentList) => {
    this.supervisedStudents = students;
  };

  setUnsupervisedStudents = (students: PaginatedStudentList) => {
    this.unsupervisedStudents = students;
  };

  private getReseatchGroupDetails = (researchGroupId: string) => {
    return this.researchGroups.find((rg) => rg.id === researchGroupId);
  };

  private getStudentGroupDetails = (studentGroupId: string) => {
    return this.studentGroups.find((sg) => sg.id === studentGroupId);
  };

  private supervisedStudent = (studentId: string) => {
    return this.supervisedStudents.students.find(
      (student) => student.id === studentId
    );
  };

  private unsupervisedStudent = (studentId: string) => {
    return this.unsupervisedStudents.students.find(
      (student) => student.id === studentId
    );
  };

  get supervisedStudentNameEmailWithId() {
    return this.supervisedStudents.students.map((student) => ({
      name: `${student.firstName} ${student.lastName} (${student.email})`,
      id: student.id,
    }));
  }

  createStudentGroup = async (groupName: string) => {
    this.loading.createStudentGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.createStudentGroup(groupName);
      runInAction(() => {
        this.getStudentGroups();
        this.loading.createStudentGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.createStudentGroup = false));
      throw error;
    }
  };

  addStudentToStudentGroup = async (groupId: string, student: Student) => {
    this.loading.addStudentToGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.addStudentToStudentGroup(
        groupId,
        student.id
      );

      runInAction(() => {
        const groupIndex = this.studentGroups.findIndex(
          (g) => g.id === groupId
        );

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.studentGroups[groupIndex] };
          updatedGroup.students.push(student);
          const updatedGroups = [...this.studentGroups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setStudentGroups(updatedGroups);
        }
        this.loading.addStudentToGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.addStudentToGroup = false;
      });
      throw error;
    }
  };

  removeStudentFromStudentGroup = async (
    groupId: string,
    studentId: string
  ) => {
    this.loading.removeStudentFromGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.removeStudentFromStudentGroup(
        groupId,
        studentId
      );
      runInAction(() => {
        const groupIndex = this.studentGroups.findIndex(
          (g) => g.id === groupId
        );

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.studentGroups[groupIndex] };

          updatedGroup.students = updatedGroup.students.filter(
            (student) => student.id !== studentId
          );

          const updatedGroups = [...this.studentGroups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setStudentGroups(updatedGroups);
        }
        this.loading.removeStudentFromGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.removeStudentFromGroup = false;
      });
      throw error;
    }
  };

  deleteStudentGroup = async (groupId: string) => {
    this.loading.deleteStudentGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.deleteStudentGroup(groupId);

      runInAction(() => {
        const updatedGroups = this.studentGroups.filter(
          (group) => group.id !== groupId
        );
        this.setStudentGroups(updatedGroups);
        this.loading.deleteStudentGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deleteStudentGroup = false;
      });
      throw error;
    }
  };

  updateStudentGroupName = async (groupId: string, groupName: string) => {
    this.loading.updateStudentGroupName = true;
    try {
      await axiosAgent.DentistTeacherOperations.updateStudentGroupName(
        groupId,
        groupName
      );
      runInAction(() => {
        const groupIndex = this.studentGroups.findIndex(
          (g) => g.id === groupId
        );

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.studentGroups[groupIndex] };
          updatedGroup.groupName = groupName;
          const updatedGroups = [...this.studentGroups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setStudentGroups(updatedGroups);
        }
        if (this.selectedStudentGroup) {
          this.selectedStudentGroup.groupName = groupName;
        }
        this.loading.updateStudentGroupName = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateStudentGroupName = false));
      throw error;
    }
  };

  getStudentsNotInStudentGroup = async (groupId: string) => {
    this.loading.studentsNotInGroup = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getStudentsNotInStudentGroup(
          groupId,
          this.studentsNotInGroupParams
        );
      runInAction(() => {
        this.setStudentsNotInGroup(result);
        this.loading.studentsNotInGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.studentsNotInGroup = false));
    }
  };

  getStudentGroups = async () => {
    this.loading.studentGroups = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getStudentGroups();
      runInAction(() => {
        this.setStudentGroups(result);
        this.loading.studentGroups = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.studentGroups = false));
    }
  };

  getStudentGroup = async (studentGroupId: string) => {
    const studentGroup = this.getStudentGroupDetails(studentGroupId);
    if (studentGroup) {
      runInAction(() => this.setSelectedStudentGroup(studentGroup));
      return studentGroup;
    } else {
      this.loading.studentGroupDetails = true;
      try {
        const result =
          await axiosAgent.DentistTeacherOperations.getStudentGroup(
            studentGroupId
          );
        runInAction(() => {
          this.setSelectedStudentGroup(result);
          this.loading.studentGroupDetails = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loading.studentGroupDetails = false));
      }
    }
  };

  getResearchGroups = async () => {
    this.loading.researchGroups = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getResearchGroups(
          this.researchGroupName
        );
      runInAction(() => {
        this.setResearchGroups(result);
        this.loading.researchGroups = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.researchGroups = false));
    }
  };

  getResearchGroup = async (researchGroupId: string) => {
    const researchGroup = this.getReseatchGroupDetails(researchGroupId);
    if (researchGroup) {
      runInAction(() => this.setSelectedResearchGroup(researchGroup));
      return researchGroup;
    } else {
      this.loading.researchGroupDetails = true;
      try {
        const result =
          await axiosAgent.DentistTeacherOperations.getResearchGroup(
            researchGroupId
          );
        runInAction(() => {
          this.setSelectedResearchGroup(result);
          this.loading.researchGroupDetails = false;
        });
      } catch (error) {
        console.log(error);
        runInAction(() => (this.loading.researchGroupDetails = false));
      }
    }
  };

  getPatientsNotInResearchGroup = async () => {
    this.loading.patientsNotInResearchGroup = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getPatientsNotInResearchGroup(
          this.patientsNotInResearchGroupParams
        );
      runInAction(() => {
        this.setPatientsNotInResearchGroup(result);
        this.loading.patientsNotInResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.patientsNotInResearchGroup = false));
    }
  };

  createResearchGroup = async (values: ResearchGroupFormValues) => {
    this.loading.createResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.createResearchGroup(values);
      runInAction(() => {
        this.getResearchGroups();
        this.loading.createResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.createResearchGroup = false));
      throw error;
    }
  };

  deleteResearchGroup = async (researchGroupId: string) => {
    this.loading.deleteResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.deleteResearchGroup(
        researchGroupId
      );
      runInAction(() => {
        const updatedResearchGroups = this.researchGroups.filter(
          (researchGroup) => researchGroup.id !== researchGroupId
        );
        this.setResearchGroups(updatedResearchGroups);
        this.loading.deleteResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.deleteResearchGroup = false));
      throw error;
    }
  };

  updateResearchGroup = async (
    researchGroupId: string,
    values: ResearchGroupFormValues
  ) => {
    this.loading.updateResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.updateResearchGroup(
        researchGroupId,
        values
      );
      runInAction(() => {
        const researchGroupIndex = this.researchGroups.findIndex(
          (rg) => rg.id === researchGroupId
        );

        if (researchGroupIndex !== -1) {
          const updatedResearchGroup = {
            ...this.researchGroups[researchGroupIndex],
          };
          updatedResearchGroup.groupName = values.groupName;
          updatedResearchGroup.description = values.description;
          const updatedResearchGroups = [...this.researchGroups];
          updatedResearchGroups[researchGroupIndex] = updatedResearchGroup;
          this.setResearchGroups(updatedResearchGroups);
        }

        if (this.selectedResearchGroup) {
          this.selectedResearchGroup.groupName = values.groupName;
          this.selectedResearchGroup.description = values.description;
        }

        this.loading.updateResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateResearchGroup = false));
      throw error;
    }
  };

  addPatientToResearchGroup = async (
    researchGroupId: string,
    patient: ResearchGroupPatient
  ) => {
    this.loading.addPatientToResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.addPatientToResearchGroup(
        researchGroupId,
        patient.id
      );

      runInAction(() => {
        this.selectedResearchGroup?.patients.push(patient);
        this.patientsNotInResearchGroup.patients =
          this.patientsNotInResearchGroup.patients.filter(
            (p) => p.id !== patient.id
          );
        this.patientsNotInResearchGroup.totalNumberOfPatients--;
        this.loading.addPatientToResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.addPatientToResearchGroup = false;
      });
      throw error;
    }
  };

  removePatientFromResearchGroup = async (patient: ResearchGroupPatient) => {
    this.loading.removePatientFromResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.removePatientFromResearchGroup(
        patient.id
      );
      runInAction(() => {
        const updatedResearchGroup =
          this.selectedResearchGroup?.patients.filter(
            (p) => p.id !== patient.id
          );
        this.patientsNotInResearchGroup.patients.push(patient);
        this.patientsNotInResearchGroup.totalNumberOfPatients++;
        this.selectedResearchGroup!.patients = updatedResearchGroup!;
        this.loading.removePatientFromResearchGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.removePatientFromResearchGroup = false;
      });
      throw error;
    }
  };

  fetchSupervisedStudents = async () => {
    this.loading.supervisedStudents = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getSupervisedStudents(
          this.supervisedStudentsParams
        );
      runInAction(() => {
        this.setSupervisedStudents(result);
        this.loading.supervisedStudents = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.supervisedStudents = false));
    }
  };

  fetchUnsupervisedStudents = async () => {
    this.loading.unsupervisedStudents = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getUnsupervisedStudents(
          this.unsupervisedStudentsParams
        );
      runInAction(() => {
        this.setUnsupervisedStudents(result);
        this.loading.unsupervisedStudents = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.unsupervisedStudents = false));
    }
  };

  superviseStudent = async (studentId: string) => {
    this.loading.superviseStudent = true;
    try {
      await axiosAgent.DentistTeacherOperations.superviseStudent(studentId);
      runInAction(() => {
        const student = this.unsupervisedStudent(studentId);
        if (student) {
          this.supervisedStudents.students.push(student);
        }
        this.unsupervisedStudents.students =
          this.unsupervisedStudents.students.filter(
            (student) => student.id !== studentId
          );
        this.supervisedStudents.totalStudents++;
        this.unsupervisedStudents.totalStudents--;
        this.loading.superviseStudent = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.superviseStudent = false));
      throw error;
    }
  };

  unsuperviseStudent = async (studentId: string) => {
    this.loading.unsuperviseStudent = true;
    try {
      await axiosAgent.DentistTeacherOperations.unsuperviseStudent(studentId);
      runInAction(() => {
        const student = this.supervisedStudent(studentId);
        if (student) {
          this.unsupervisedStudents.students.push(student);
        }
        this.supervisedStudents.students =
          this.supervisedStudents.students.filter(
            (student) => student.id !== studentId
          );
        this.supervisedStudents.totalStudents--;
        this.unsupervisedStudents.totalStudents++;
        this.loading.unsuperviseStudent = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.unsuperviseStudent = false));
      throw error;
    }
  };
}
