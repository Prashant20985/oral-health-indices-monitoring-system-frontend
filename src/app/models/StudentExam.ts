import {
  API,
  Bleeding,
  PracticeAPIFormValues,
  PracticeBleedingFormValues,
} from "./APIBleeding";
import { Bewe, PracticeBeweFormValues } from "./Bewe";
import { DMFT_DMFS, PracticeDMFT_DMFSFormValues } from "./DMFT_DMFS";
import { PracticePatient, PracticePatientDetails } from "./Patient";
import {
  RiskFactorAssessment,
  RiskFactorAssessmentModel,
} from "./RiskFactorAssesment";
import { Summary } from "./Summary";

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
  summary: Summary;
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
  practiceAPI: PracticeAPIFormValues;
  practiceBleeding: PracticeBleedingFormValues;
  practiceBewe: PracticeBeweFormValues;
  practiceDMFT_DMFS: PracticeDMFT_DMFSFormValues;
}

export interface ExamSolution {
  id: string;
  studentMark: number;
  doctorComment: string;
  doctorName: string;
  studentName: string;
  summary: Summary;
  practicePatient: PracticePatientDetails;
  practiceRiskFactorAssessment: RiskFactorAssessment;
  practicePatientExaminationResult: {
    bewe: Bewe;
    dmfT_DMFS: DMFT_DMFS;
    api: API;
    bleeding: Bleeding;
  };
}
