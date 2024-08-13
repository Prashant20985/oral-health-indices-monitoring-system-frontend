import { ExamSolutionFormValues } from "../../../../app/models/StudentExam";

/**
 * Represents the initial values for an exam solution form.
 *
 * @remarks
 * This object contains the initial values for various fields in the exam solution form.
 * It includes the patient's information, summary, risk factor assessment, practice API,
 * practice bleeding, practice BEWE, and practice DMFT_DMFS.
 */
export const ExamSolutionInitialValues: ExamSolutionFormValues = {
  patientDto: {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    ethnicGroup: "",
    otherGroup: "",
    yearsInSchool: 0,
    otherData: "",
    otherData2: "",
    otherData3: "",
    location: "",
    age: 0,
  },
  summary: {
    description: "",
    patientRecommendations: "",
    needForDentalInterventions: "",
    proposedTreatment: "",
  },
  riskFactorAssessmentModel: {
    questions: [
      {
        questionText: "Fluoride exposure",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Consumption of sweetened products and beverages",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Systematic Dental Care",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Systemic diseases",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Eating disorders",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Complex Pharmacotherapy",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Alcohol/Nicotine",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "New carious lesions in the last 36 months",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Visible Plaque",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Teeth extraction due to caries in the last 36 months",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Abnormal Tooth Morphology",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "1 or more proximal restorations",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Exposed root surfaces",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Overhanging fills, no contact points",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Fixed Orthodontic Braces",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Xerostomy",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
      {
        questionText: "Caries risk factor assessment",
        answer: {
          lowRisk: "",
          moderateRisk: "",
          highRisk: "",
        },
      },
    ],
  },
  practiceAPI: {
    apiResult: 0,
    maxilla: 0,
    mandible: 0,
    assessmentModel: {
      quadrant1: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant2: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant3: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant4: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
    },
  },
  practiceBleeding: {
    bleedingResult: 0,
    maxilla: 0,
    mandible: 0,
    assessmentModel: {
      quadrant1: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant2: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant3: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
      quadrant4: {
        value1: "",
        value2: "",
        value3: "",
        value4: "",
        value5: "",
        value6: "",
        value7: "",
      },
    },
  },
  practiceBewe: {
    beweResult: 0,
    assessmentModel: {
      sectant1: {
        tooth_17: {
          o: "10",
          b: "10",
          l: "10",
          d: "10",
          m: "10",
        },
        tooth_16: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_15: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_14: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
      sectant2: {
        tooth_13: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_12: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_11: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_21: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_22: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_23: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
      sectant3: {
        tooth_24: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_25: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_26: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_27: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
      sectant4: {
        tooth_34: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_35: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_36: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_37: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
      sectant5: {
        tooth_43: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_42: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_41: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_31: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_32: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_33: {
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
      sectant6: {
        tooth_47: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_46: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_45: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_44: {
          o: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
      },
    },
  },
  practiceDMFT_DMFS: {
    dmftResult: 0,
    dmfsResult: 0,
    prostheticStatus: "",
    assessmentModel: {
      upperMouth: {
        tooth_18: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_17: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_16: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_15: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_14: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_13: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_12: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_11: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_21: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_22: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_23: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_24: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_25: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_26: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_27: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_28: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_55: "",
        tooth_54: "",
        tooth_53: "",
        tooth_52: "",
        tooth_51: "",
        tooth_61: "",
        tooth_62: "",
        tooth_63: "",
        tooth_64: "",
        tooth_65: "",
      },
      lowerMouth: {
        tooth_48: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_47: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_46: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_45: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_44: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_43: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_42: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_41: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_31: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_32: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_33: {
          r: "",
          b: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_34: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_35: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_36: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_37: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_38: {
          r: "",
          b: "",
          o: "",
          l: "",
          d: "",
          m: "",
        },
        tooth_85: "",
        tooth_84: "",
        tooth_83: "",
        tooth_82: "",
        tooth_81: "",
        tooth_71: "",
        tooth_72: "",
        tooth_73: "",
        tooth_74: "",
        tooth_75: "",
      },
    },
  },
};
