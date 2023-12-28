export interface ResearchGroup {
  id: string;
  groupName: string;
  description: string;
  createdBy: string;
  patients: ResearchGroupPatient[];
}

export interface ResearchGroupPatient {
  id: string;
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
  createdAt: Date;
  isArchived: boolean;
  archiveComment: string;
  addedBy: string;
}

export interface ResearchGroupFormValues {
  groupName: string;
  description: string;
}
