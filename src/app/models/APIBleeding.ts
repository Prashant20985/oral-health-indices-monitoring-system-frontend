/**
 * Represents a quadrant.
 *
 * @remarks
 * This interface defines the structure of a quadrant, which consists of seven values.
 */
export interface Quadrant {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
  value7: string;
}

/**
 * Represents the model for API Bleeding Assessment.
 */
export interface APIBleedingAssessmentModel {
  quadrant1: Quadrant;
  quadrant2: Quadrant;
  quadrant3: Quadrant;
  quadrant4: Quadrant;
}

/**
 * Represents the form values for the Practice API.
 */
export interface PracticeAPIFormValues {
  apiResult: number;
  maxilla: number;
  mandible: number;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents the form values for the practice bleeding assessment.
 */
export interface PracticeBleedingFormValues {
  bleedingResult: number;
  maxilla: number;
  mandible: number;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents a Bleeding object.
 */
export interface Bleeding {
  id: string;
  bleedingResult: number;
  maxilla: number;
  mandible: number;
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents an API object.
 */
export interface API {
  id: string;
  apiResult: number;
  maxilla: number;
  mandible: number;
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents the API values for bleeding assessment.
 */
export interface APIValues {
  id: string;
  apiResult: number;
  maxilla: number;
  mandible: number;
  doctorComment: string;
  studentComment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents the bleeding values for a specific assessment.
 */
export interface BleedingValues {
  id: string;
  bleedingResult: number;
  maxilla: number;
  mandible: number;
  doctorComment: string;
  studentComment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents the form values for bleeding assessment.
 */
export interface BleedingFormValues {
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

/**
 * Represents the form values for the API.
 */
export interface APIFormValues {
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}
