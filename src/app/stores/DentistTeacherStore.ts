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

/**
 * Represents a store for managing dentist teacher-related data.
 */
export default class DentistTeacherStore {
  // Represents the studentsNotInGroup property.
  studentsNotInGroup: PaginatedStudentList = {
    students: [],
    totalStudents: 0,
  };

  // Represents the studentGroups property.
  studentGroups: StudentGroup[] = [];

  // Represents the researchGroups property.
  researchGroups: ResearchGroup[] = [];

  // Represents the patientsNotInResearchGroup property.
  patientsNotInResearchGroup: PaginatedResearchGroupPatients = {
    totalNumberOfPatients: 0,
    patients: [],
  };

  // Represents the selectedResearchGroup property.
  selectedResearchGroup: ResearchGroup | undefined;

  // Represents the selectedStudentGroup property.
  selectedStudentGroup: StudentGroup | undefined;

  // Represents the supervisedStudents property.
  supervisedStudents: PaginatedStudentList = { totalStudents: 0, students: [] };

  // Represents the unsupervisedStudents property.
  unsupervisedStudents: PaginatedStudentList = {
    totalStudents: 0,
    students: [],
  };

  // Represents the researchGroupName property.
  researchGroupName: string = "";

  // Represents the patient not in research group search params.
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

  // Represents the students not in group search params.
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

  // Represents the supervised students search params.
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

  // Represents the unsupervised students search params.
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

  // Represents the loading property.
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

    // Reaction to the change in researchGroupName property.
    reaction(
      () => ({ researchGroupName: this.researchGroupName }),
      () => {
        this.setResearchGroups([]);
        this.getResearchGroups();
      }
    );

    // Reaction to the change in patient not in research group search params.
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

    // Reaction to the change in students not in group search
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

    // Reaction to the change in supervised students search params.
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

    // Reaction to the change in unsupervised students search params.
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

  // Gets the URL params for the patients not in research group.
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

  // Gets the URL params for the students not in group.
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

  // Gets the URL params for the supervised students.
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

  // Gets the URL params for the unsupervised students.
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

  // Sets the supervised students search params.
  setSupervisedStudentSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.supervisedStudentsSearchParam = params;
  };

  // Sets the unsupervised students search params.
  setUnsupervisedStudentSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.unsupervisedStudentsSearchParam = params;
  };

  // Sets the student not in student group search params.
  setStudentsNotInGroupSearchParams = (params: {
    studentName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.studentsNotInGroupSearchParams = params;
  };

  // Sets the patient not in research group search params.
  setPatientNotInResearchGroupSearchParams = (params: {
    patientName: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.patientnNotInResearchGroupSearchParams = params;
  };

  // Sets the selected student group.
  setSelectedStudentGroup = (studentGroup: StudentGroup) => {
    this.selectedStudentGroup = studentGroup;
  };

  // Sets the selected research group.
  setSelectedResearchGroup = (researchGroup: ResearchGroup | undefined) => {
    this.selectedResearchGroup = researchGroup;
  };

  // Clears the selected research group.
  clearSelectedResearchGroup = () => {
    this.selectedResearchGroup = undefined;
  };

  // Clears the selected student group
  clearSelectedStudentGroup = () => {
    this.selectedStudentGroup = undefined;
  };

  // Sets the patient not in research group search params.
  setResearchGroupName = (researchGroupName: string) => {
    this.researchGroupName = researchGroupName;
  };

  // Sets the students not in group.
  setStudentsNotInGroup = (students: PaginatedStudentList) => {
    this.studentsNotInGroup = students;
  };

  // Sets the student groups.
  setStudentGroups = (groups: StudentGroup[]) => {
    this.studentGroups = groups;
  };

  // Sets the research groups.
  setResearchGroups = (researchGroups: ResearchGroup[]) => {
    this.researchGroups = researchGroups;
  };

  // Sets the patients not in research
  setPatientsNotInResearchGroup = (
    patients: PaginatedResearchGroupPatients
  ) => {
    this.patientsNotInResearchGroup = patients;
  };

  // Sets the supervised students.
  setSupervisedStudents = (students: PaginatedStudentList) => {
    this.supervisedStudents = students;
  };

  // Sets the unsupervised students
  setUnsupervisedStudents = (students: PaginatedStudentList) => {
    this.unsupervisedStudents = students;
  };

  // Gets the research group details.
  private getReseatchGroupDetails = (researchGroupId: string) => {
    return this.researchGroups.find((rg) => rg.id === researchGroupId);
  };

  // Gets the student group details.
  private getStudentGroupDetails = (studentGroupId: string) => {
    return this.studentGroups.find((sg) => sg.id === studentGroupId);
  };

  // Gets the supervised student.
  private supervisedStudent = (studentId: string) => {
    return this.supervisedStudents.students.find(
      (student) => student.id === studentId
    );
  };

  // Gets the unsupervised student.
  private unsupervisedStudent = (studentId: string) => {
    return this.unsupervisedStudents.students.find(
      (student) => student.id === studentId
    );
  };

  // Gets the supervised student name, email and id.
  get supervisedStudentNameEmailWithId() {
    return this.supervisedStudents.students.map((student) => ({
      name: `${student.firstName} ${student.lastName} (${student.email})`,
      id: student.id,
    }));
  }

  /**
   * Creates a student group with the given group name.
   *
   * @param groupName - The name of the student group.
   * @returns A promise that resolves when the student group is created.
   * @throws If an error occurs during the creation process.
   */
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

  /**
   * Adds a student to a student group.
   *
   * @param groupId - The ID of the group to add the student to.
   * @param student - The student to be added.
   * @returns A promise that resolves when the student is successfully added to the group.
   * @throws If an error occurs while adding the student to the group.
   */
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

  /**
   * Removes a student from a student group.
   *
   * @param groupId - The ID of the group from which the student will be removed.
   * @param studentId - The ID of the student to be removed.
   * @returns A Promise that resolves when the student is successfully removed from the group.
   * @throws If an error occurs during the removal process.
   */
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

  /**
   * Deletes a student group.
   *
   * @param {string} groupId - The ID of the group to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the group is deleted.
   * @throws {Error} - If an error occurs during the deletion process.
   */
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

  /**
   * Updates the group name of a student group.
   *
   * @param groupId - The ID of the group to update.
   * @param groupName - The new name for the group.
   * @returns A Promise that resolves when the group name is successfully updated.
   * @throws If an error occurs during the update process.
   */
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

  /**
   * Retrieves the list of students who are not in a specific student group.
   *
   * @param groupId - The ID of the student group.
   * @returns A Promise that resolves to the list of students not in the group.
   * @throws If an error occurs while retrieving the students.
   */
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

  /**
   * Retrieves the student groups from the server.
   * @returns {Promise<void>} A promise that resolves when the student groups are retrieved.
   * @throws {Error} If an error occurs while retrieving the student groups.
   */
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

  /**
   * Retrieves the details of a student group.
   *
   * @param studentGroupId - The ID of the student group to retrieve.
   * @returns A Promise that resolves to the student group details.
   */
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

  /**
   * Retrieves the research groups using the specified research group name.
   * @returns A promise that resolves when the research groups are retrieved.
   * @throws If an error occurs while retrieving the research groups.
   */
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

  /**
   * Retrieves the research group with the specified ID.
   *
   * @param researchGroupId - The ID of the research group to retrieve.
   * @returns A Promise that resolves to the retrieved research group.
   */
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

  /**
   * Retrieves the list of patients who are not in the research group.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
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

  /**
   * Creates a research group.
   *
   * @param {ResearchGroupFormValues} values - The values for creating the research group.
   * @returns {Promise<void>} - A promise that resolves when the research group is created.
   * @throws {Error} - If an error occurs while creating the research group.
   */
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

  /**
   * Deletes a research group.
   *
   * @param researchGroupId - The ID of the research group to delete.
   * @returns A promise that resolves when the research group is successfully deleted.
   * @throws If an error occurs during the deletion process.
   */
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

  /**
   * Updates a research group with the specified research group ID and values.
   *
   * @param researchGroupId - The ID of the research group to update.
   * @param values - The new values for the research group.
   * @returns A promise that resolves when the research group is successfully updated.
   * @throws An error if the update operation fails.
   */
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

  /**
   * Adds a patient to a research group.
   *
   * @param researchGroupId - The ID of the research group.
   * @param patient - The patient to be added to the research group.
   * @returns A Promise that resolves when the patient is successfully added to the research group.
   * @throws An error if there is a problem adding the patient to the research group.
   */
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

  /**
   * Removes a patient from the research group.
   *
   * @param patient - The patient to be removed from the research group.
   * @returns A promise that resolves when the patient is successfully removed.
   * @throws An error if the removal process fails.
   */
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

  /**
   * Fetches the supervised students from the server.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
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

  /**
   * Fetches unsupervised students from the server.
   * Sets the fetched unsupervised students in the store.
   * Updates the loading state accordingly.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
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

  /**
   * Supervises a student by their ID.
   *
   * @param studentId - The ID of the student to supervise.
   * @returns A promise that resolves when the student is successfully supervised.
   * @throws An error if there was a problem supervising the student.
   */
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

  /**
   * Unsupervises a student.
   *
   * @param studentId - The ID of the student to unsupervise.
   * @returns A promise that resolves when the student is unsupervised.
   * @throws If an error occurs during the unsupervise operation.
   */
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
