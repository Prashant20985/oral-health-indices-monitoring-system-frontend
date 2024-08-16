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

/**
 * Represents an update for an exam.
 *
 * @remarks
 * This interface defines the properties that can be updated for an exam.
 */
export interface UpdateExam {
  dateOfExamination: Date;
  examTitle: string;
  description: string;
  startTime: string;
  endTime: string;
  durationInterval: string;
  maxMark: number;
}

/**
 * Represents the data structure for publishing an exam.
 * Inherits properties from the UpdateExam interface.
 */
export interface PublishExam extends UpdateExam {
  groupId: string;
}

/**
 * Represents an exam.
 *
 * @remarks
 * This interface extends the `UpdateExam` interface and adds additional properties for an exam.
 *
 * @public
 */
export interface Exam extends UpdateExam {
  id: string;
  publishDate: Date;
  examStatus: ExamStatus;
}

/**
 * Represents the status of an exam.
 *
 * Possible values are:
 * - "Published": The exam has been published.
 * - "Graded": The exam has been graded.
 */
export type ExamStatus = "Published" | "Graded";

/**
 * Represents the form values for an exam solution.
 *
 * @remarks
 * This interface defines the structure of the form values used for an exam solution.
 * It includes properties for the patientDto, summary, riskFactorAssessmentModel,
 * practiceAPI, practiceBleeding, practiceBewe, and practiceDMFT_DMFS.
 */
export interface ExamSolutionFormValues {
  patientDto: PracticePatient;
  summary: Summary;
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
  practiceAPI: PracticeAPIFormValues;
  practiceBleeding: PracticeBleedingFormValues;
  practiceBewe: PracticeBeweFormValues;
  practiceDMFT_DMFS: PracticeDMFT_DMFSFormValues;
}

/**
 * Represents the solution for an exam.
 *
 * @remarks
 * This interface defines the structure of the ExamSolution object, which contains information about a student's exam solution.
 *
 * @public
 */
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

/**
 * Represents the data structure for an exam result.
 *
 * @remarks
 * This interface defines the structure of the ExamResult object, which contains information about a student's exam result.
 *
 * @public
 */
export interface StudentExamResult {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  studentMark: number;
}
