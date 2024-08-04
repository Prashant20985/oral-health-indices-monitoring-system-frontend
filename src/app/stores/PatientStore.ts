import { makeAutoObservable, reaction, runInAction } from "mobx";
import {
  CreateUpdatePatientFormValues,
  PaginatedPatient,
  Patient,
} from "../models/Patient";
import axiosAgent from "../api/axiosAgent";

export class PatientStore {
  activePatients: PaginatedPatient = { patients: [], totalPatientsCount: 0 };
  archivedPatients: PaginatedPatient = { patients: [], totalPatientsCount: 0 };
  patientDetails: Patient | null = null;

  activePatientsSerachParams = { name: "", email: "", page: 0, pageSize: 20 };

  archivedPatientsSearchParams = { name: "", email: "", page: 0, pageSize: 20 };

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

  setActivePatients = (patients: PaginatedPatient) => {
    this.activePatients = patients;
  };

  setArchivedPatients = (patients: PaginatedPatient) => {
    this.archivedPatients = patients;
  };

  setPatientDetails = (patient: Patient) => {
    this.patientDetails = patient;
  };

  setActivePatientsSearchParams = (searchParams: {
    name: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.activePatientsSerachParams = searchParams;
  };

  setArchivedPatientsSearchParams = (searchParams: {
    name: string;
    email: string;
    page: number;
    pageSize: number;
  }) => {
    this.archivedPatientsSearchParams = searchParams;
  };

  clearActivePatientNameSearch = () => {
    this.activePatientsSerachParams.name = "";
  };

  clearActivePatientEmailSearch = () => {
    this.activePatientsSerachParams.email = "";
  };

  clearArchivedPatientNameSearch = () => {
    this.archivedPatientsSearchParams.name = "";
  };

  clearArchivedPatientEmailSearch = () => {
    this.archivedPatientsSearchParams.email = "";
  };

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

  getPatientById = (patientId: string) => {
    return this.activePatients.patients
      .concat(this.archivedPatients.patients)
      .find((p) => p.id === patientId);
  };

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

  fetchPatientDetails = async (patientId: string) => {
    this.loading.patientDetails = true;
    const patient = this.getPatientById(patientId);
    if (patient) {
      runInAction(() => {
        this.setPatientDetails(patient);
        this.loading.patientDetails = false;
      });
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
