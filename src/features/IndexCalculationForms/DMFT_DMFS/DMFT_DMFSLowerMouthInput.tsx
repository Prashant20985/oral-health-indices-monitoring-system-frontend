import { Box } from "@mui/material";
import * as React from "react";
import { DMFT_DMFSAssessmentModelLowerMouth } from "../../../app/models/DMFT_DMFS";
import SixSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/SixSurfaceToothInput";
import InverseSixSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/InverseSixSurfaceToothInput";
import FiveSurfaceDMFT_DMFSToothInput from "../../../app/common/formInputs/ToothInputs/FiveSurfaceDMFT_DMFSToothInput";
import InverseFiveSurfaceDMFT_DMFSToothInput from "../../../app/common/formInputs/ToothInputs/InverseFiveSurfaceDMFT_DMFSToothInput";

interface Props {
  lowerMouth: DMFT_DMFSAssessmentModelLowerMouth;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.memo(function DMFT_DMFSLowerMouthInput({
  lowerMouth,
  isView,
  handleChange,
}: Props) {
  return (
    <Box>
      <>
        {[48, 47, 46, 45, 44].map((toothNumber) => (
          <SixSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (lowerMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`lowerMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      <>
        {[43, 42, 41].map((toothNumber) => (
          <FiveSurfaceDMFT_DMFSToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (lowerMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`lowerMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      <>
        {[31, 32, 33].map((toothNumber) => (
          <InverseFiveSurfaceDMFT_DMFSToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (lowerMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`lowerMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      <>
        {[34, 35, 36, 37, 38].map((toothNumber) => (
          <InverseSixSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (lowerMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`lowerMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
    </Box>
  );
});
