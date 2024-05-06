import { makeAutoObservable, reaction, runInAction } from "mobx";
import { StudentGroup, Student } from "../models/Group";
import axiosAgent from "../api/axiosAgent";
import {
  ResearchGroup,
  ResearchGroupFormValues,
  ResearchGroupPatient,
} from "../models/ResearchGroup";

export default class DentistTeacherStore {
  studentsNotInGroup: Student[] = [];
  studentGroups: StudentGroup[] = [];
  researchGroups: ResearchGroup[] = [];
  patientsNotInResearchGroup: ResearchGroupPatient[] = [];
  researchGroupName: string = "";
  patientName: string = "";
  email: string = "";
  selectedResearchGroup: ResearchGroup | undefined;
  selectedStudentGroup: StudentGroup | undefined;

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
      () => ({ patientName: this.patientName, email: this.email }),
      () => {
        this.setPatientsNotInResearchGroup([]);
        this.getPatientsNotInResearchGroup();
      }
    );
  }

  get patientsNotInGroupParams() {
    const params = new URLSearchParams();
    params.append("patientName", this.patientName);
    params.append("email", this.email);
    return params;
  }

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

  setStudentsNotInGroup = (students: Student[]) => {
    this.studentsNotInGroup = students;
  };

  setStudentGroups = (groups: StudentGroup[]) => {
    this.studentGroups = groups;
  };

  setResearchGroups = (researchGroups: ResearchGroup[]) => {
    this.researchGroups = researchGroups;
  };

  setPatientsNotInResearchGroup = (patients: ResearchGroupPatient[]) => {
    this.patientsNotInResearchGroup = patients;
  };

  private getReseatchGroupDetails = (researchGroupId: string) => {
    return this.researchGroups.find((rg) => rg.id === researchGroupId);
  };

  private getStudentGroupDetails = (studentGroupId: string) => {
    return this.studentGroups.find((sg) => sg.id === studentGroupId);
  };

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
          groupId
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
    this.loading.studentGroups = false;
    const studentGroup = this.getStudentGroupDetails(studentGroupId);
    if (studentGroup)
      runInAction(() => this.setSelectedStudentGroup(studentGroup));
    return studentGroup;
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
          this.patientsNotInGroupParams
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
        this.patientsNotInResearchGroup =
          this.patientsNotInResearchGroup.filter((p) => p.id !== patient.id);
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
        this.patientsNotInResearchGroup.push(patient);
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
}
