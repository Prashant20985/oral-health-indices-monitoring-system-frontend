import { makeAutoObservable, reaction, runInAction } from "mobx";
import { CreateUpdatePatientFormValues, Patient } from "../models/Patient";
import axiosAgent from "../api/axiosAgent";

export class PatientStore {
  activePatients: Patient[] = [];
  archivedPatients: Patient[] = [];
  activePatientsByDoctorId: Patient[] = [];
  archivedPatientsByDoctorId: Patient[] = [];

  activePatientsSerachParams = { name: "", email: "" };

  archivedPatientsSearchParams = { name: "", email: "" };

  activePatientsByDoctorIdSearchParams = { name: "", email: "" };

  archivedPatientsByDoctorIdSearchParams = { name: "", email: "" };

  loading = {
    activePatients: false,
    archivedPatients: false,
    activePatientsByDoctorId: false,
    archivedPatientsByDoctorId: false,
    createPatient: false,
    updatePatient: false,
    archivePatient: false,
    unarchivePatient: false,
    deletePatient: false,
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

    reaction(
      () => this.activePatientsByDoctorIdSearchParams,
      () => this.fetchActivePatientsByDoctorId()
    );

    reaction(
      () => this.archivedPatientsByDoctorIdSearchParams,
      () => this.fetchArchivedPatientsByDoctorId()
    );
  }

  setActivePatients = (patients: Patient[]) => {
    this.activePatients = patients;
  };

  setArchivedPatients = (patients: Patient[]) => {
    this.archivedPatients = patients;
  };

  setActivePatientsByDoctorId = (patients: Patient[]) => {
    this.activePatientsByDoctorId = patients;
  };

  setArchivedPatientsByDoctorId = (patients: Patient[]) => {
    this.archivedPatientsByDoctorId = patients;
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

  setActivePatientsByDoctorIdSearchParams = (searchParams: {
    name: string;
    email: string;
  }) => {
    this.activePatientsByDoctorIdSearchParams = searchParams;
  };

  setArchivedPatientsByDoctorIdSearchParams = (searchParams: {
    name: string;
    email: string;
  }) => {
    this.archivedPatientsByDoctorIdSearchParams = searchParams;
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

  clearActivePatientsByDoctorIdEmailSearch = () => {
    this.activePatientsByDoctorIdSearchParams.email = "";
  };

  clearActivePatientsByDoctorIdNameSearch = () => {
    this.activePatientsByDoctorIdSearchParams.name = "";
  };

  clearArchivedPatientsByDoctorIdEmailSearch = () => {
    this.archivedPatientsByDoctorIdSearchParams.email = "";
  };

  clearArchivedPatientsByDoctorIdNameSearch = () => {
    this.archivedPatientsByDoctorIdSearchParams.name = "";
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

  get activePatientsByDoctorIdAxiosParams() {
    const params = new URLSearchParams();
    params.append("name", this.activePatientsByDoctorIdSearchParams.name);
    params.append("email", this.activePatientsByDoctorIdSearchParams.email);
    return params;
  }

  get archivedPatientsByDoctorIdAxiosParams() {
    const params = new URLSearchParams();
    params.append("name", this.archivedPatientsByDoctorIdSearchParams.name);
    params.append("email", this.archivedPatientsByDoctorIdSearchParams.email);
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

  fetchActivePatientsByDoctorId = async () => {
    this.loading.activePatientsByDoctorId = true;
    try {
      const patients =
        await axiosAgent.PatientOperations.getActivePatientsByDoctorId(
          this.activePatientsByDoctorIdAxiosParams
        );
      runInAction(() => {
        this.setActivePatientsByDoctorId(patients);
        this.loading.activePatientsByDoctorId = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.activePatientsByDoctorId = false));
      console.log(error);
      throw error;
    }
  };

  fetchArchivedPatientsByDoctorId = async () => {
    this.loading.archivedPatientsByDoctorId = true;
    try {
      const patients =
        await axiosAgent.PatientOperations.getArchivedPatientsByDoctorId(
          this.archivedPatientsByDoctorIdAxiosParams
        );
      runInAction(() => {
        this.setArchivedPatientsByDoctorId(patients);
        this.loading.archivedPatientsByDoctorId = false;
      });
    } catch (error) {
      runInAction(() => (this.loading.archivedPatientsByDoctorId = false));
      console.log(error);
      throw error;
    }
  };

  createPatient = async (values: CreateUpdatePatientFormValues) => {
    this.loading.createPatient = true;
    try {
      await axiosAgent.PatientOperations.createPatient(values);
      runInAction(() => {
        this.fetchActivePatientsByDoctorId();
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
        this.activePatientsByDoctorId = this.activePatientsByDoctorId.map(
          (p) => {
            if (p.id === patientId) {
              return { ...p, ...values };
            }
            return p;
          }
        );
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
        const patient = this.activePatientsByDoctorId.find(
          (p) => p.id === patientId
        );
        if (patient) {
          patient.isArchived = true;
          this.archivedPatientsByDoctorId.push(patient);
          this.activePatientsByDoctorId = this.activePatientsByDoctorId.filter(
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
        const patient = this.archivedPatientsByDoctorId.find(
          (p) => p.id === patientId
        );
        if (patient) {
          patient.isArchived = false;
          this.activePatientsByDoctorId.push(patient);
          this.archivedPatientsByDoctorId =
            this.archivedPatientsByDoctorId.filter((p) => p.id !== patientId);
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
}
