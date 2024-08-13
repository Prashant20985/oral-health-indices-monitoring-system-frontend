/**
 * Represents a research group.
 *
 * @remarks
 * This interface defines the structure of a research group object.
 */
export interface ResearchGroup {
  id: string;
  groupName: string;
  description: string;
  createdBy: string;
  patients: ResearchGroupPatient[];
}

/**
 * Represents a paginated list of research group patients.
 */
export interface PaginatedResearchGroupPatients {
  totalNumberOfPatients: number;
  patients: ResearchGroupPatient[];
}

/**
 * Represents a patient in a research group.
 */
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

/**
 * Represents the form values for a research group.
 */
export interface ResearchGroupFormValues {
  groupName: string;
  description: string;
}
