import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Group, Student } from "../models/Group";
import axiosAgent from "../api/axiosAgent";
import {
  ResearchGroup,
  ResearchGroupFormValues,
  ResearchGroupPatient,
} from "../models/ResearchGroup";

export default class DentistTeacherStore {
  studentsNotInGroup: Student[] = [];
  groups: Group[] = [];
  researchGroups: ResearchGroup[] = [];
  patientsNotInResearchGroup: ResearchGroupPatient[] = [];
  researchGroupName: string = "";
  patientName: string = "";
  email: string = "";

  loading = {
    createGroup: false,
    addStudentToGroup: false,
    removeStudentFromGroup: false,
    deleteGroup: false,
    updateGroupName: false,
    studentsNotInGroup: false,
    groups: false,
    researchGroups: false,
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

  setStudentsNotInGroup = (students: Student[]) => {
    this.studentsNotInGroup = students;
  };

  setGroups = (groups: Group[]) => {
    this.groups = groups;
  };

  setResearchGroups = (researchGroups: ResearchGroup[]) => {
    this.researchGroups = researchGroups;
  };

  setPatientsNotInResearchGroup = (patients: ResearchGroupPatient[]) => {
    this.patientsNotInResearchGroup = patients;
  };

  createGroup = async (groupName: string) => {
    this.loading.createGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.createGroup(groupName);
      runInAction(() => {
        this.getGroups();
        this.loading.createGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.createGroup = false));
      throw error;
    }
  };

  addStudentToGroup = async (groupId: string, student: Student) => {
    this.loading.addStudentToGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.addStudentToGroup(
        groupId,
        student.id
      );

      runInAction(() => {
        const groupIndex = this.groups.findIndex((g) => g.id === groupId);

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.groups[groupIndex] };
          updatedGroup.students.push(student);
          const updatedGroups = [...this.groups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setGroups(updatedGroups);
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

  removeStudentFromGroup = async (groupId: string, studentId: string) => {
    this.loading.removeStudentFromGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.removeStudentFromGroup(
        groupId,
        studentId
      );
      runInAction(() => {
        const groupIndex = this.groups.findIndex((g) => g.id === groupId);

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.groups[groupIndex] };

          updatedGroup.students = updatedGroup.students.filter(
            (student) => student.id !== studentId
          );

          const updatedGroups = [...this.groups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setGroups(updatedGroups);
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

  deleteGroup = async (groupId: string) => {
    this.loading.deleteGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.deleteGroup(groupId);

      runInAction(() => {
        const updatedGroups = this.groups.filter(
          (group) => group.id !== groupId
        );
        this.setGroups(updatedGroups);
        this.loading.deleteGroup = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading.deleteGroup = false;
      });
      throw error;
    }
  };

  updateGroupName = async (groupId: string, groupName: string) => {
    this.loading.updateGroupName = true;
    try {
      await axiosAgent.DentistTeacherOperations.updateGroupName(
        groupId,
        groupName
      );
      runInAction(() => {
        const groupIndex = this.groups.findIndex((g) => g.id === groupId);

        if (groupIndex !== -1) {
          const updatedGroup = { ...this.groups[groupIndex] };
          updatedGroup.groupName = groupName;
          const updatedGroups = [...this.groups];
          updatedGroups[groupIndex] = updatedGroup;
          this.setGroups(updatedGroups);
        }
        this.loading.updateGroupName = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.updateGroupName = false));
      throw error;
    }
  };

  getStudentsNotInGroup = async (groupId: string) => {
    this.loading.studentsNotInGroup = true;
    try {
      const result =
        await axiosAgent.DentistTeacherOperations.getStudentsNotInGroup(
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

  getGroups = async () => {
    this.loading.groups = true;
    try {
      const result = await axiosAgent.DentistTeacherOperations.getGroups();
      runInAction(() => {
        this.setGroups(result);
        this.loading.groups = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => (this.loading.groups = false));
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
        const researchGroupIndex = this.researchGroups.findIndex(
          (rg) => rg.id === researchGroupId
        );

        if (researchGroupIndex !== -1) {
          const updatedResearchGroup = {
            ...this.researchGroups[researchGroupIndex],
          };
          updatedResearchGroup.patients.push(patient);
          const updatedResearchGroups = [...this.researchGroups];
          updatedResearchGroups[researchGroupIndex] = updatedResearchGroup;
          this.setResearchGroups(updatedResearchGroups);
        }

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

  removePatientFromResearchGroup = async (
    patientId: string,
    researchGroupId: string
  ) => {
    this.loading.removePatientFromResearchGroup = true;
    try {
      await axiosAgent.DentistTeacherOperations.removePatientFromResearchGroup(
        patientId
      );
      runInAction(() => {
        const researchGroupIndex = this.researchGroups.findIndex(
          (rg) => rg.id === researchGroupId
        );

        if (researchGroupIndex !== -1) {
          const updatedResearchGroup = {
            ...this.researchGroups[researchGroupIndex],
          };

          updatedResearchGroup.patients = updatedResearchGroup.patients.filter(
            (patient) => patient.id !== patientId
          );

          const updatedResearchGroups = [...this.researchGroups];
          updatedResearchGroups[researchGroupIndex] = updatedResearchGroup;
          this.setResearchGroups(updatedResearchGroups);
        }
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
