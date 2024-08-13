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
  name?: string;
}

/**
 * Component for rendering the upper mouth input for DMFT_DMFS assessment.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {DMFT_DMFSAssessmentModelUpperMouth} props.upperMouth - The upper mouth assessment model.
 * @param {boolean} [props.isViewMode] - Indicates if the component is in view mode.
 * @param {Function} [props.handleChange] - The change event handler.
 * @param {string} [props.name] - The name of the component.
 * @returns {JSX.Element} The rendered upper mouth input component.
 */
export default React.memo(function DMFT_DMFSUpperMouthInput({
  upperMouth,
  isViewMode,
  handleChange,
  name,
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
            name={`${name}.upperMouth.tooth_${toothNumber}`}
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
            name={`${name}.upperMouth.tooth_${toothNumber}`}
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
            name={`${name}.upperMouth.tooth_${toothNumber}`}
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
            name={`${name}.upperMouth.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isViewMode}
          />
        ))}
      </>
    </Box>
  );
});
