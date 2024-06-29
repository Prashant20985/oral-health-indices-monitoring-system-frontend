import * as React from "react";
import { Box } from "@mui/material";
import {
  DMFT_DMFSAssessmentModelLowerMouth,
  DMFT_DMFSAssessmentModelUpperMouth,
} from "../../../app/models/DMFT_DMFS";
import ToothSurfaceInputBase from "../../../app/common/formInputs/ToothInputs/ToothSurfaceInputBase";

interface Props {
  upperMouth: DMFT_DMFSAssessmentModelUpperMouth;
  lowerMouth: DMFT_DMFSAssessmentModelLowerMouth;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default React.memo(function DMFT_DMFSExtraToothInput({
  upperMouth,
  lowerMouth,
  handleChange,
  isView,
  name,
}: Props) {
  return (
    <Box mt="1rem" mb="1rem">
      <Box width="100%" display="flex" gap={0.5}>
        {[55, 54, 53, 52, 51, 61, 62, 63, 64, 65].map((toothNumber) => (
          <ToothSurfaceInputBase
            key={toothNumber}
            value={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (upperMouth as any)[`tooth_${toothNumber}`]
            }
            onChange={handleChange}
            name={`${name}.upperMouth.tooth_${toothNumber}`}
            readOnly={isView}
            width="3rem"
            height="2rem"
            placeholder={`${toothNumber}`}
          />
        ))}
      </Box>
      <Box width="100%" display="flex" gap={0.5}>
        {[85, 84, 83, 82, 81, 71, 72, 73, 74, 75].map((toothNumber) => (
          <ToothSurfaceInputBase
            key={toothNumber}
            value={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (lowerMouth as any)[`tooth_${toothNumber}`]
            }
            onChange={handleChange}
            name={`${name}.lowerMouth.tooth_${toothNumber}`}
            readOnly={isView}
            width="3rem"
            height="2rem"
            placeholder={`${toothNumber}`}
          />
        ))}
      </Box>
    </Box>
  );
});
