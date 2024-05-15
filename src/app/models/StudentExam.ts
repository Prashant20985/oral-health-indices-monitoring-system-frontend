import { APIBleeding, PracticeAPIBleedingFormValues } from "./APIBleeding";
import { Bewe, PracticeBeweFormValues } from "./Bewe";
import { DMFT_DMFS, PracticeDMFT_DMFSFormValues } from "./DMFT_DMFS";
import { PracticePatient } from "./Patient";
import {
  RiskFactorAssessment,
  RiskFactorAssessmentModel,
} from "./RiskFactorAssesment";

export interface UpdateExam {
  dateOfExamination: Date;
  examTitle: string;
  description: string;
  startTime: string;
  endTime: string;
  durationInterval: string;
  maxMark: number;
}

export interface PublishExam extends UpdateExam {
  groupId: string;
}

export interface Exam extends UpdateExam {
  id: string;
  publishDate: Date;
  examStatus: ExamStatus;
}

export type ExamStatus = "Published" | "Graded";

export interface ExamSolutionFormValues {
  patientDto: PracticePatient;
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
  practiceAPIBleeding: PracticeAPIBleedingFormValues;
  practiceBewe: PracticeBeweFormValues;
  practiceDMFT_DMFS: PracticeDMFT_DMFSFormValues;
}

export interface ExamSolution {
  id: string;
  studentMark: number;
  doctorComment: string;
  doctorName: string;
  studentName: string;
  practicePatient: PracticePatient;
  practiceRiskFactorAssessment: RiskFactorAssessment;
  practicePatientExaminationResult: {
    bewe: Bewe;
    dmfT_DMFS: DMFT_DMFS;
    apiBleeding: APIBleeding;
  };
}
