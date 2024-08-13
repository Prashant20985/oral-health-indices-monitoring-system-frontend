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

/**
 * Component for rendering additional tooth inputs for DMFT_DMFS calculation form.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Object} props.upperMouth - The upper mouth object.
 * @param {Object} props.lowerMouth - The lower mouth object.
 * @param {Function} props.handleChange - The change event handler.
 * @param {boolean} props.isView - Indicates if the form is in view mode.
 * @param {string} props.name - The name of the component.
 * @returns {JSX.Element} The rendered component.
 */
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
