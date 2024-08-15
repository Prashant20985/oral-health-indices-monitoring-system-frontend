import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  CreateUpdatePatientFormValues,
  PaginatedPatient,
  Patient,
} from "../models/Patient";
import axiosAgent from "../api/axiosAgent";

/**
 * Represents a store for managing patient data.
 */
export class PatientStore {
  // Represents the activePatients property.
  activePatients: PaginatedPatient = { patients: [], totalPatientsCount: 0 };

  // Represents the archivedPatients property.
  archivedPatients: PaginatedPatient = { patients: [], totalPatientsCount: 0 };

  // Represents the patientDetails property.
  patientDetails: Patient | null = null;

  // Represents the activePatientsSerachParams property.
  activePatientsSerachParams = { name: "", email: "", page: 0, pageSize: 20 };

  // Represents the archivedPatientsSearchParams property.
  archivedPatientsSearchParams = { name: "", email: "", page: 0, pageSize: 20 };

  // Represents the loading state for various operations.
  loading = {
    activePatients: false,
    archivedPatients: false,
    createPatient: false,
    updatePatient: false,
    archivePatient: false,
    unarchivePatient: false,
    deletePatient: false,
    patientDetails: false,
  };

  constructor() {
    makeAutoObservable(this);

    // Reaction to the activePatientsSerachParams properties.
    reaction(
      () => ({
        name: this.activePatientsSerachParams.name,
        email: this.activePatientsSerachParams.email,
        page: this.activePatientsSerachParams.page,
        pageSize: this.activePatientsSerachParams.pageSize,
      }),
      () => {
        this.fetchActivePatients();
      }
    );

    // Reaction to the archivedPatientsSearchParams properties.
    reaction(
      () => ({
        name: this.archivedPatientsSearchParams.name,
        email: this.archivedPatientsSearchParams.email,
        page: this.archivedPatientsSearchParams.page,
        pageSize: this.archivedPatientsSearchParams.pageSize,
      }),
      () => this.fetchArchivedPatients()
    );
  }

  // Sets the activePatients property.
  setActivePatients = (patients: PaginatedPatient) => {
    this.activePatients = patients;
  };

  // Sets the archivedPatients property.
  setArchivedPatients = (patients: PaginatedPatient) => {
    this.archivedPatients = patients;
  };

  // Sets the patientDetails property.
  setPatientDetails = (patient: Patient) => {
    this.patientDetails = patient;
  };

  // Sets the activePatientsSerachParams property.
  setActivePatientsSearchParams = (searchParams: {
    name: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.activePatientsSerachParams = searchParams;
  };

  // Sets the archivedPatientsSearchParams property.
  setArchivedPatientsSearchParams = (searchParams: {
    name: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.archivedPatientsSearchParams = searchParams;
  };

  // Clears the activePatientsSerachParams name property.
  clearActivePatientNameSearch = () => {
    this.activePatientsSerachParams.name = "";
  };

  // Clears the activePatientsSerachParams email property
  clearActivePatientEmailSearch = () => {
    this.activePatientsSerachParams.email = "";
  };

  // Clears the archivedPatientsSearchParams name property.
  clearArchivedPatientNameSearch = () => {
    this.archivedPatientsSearchParams.name = "";
  };

  // Clears the archivedPatientsSearchParams email property.
  clearArchivedPatientEmailSearch = () => {
    this.archivedPatientsSearchParams.email = "";
  };

  clearPatientDetails = () => {
    this.patientDetails = null;
  };

  // Gets the URLSearchParams for the activePatientsSerachParams property.
  get activePatientAxiosParams() {
    const params = new URLSearchParams();
    params.append("name", this.activePatientsSerachParams.name);
    params.append("email", this.activePatientsSerachParams.email);
    params.append("page", this.activePatientsSerachParams.page.toString());
    params.append(
      "pageSize",
      this.activePatientsSerachParams.pageSize.toString()
    );
    return params;
  }

  // Gets the URLSearchParams for the archivedPatientsSearchParams property.
  get archivedPatientAxiosParams() {
    const params = new URLSearchParams();
    params.append("name", this.archivedPatientsSearchParams.name);
    params.append("email", this.archivedPatientsSearchParams.email);
    params.append("page", this.archivedPatientsSearchParams.page.toString());
    params.append(
      "pageSize",
      this.archivedPatientsSearchParams.pageSize.toString()
    );
    return params;
  }

  // Gets the patient by ID.
  getPatientById = (patientId: string) => {
    return this.activePatients.patients
      .concat(this.archivedPatients.patients)
      .find((p) => p.id === patientId);
  };

  /**
   * Fetches active patients from the server.
   *
   * @returns {Promise<void>} A promise that resolves when the active patients are fetched successfully.
   * @throws {Error} If there is an error while fetching the active patients.
   */
  fetchActivePatients = async () => {
    this.loading.activePatients = true;
    try {
      const patients = await axiosAgent.PatientOperations.getActivePatients(
        this.activePatientAxiosParams
      );
      runInAction(() => {
        this.setActivePatients(patients);
        this.loading.activePatients = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.activePatients = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Fetches the archived patients from the server.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   * @throws {Error} If an error occurs during the operation.
   */
  fetchArchivedPatients = async () => {
    this.loading.archivedPatients = true;
    try {
      const patients = await axiosAgent.PatientOperations.getArchivedPatients(
        this.archivedPatientAxiosParams
      );
      runInAction(() => {
        this.setArchivedPatients(patients);
        this.loading.archivedPatients = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.archivedPatients = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Creates a new patient.
   *
   * @param values - The values for creating the patient.
   * @returns A promise that resolves when the patient is created.
   * @throws If an error occurs during the creation process.
   */
  createPatient = async (values: CreateUpdatePatientFormValues) => {
    this.loading.createPatient = true;
    try {
      await axiosAgent.PatientOperations.createPatient(values);
      runInAction(() => {
        this.fetchActivePatients();
        this.loading.createPatient = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.createPatient = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Updates a patient's information.
   *
   * @param {string} patientId - The ID of the patient to update.
   * @param {CreateUpdatePatientFormValues} values - The updated values for the patient.
   * @returns {Promise<void>} - A promise that resolves when the patient is successfully updated.
   * @throws {Error} - If an error occurs during the update process.
   */
  updatePatient = async (
    patientId: string,
    values: CreateUpdatePatientFormValues
  ) => {
    this.loading.updatePatient = true;
    try {
      await axiosAgent.PatientOperations.updatePatient(patientId, values);
      runInAction(() => {
        this.activePatients.patients = this.activePatients.patients.map((p) => {
          if (p.id === patientId) {
            return { ...p, ...values };
          }
          return p;
        });
        this.loading.updatePatient = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.updatePatient = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Archives a patient.
   *
   * @param {string} patientId - The ID of the patient to be archived.
   * @param {string} archiveComment - The comment for archiving the patient.
   * @returns {Promise<void>} - A promise that resolves when the patient is successfully archived.
   * @throws {Error} - If an error occurs while archiving the patient.
   */
  archivePatient = async (patientId: string, archiveComment: string) => {
    this.loading.archivePatient = true;
    try {
      await axiosAgent.PatientOperations.archivePatient(
        patientId,
        archiveComment
      );
      runInAction(() => {
        const patient = this.activePatients.patients.find(
          (p) => p.id === patientId
        );
        if (patient) {
          patient.isArchived = true;
          this.archivedPatients.patients.push(patient);
          this.activePatients.patients = this.activePatients.patients.filter(
            (p) => p.id !== patientId
          );

          this.activePatients.totalPatientsCount =
            this.activePatients.patients.length;
          this.archivedPatients.totalPatientsCount =
            this.archivedPatients.patients.length;
        }
        this.loading.archivePatient = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.archivePatient = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Unarchives a patient by setting their isArchived property to false.
   * Moves the patient from the archivedPatients array to the activePatients array.
   * Updates the totalPatientsCount for both arrays.
   *
   * @param patientId - The ID of the patient to unarchive.
   * @throws If an error occurs during the unarchiving process.
   */
  unarchivePatient = async (patientId: string) => {
    this.loading.unarchivePatient = true;
    try {
      await axiosAgent.PatientOperations.unarchivePatient(patientId);
      runInAction(() => {
        const patient = this.archivedPatients.patients.find(
          (p) => p.id === patientId
        );
        if (patient) {
          patient.isArchived = false;
          this.activePatients.patients.push(patient);
          this.archivedPatients.patients =
            this.archivedPatients.patients.filter((p) => p.id !== patientId);

          this.activePatients.totalPatientsCount =
            this.activePatients.patients.length;
          this.archivedPatients.totalPatientsCount =
            this.archivedPatients.patients.length;
        }
        this.loading.unarchivePatient = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.unarchivePatient = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Deletes a patient from the system.
   *
   * @param {string} patientId - The ID of the patient to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the patient is successfully deleted.
   * @throws {Error} - If an error occurs while deleting the patient.
   */
  deletePatient = async (patientId: string) => {
    this.loading.deletePatient = true;
    const patient = this.getPatientById(patientId);
    try {
      await axiosAgent.PatientOperations.deletePatient(patientId);
      runInAction(() => {
        if (patient) {
          if (patient.isArchived) {
            this.fetchArchivedPatients();
          } else {
            this.fetchActivePatients();
          }
        }
        this.loading.deletePatient = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.deletePatient = false));
      console.log(error);
      throw error;
    }
  };

  /**
   * Fetches the details of a patient.
   *
   * @param patientId - The ID of the patient.
   * @returns A Promise that resolves to the patient details.
   * @throws If an error occurs during the fetch operation.
   */
  fetchPatientDetails = async (patientId: string) => {
    this.loading.patientDetails = true;
    const patient = this.getPatientById(patientId);
    if (patient) {
      this.setPatientDetails(patient);
      this.loading.patientDetails = false;
      return;
    }
    try {
      const patient = await axiosAgent.PatientOperations.getPatientDetails(
        patientId
      );
      runInAction(() => {
        this.setPatientDetails(patient);
        this.loading.patientDetails = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.patientDetails = false));
      console.log(error);
      throw error;
    }
  };
}
