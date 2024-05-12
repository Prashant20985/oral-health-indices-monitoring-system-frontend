import { FiveSurfaceTooth, FourSurfaceTooth } from "./Tooth";

export interface PracticeBeweFormValues {
  assessmentModel: BeweAssessmentModel;
  beweResult: number;
}

export interface Bewe extends PracticeBeweFormValues {
  id: string;
  comment: string;
}

export interface BeweAssessmentModel {
  sectant1: {
    tooth_17: FiveSurfaceTooth;
    tooth_16: FiveSurfaceTooth;
    tooth_15: FiveSurfaceTooth;
    tooth_14: FiveSurfaceTooth;
  };
  sectant2: {
    tooth_13: FourSurfaceTooth;
    tooth_12: FourSurfaceTooth;
    tooth_11: FourSurfaceTooth;
    tooth_21: FourSurfaceTooth;
    tooth_22: FourSurfaceTooth;
    tooth_23: FourSurfaceTooth;
  };
  sectant3: {
    tooth_24: FiveSurfaceTooth;
    tooth_25: FiveSurfaceTooth;
    tooth_26: FiveSurfaceTooth;
    tooth_27: FiveSurfaceTooth;
  };
  sectant4: {
    tooth_37: FiveSurfaceTooth;
    tooth_36: FiveSurfaceTooth;
    tooth_35: FiveSurfaceTooth;
    tooth_34: FiveSurfaceTooth;
  };
  sectant5: {
    tooth_33: FourSurfaceTooth;
    tooth_32: FourSurfaceTooth;
    tooth_31: FourSurfaceTooth;
    tooth_41: FourSurfaceTooth;
    tooth_42: FourSurfaceTooth;
    tooth_43: FourSurfaceTooth;
  };
  sectant6: {
    tooth_44: FiveSurfaceTooth;
    tooth_45: FiveSurfaceTooth;
    tooth_46: FiveSurfaceTooth;
    tooth_47: FiveSurfaceTooth;
  };
}
