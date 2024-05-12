import { SixSurfaceTooth, FiveSurfaceTooth } from "./Tooth";

export interface PracticeDMFT_DMFSFormValues {
  assessmentModel: DMFT_DMFSAssessmentModel;
  dmftResult: number;
  dmfsResult: number;
}

export interface DMFT_DMFS extends PracticeDMFT_DMFSFormValues {
  id: string;
  comment: string;
}

export interface DMFT_DMFSAssessmentModel {
  upperMouth: DMFT_DMFSAssessmentModelUpperMouth;
  lowerMouth: DMFT_DMFSAssessmentModelLowerMouth;
}

export interface DMFT_DMFSAssessmentModelUpperMouth {
  tooth_18: SixSurfaceTooth;
  tooth_17: SixSurfaceTooth;
  tooth_16: SixSurfaceTooth;
  tooth_15: SixSurfaceTooth;
  tooth_14: SixSurfaceTooth;
  tooth_13: FiveSurfaceTooth;
  tooth_12: FiveSurfaceTooth;
  tooth_11: FiveSurfaceTooth;
  tooth_21: FiveSurfaceTooth;
  tooth_22: FiveSurfaceTooth;
  tooth_23: FiveSurfaceTooth;
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

export interface DMFT_DMFSAssessmentModelLowerMouth {
  tooth_48: SixSurfaceTooth;
  tooth_47: SixSurfaceTooth;
  tooth_46: SixSurfaceTooth;
  tooth_45: SixSurfaceTooth;
  tooth_44: SixSurfaceTooth;
  tooth_43: FiveSurfaceTooth;
  tooth_42: FiveSurfaceTooth;
  tooth_41: FiveSurfaceTooth;
  tooth_31: FiveSurfaceTooth;
  tooth_32: FiveSurfaceTooth;
  tooth_33: FiveSurfaceTooth;
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
