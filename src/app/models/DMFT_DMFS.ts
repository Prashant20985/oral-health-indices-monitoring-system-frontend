import { FiveSurfaceToothDMFT_DMFS, SixSurfaceTooth } from "./Tooth";

/**
 * Represents the form values for the PracticeDMFT_DMFSForm.
 */
export interface PracticeDMFT_DMFSFormValues {
  assessmentModel: DMFT_DMFSAssessmentModel;
  dmftResult: number;
  dmfsResult: number;
  prostheticStatus: string;
}

/**
 * Represents the DMFT_DMFS interface.
 * @remarks
 * This interface extends the PracticeDMFT_DMFSFormValues interface and adds the following properties:
 * - id: a string representing the ID of the DMFT_DMFS.
 * - comment: a string representing the comment for the DMFT_DMFS.
 */
export interface DMFT_DMFS extends PracticeDMFT_DMFSFormValues {
  id: string;
  comment: string;
}

/**
 * Represents an assessment model for DMFT/DMFS.
 */
export interface DMFT_DMFSAssessmentModel {
  upperMouth: DMFT_DMFSAssessmentModelUpperMouth;
  lowerMouth: DMFT_DMFSAssessmentModelLowerMouth;
}

/**
 * Represents the values for DMFT_DMFS assessment.
 */
export interface DMFT_DMFSValues {
  id: string;
  dmftResult: number;
  dmfsResult: number;
  prostheticStatus: string;
  doctorComment: string;
  studentComment: string;
  assessmentModel: DMFT_DMFSAssessmentModel;
}
 
/**
 * Represents the form values for DMFT_DMFS assessment.
 */
export interface DMFT_DMFSFormValues {
  comment: string;
  dmftResult: number;
  dmfsResult: number;
  prostheticStatus: string;
  assessmentModel: DMFT_DMFSAssessmentModel;
}
 
/**
 * Represents the form values for updating DMFT_DMFS data.
 */
export interface UpdateDMFT_DMFSFormValues {
  dmftResult: number;
  dmfsResult: number;
  prostheticStatus: string;
  assessmentModel: DMFT_DMFSAssessmentModel;
}

/**
 * Represents the assessment model for the upper mouth in the DMFT_DMFS assessment.
 */
export interface DMFT_DMFSAssessmentModelUpperMouth {
  tooth_18: SixSurfaceTooth;
  tooth_17: SixSurfaceTooth;
  tooth_16: SixSurfaceTooth;
  tooth_15: SixSurfaceTooth;
  tooth_14: SixSurfaceTooth;
  tooth_13: FiveSurfaceToothDMFT_DMFS;
  tooth_12: FiveSurfaceToothDMFT_DMFS;
  tooth_11: FiveSurfaceToothDMFT_DMFS;
  tooth_21: FiveSurfaceToothDMFT_DMFS;
  tooth_22: FiveSurfaceToothDMFT_DMFS;
  tooth_23: FiveSurfaceToothDMFT_DMFS;
  tooth_24: SixSurfaceTooth;
  tooth_25: SixSurfaceTooth;
  tooth_26: SixSurfaceTooth;
  tooth_27: SixSurfaceTooth;
  tooth_28: SixSurfaceTooth;
  tooth_55: string;
  tooth_54: string;
  tooth_53: string;
  tooth_52: string;
  tooth_51: string;
  tooth_61: string;
  tooth_62: string;
  tooth_63: string;
  tooth_64: string;
  tooth_65: string;
}

/**
 * Represents the assessment model for the lower mouth in the DMFT_DMFS assessment.
 */
export interface DMFT_DMFSAssessmentModelLowerMouth {
  tooth_48: SixSurfaceTooth;
  tooth_47: SixSurfaceTooth;
  tooth_46: SixSurfaceTooth;
  tooth_45: SixSurfaceTooth;
  tooth_44: SixSurfaceTooth;
  tooth_43: FiveSurfaceToothDMFT_DMFS;
  tooth_42: FiveSurfaceToothDMFT_DMFS;
  tooth_41: FiveSurfaceToothDMFT_DMFS;
  tooth_31: FiveSurfaceToothDMFT_DMFS;
  tooth_32: FiveSurfaceToothDMFT_DMFS;
  tooth_33: FiveSurfaceToothDMFT_DMFS;
  tooth_34: SixSurfaceTooth;
  tooth_35: SixSurfaceTooth;
  tooth_36: SixSurfaceTooth;
  tooth_37: SixSurfaceTooth;
  tooth_38: SixSurfaceTooth;
  tooth_85: string;
  tooth_84: string;
  tooth_83: string;
  tooth_82: string;
  tooth_81: string;
  tooth_71: string;
  tooth_72: string;
  tooth_73: string;
  tooth_74: string;
  tooth_75: string;
}
