import { FiveSurfaceToothBewe, FourSurfaceTooth } from "./Tooth";

/**
 * Represents the form values for the PracticeBeweForm.
 */
export interface PracticeBeweFormValues {
  assessmentModel: BeweAssessmentModel;
  beweResult: number;
  sectant1: number;
  sectant2: number;
  sectant3: number;
  sectant4: number;
  sectant5: number;
  sectant6: number;
}

/**
 * Represents a Bewe object.
 *
 * @remarks
 * This interface extends the `PracticeBeweFormValues` interface and adds the `id` and `comment` properties.
 */
export interface Bewe extends PracticeBeweFormValues {
  id: string;
  comment: string;
}

/**
 * Represents the values of a Bewe assessment.
 */
export interface BeweValues {
  id: string;
  beweResult: number;
  sectant1: number;
  sectant2: number;
  sectant3: number;
  sectant4: number;
  sectant5: number;
  sectant6: number;
  doctorComment: string;
  studentComment: string;
  assessmentModel: BeweAssessmentModel;
}

/**
 * Represents the form values for Bewe.
 */
export interface BeweFormValues {
  comment: string;
  assessmentModel: BeweAssessmentModel;
}

/**
 * Represents a Bewe assessment model.
 */
export interface BeweAssessmentModel {
  sectant1: {
    tooth_17: FiveSurfaceToothBewe;
    tooth_16: FiveSurfaceToothBewe;
    tooth_15: FiveSurfaceToothBewe;
    tooth_14: FiveSurfaceToothBewe;
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
    tooth_24: FiveSurfaceToothBewe;
    tooth_25: FiveSurfaceToothBewe;
    tooth_26: FiveSurfaceToothBewe;
    tooth_27: FiveSurfaceToothBewe;
  };
  sectant4: {
    tooth_37: FiveSurfaceToothBewe;
    tooth_36: FiveSurfaceToothBewe;
    tooth_35: FiveSurfaceToothBewe;
    tooth_34: FiveSurfaceToothBewe;
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
    tooth_44: FiveSurfaceToothBewe;
    tooth_45: FiveSurfaceToothBewe;
    tooth_46: FiveSurfaceToothBewe;
    tooth_47: FiveSurfaceToothBewe;
  };
}
