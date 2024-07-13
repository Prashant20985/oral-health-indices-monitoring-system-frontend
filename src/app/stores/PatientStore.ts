import { makeAutoObservable, reaction, runInAction } from "mobx";
import { CreateUpdatePatientFormValues, Patient } from "../models/Patient";
import axiosAgent from "../api/axiosAgent";

export class PatientStore {
  activePatients: Patient[] = [];
  archivedPatients: Patient[] = [];
  patientDetails: Patient | null = null;

  activePatientsSerachParams = { name: "", email: "" };

  archivedPatientsSearchParams = { name: "", email: "" };

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
      () => this.activePatientsSerachParams,
      () => this.fetchActivePatients()
    );

    reaction(
      () => this.archivedPatientsSearchParams,
      () => this.fetchArchivedPatients()
    );
  }

  setActivePatients = (patients: Patient[]) => {
    this.activePatients = patients;
  };

  setArchivedPatients = (patients: Patient[]) => {
    this.archivedPatients = patients;
  };

  setPatientDetails = (patient: Patient) => {
    this.patientDetails = patient;
  };

  setActivePatientsSearchParams = (searchParams: {
    name: string;
    email: string;
  }) => {
    this.activePatientsSerachParams = searchParams;
  };

  setArchivedPatientsSearchParams = (searchParams: {
    name: string;
    email: string;
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
    return params;
  }

  get archivedPatientAxiosParams() {
    const params = new URLSearchParams();
    params.append("name", this.archivedPatientsSearchParams.name);
    params.append("email", this.archivedPatientsSearchParams.email);
    return params;
  }

  getPatientById = (patientId: string) => {
    return this.activePatients
      .concat(this.archivedPatients)
      .find((p) => p.id === patientId);
  };

  fetchActivePatients = async () => {
    this.loading.activePatients = true;
    try {
      const patients = await axiosAgent.PatientOperations.getActicePatients(
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
        this.activePatients = this.activePatients.map((p) => {
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
        const patient = this.activePatients.find((p) => p.id === patientId);
        if (patient) {
          patient.isArchived = true;
          this.archivedPatients.push(patient);
          this.activePatients = this.activePatients.filter(
            (p) => p.id !== patientId
          );
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
        const patient = this.archivedPatients.find((p) => p.id === patientId);
        if (patient) {
          patient.isArchived = false;
          this.activePatients.push(patient);
          this.archivedPatients = this.archivedPatients.filter(
            (p) => p.id !== patientId
          );
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
