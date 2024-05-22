import { Box } from "@mui/material";
import * as React from "react";
import SixSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/SixSurfaceToothInput";
import InverseSixSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/InverseSixSurfaceToothInput";
import { DMFT_DMFSAssessmentModelUpperMouth } from "../../../app/models/DMFT_DMFS";
import FiveSurfaceDMFT_DMFSToothInput from "../../../app/common/formInputs/ToothInputs/FiveSurfaceDMFT_DMFSToothInput";
import InverseFiveSurfaceDMFT_DMFSToothInput from "../../../app/common/formInputs/ToothInputs/InverseFiveSurfaceDMFT_DMFSToothInput";

interface Props {
  upperMouth: DMFT_DMFSAssessmentModelUpperMouth;
  isViewMode?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.memo(function DMFT_DMFSUpperMouthInput({
  upperMouth,
  isViewMode,
  handleChange,
}: Props) {
  return (
    <Box>
      <>
        {[18, 17, 16, 15, 14].map((toothNumber) => (
          <SixSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (upperMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`upperMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isViewMode}
          />
        ))}
      </>
      <>
        {[13, 12, 11].map((toothNumber) => (
          <FiveSurfaceDMFT_DMFSToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (upperMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`upperMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isViewMode}
          />
        ))}
      </>
      <>
        {[21, 22, 23].map((toothNumber) => (
          <InverseFiveSurfaceDMFT_DMFSToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (upperMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`upperMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isViewMode}
          />
        ))}
      </>
      <>
        {[24, 25, 26, 27, 28].map((toothNumber) => (
          <InverseSixSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (upperMouth as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`upperMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isViewMode}
          />
        ))}
      </>
    </Box>
  );
});
