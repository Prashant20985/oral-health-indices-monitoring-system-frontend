/**
 * Represents a risk factor assessment.
 */
export interface RiskFactorAssessment {
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
}

/**
 * Represents a risk factor assessment model.
 */
export interface RiskFactorAssessmentModel {
  questions: RiskFactorAssessmentQuestionModel[];
}

/**
 * Represents a question in a risk factor assessment.
 */
export interface RiskFactorAssessmentQuestionModel {
  questionText: string;
  answer: RiskFactorAssessmentAnswerModel;
}

/**
 * Represents the model for a risk factor assessment answer.
 */
export interface RiskFactorAssessmentAnswerModel {
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
}
