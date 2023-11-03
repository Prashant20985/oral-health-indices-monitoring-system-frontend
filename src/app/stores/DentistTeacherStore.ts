import { makeAutoObservable, runInAction } from "mobx";
import { Group, Student } from "../models/Group";
import axiosAgent from "../api/axiosAgent";

export default class DentistTeacherStore {
  studentsNotInGroup: Student[] = [];
  groups: Group[] = [];

  loading = {
    createGroup: false,
    addStudentToGroup: false,
    removeStudentFromGroup: false,
    deleteGroup: false,
    updateGroupName: false,
    studentsNotInGroup: false,
    groups: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setStudentsNotInGroup = (students: Student[]) => {
    this.studentsNotInGroup = students;
  };

  setGroups = (groups: Group[]) => {
    this.groups = groups;
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
}
