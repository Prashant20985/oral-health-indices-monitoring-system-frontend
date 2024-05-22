import { Box } from "@mui/material";
import * as React from "react";
import { BeweAssessmentModel } from "../../../app/models/Bewe";
import FiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/FiveSurfaceBeweToothInput";
import FourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/FourSurfaceToothInput";
import InverseFourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/InverseFourSurfaceToothInput";
import InverseFiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/InverseFiveSurfaceBeweToothInput";

interface Props {
  bewe: BeweAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default React.memo(function BeweLowerMouthInput({
  bewe,
  isView,
  handleChange,
}: Props) {
  return (
    <Box>
      {/* Sectant 6 */}
      <>
        {[47, 46, 45, 44].map((toothNumber) => (
          <FiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (bewe.sectant6 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`sectant6.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      {/* Sectant 5 */}
      <>
        {[43, 42, 41].map((toothNumber) => (
          <FourSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (bewe.sectant5 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`sectant5.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      <>
        {[31, 32, 33].map((toothNumber) => (
          <InverseFourSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (bewe.sectant5 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`sectant5.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      {/* Sectant 4 */}
      <>
        {[34, 35, 36, 37].map((toothNumber) => (
          <InverseFiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (bewe.sectant4 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`sectant4.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
    </Box>
  );
});
