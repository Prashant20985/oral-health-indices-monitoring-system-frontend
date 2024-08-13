/**
 * Represents the form values for creating or updating a patient.
 */
export interface CreateUpdatePatientFormValues {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ethnicGroup: string;
  otherGroup: string;
  yearsInSchool: number;
  otherData: string;
  otherData2: string;
  otherData3: string;
  location: string;
  age: number;
}

/**
 * Represents a paginated list of patients.
 */
export interface PaginatedPatient {
  patients: Patient[];
  totalPatientsCount: number;
}

/**
 * Represents a patient in the oral health indices monitoring system.
 */
export interface Patient extends CreateUpdatePatientFormValues {
  id: string;
  createdAt: string;
  isArchived: boolean;
  archiveComment: string;
  doctorName: string;
  researchGroupName: string;
}

/**
 * Represents a patient in a practice patient.
 */
export interface PracticePatient {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ethnicGroup: string;
  otherGroup: string;
  yearsInSchool: number;
  otherData: string;
  otherData2: string;
  otherData3: string;
  location: string;
  age: number;
}

/**
 * Represents the details of a practice patient.
 * Extends the PracticePatient interface.
 */
export interface PracticePatientDetails extends PracticePatient {
  id: string;
  createdAt: string;
  isArchived: boolean;
  archiveComment: string;
  doctorName: string;
  researchGroupName: string;
}
