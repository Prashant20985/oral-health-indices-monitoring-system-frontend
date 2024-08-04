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

export interface PaginatedPatient {
  patients: Patient[];
  totalPatientsCount: number;
}

export interface Patient extends CreateUpdatePatientFormValues {
  id: string;
  createdAt: string;
  isArchived: boolean;
  archiveComment: string;
  doctorName: string;
  researchGroupName: string;
}

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

export interface PracticePatientDetails extends PracticePatient {
  id: string;
  createdAt: string;
  isArchived: boolean;
  archiveComment: string;
  doctorName: string;
  researchGroupName: string;
}
