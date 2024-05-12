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

export interface PracticeAPIBleedingFormValues {
  apiResult: number;
  bleedingResult: number;
  assessmentModel: APIBleedingAssessmentModel;
}

export interface APIBleeding extends PracticeAPIBleedingFormValues {
  id: string;
  comments: string;
}
