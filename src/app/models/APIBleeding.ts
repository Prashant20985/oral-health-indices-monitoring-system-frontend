export interface Quadrant {
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
  value6: string;
  value7: string;
}

export interface APIBleedingAssessmentModel {
  quadrant1: Quadrant;
  quadrant2: Quadrant;
  quadrant3: Quadrant;
  quadrant4: Quadrant;
}

export interface PracticeAPIFormValues {
  apiResult: number;
  maxilla: number;
  mandible: number;
  assessmentModel: APIBleedingAssessmentModel;
}

export interface PracticeBleedingFormValues {
  bleedingResult: number;
  maxilla: number;
  mandible: number;
  assessmentModel: APIBleedingAssessmentModel;
}

export interface Bleeding {
  id: string;
  bleedingResult: number;
  maxilla: number;
  mandible: number;
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}

export interface API {
  id: string;
  apiResult: number;
  maxilla: number;
  mandible: number;
  comment: string;
  assessmentModel: APIBleedingAssessmentModel;
}
