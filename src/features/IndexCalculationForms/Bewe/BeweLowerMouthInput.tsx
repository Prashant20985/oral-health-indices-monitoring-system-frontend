import { Box } from "@mui/material";
import * as React from "react";
import { BeweAssessmentModel } from "../../../app/models/Bewe";
import FiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/FiveSurfaceBeweToothInput";
import FourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/FourSurfaceToothInput";
import InverseFourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/InverseFourSurfaceToothInput";
import InverseFiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/InverseFiveSurfaceBeweToothInput";

interface Props {
  beweAssessmentModel: BeweAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default React.memo(function BeweLowerMouthInput({
  beweAssessmentModel,
  isView,
  handleChange,
  name,
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
              (beweAssessmentModel.sectant6 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant6.tooth_${toothNumber}`}
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
              (beweAssessmentModel.sectant5 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant5.tooth_${toothNumber}`}
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
              (beweAssessmentModel.sectant5 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant5.tooth_${toothNumber}`}
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
              (beweAssessmentModel.sectant4 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant4.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
    </Box>
  );
});
