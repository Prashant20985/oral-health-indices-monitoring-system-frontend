import {
  APIFormValues,
  APIValues,
  BleedingFormValues,
  BleedingValues,
} from "./APIBleeding";
import { BeweFormValues, BeweValues } from "./Bewe";
import { DMFT_DMFSFormValues, DMFT_DMFSValues } from "./DMFT_DMFS";
import { Patient } from "./Patient";
import {
  RiskFactorAssessment,
  RiskFactorAssessmentModel,
} from "./RiskFactorAssesment";
import { Summary } from "./Summary";

/**
 * Represents a patient examination card.
 */
export interface PatientExaminationCard {
  id: string;
  doctorName: string;
  studentName: string;
  patientName: string;
  doctorComment: string;
  studentComment: string;
  isRegularMode: boolean;
  totalScore: number;
  dateOfExamination: Date;
  patient: Patient;
  summary: Summary;
  riskFactorAssessment: RiskFactorAssessment;
  patientExaminationResult: {
    bewe: BeweValues;
    dmfT_DMFS: DMFT_DMFSValues;
    api: APIValues;
    bleeding: BleedingValues;
  };
}

/**
 * Represents the form values for a patient examination card by a doctor.
 */
export interface PatientExaminationCardByDoctorFormValues {
  patientExaminationCardComment: string;
  summary: Summary;
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
  dmfT_DMFS: DMFT_DMFSFormValues;
  bewe: BeweFormValues;
  bleeding: BleedingFormValues;
  api: APIFormValues;
}

/**
 * Represents the form values for a patient examination card filled out by a student.
 * Extends the form values for a patient examination card filled out by a doctor.
 * @template T - The type of the assigned doctor's ID.
 */
export interface PatientExaminationCardByStudentFormValues
  extends PatientExaminationCardByDoctorFormValues {
  assignedDoctorId: string;
}

/**
 * Represents the response from an API update.
 */
export interface APIUpdateResponse {
  apiResult: number;
  maxilla: number;
  mandible: number;
}

/**
 * Represents the response object for updating bleeding information.
 */
export interface BleedingUpdateResponse {
  bleedingResult: number;
  maxilla: number;
  mandible: number;
}

/**
 * Represents the response object for updating DMFT and DMFS values.
 */
export interface DMFT_DMFSUpdateResponse {
  dmftResult: number;
  dmfsResult: number;
}

/**
 * Represents the response object for updating BEWE values.
 */
export interface BeweUpdateResponse {
  beweResult: number;
  sectant1: number;
  sectant2: number;
  sectant3: number;
  sectant4: number;
  sectant5: number;
  sectant6: number;
}
