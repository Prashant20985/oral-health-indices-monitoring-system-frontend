import {
  APIFormValues,
  APIValues,
  BleedingFormValues,
  BleedingValues,
} from "./APIBleeding";
import { BeweFormValues, BeweValues } from "./Bewe";
import { DMFT_DMFSFormValues, DMFT_DMFSValues } from "./DMFT_DMFS";
import {
  RiskFactorAssessment,
  RiskFactorAssessmentModel,
} from "./RiskFactorAssesment";
import { Summary } from "./Summary";

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
  summary: Summary;
  riskFactorAssessment: RiskFactorAssessment;
  patientExaminationResult: {
    bewe: BeweValues;
    dmfT_DMFS: DMFT_DMFSValues;
    api: APIValues;
    bleeding: BleedingValues;
  };
}

export interface PatientExaminationCardByDoctorFormValues {
  patientExaminationCardComment: string;
  summary: Summary;
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
  dmfT_DMFS: DMFT_DMFSFormValues;
  bewe: BeweFormValues;
  bleeding: BleedingFormValues;
  api: APIFormValues;
}

export interface PatientExaminationCardByStudentFormValues
  extends PatientExaminationCardByDoctorFormValues {
  assignedDoctorId: string;
}

export interface APIUpdateResponse {
  apiResult: number;
  maxilla: number;
  mandible: number;
}

export interface BleedingUpdateResponse {
  bleedingResult: number;
  maxilla: number;
  mandible: number;
}

export interface DMFT_DMFSUpdateResponse {
  dmftResult: number;
  dmfsResult: number;
}
