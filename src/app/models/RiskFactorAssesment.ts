export interface RiskFactorAssessment {
  riskFactorAssessmentModel: RiskFactorAssessmentModel;
}

export interface RiskFactorAssessmentModel {
  questions: RiskFactorAssessmentQuestionModel[];
}

export interface RiskFactorAssessmentQuestionModel {
  questionText: string;
  answer: RiskFactorAssessmentAnswerModel;
}

export interface RiskFactorAssessmentAnswerModel {
  lowRisk: string;
  moderateRisk: string;
  highRisk: string;
}
