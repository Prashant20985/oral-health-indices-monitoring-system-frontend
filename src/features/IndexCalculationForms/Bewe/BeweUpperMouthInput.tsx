import { Box } from "@mui/material";
import * as React from "react";
import { BeweAssessmentModel } from "../../../app/models/Bewe";
import FourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/FourSurfaceToothInput";
import FiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/FiveSurfaceBeweToothInput";
import InverseFourSurfaceToothInput from "../../../app/common/formInputs/ToothInputs/InverseFourSurfaceToothInput";
import InverseFiveSurfaceBeweToothInput from "../../../app/common/formInputs/ToothInputs/InverseFiveSurfaceBeweToothInput";

interface Props {
  beweAssessmentModel: BeweAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default React.memo(function BeweUpperMouthInput({
  beweAssessmentModel,
  isView,
  handleChange,
  name,
}: Props) {
  return (
    <Box>
      {/* Sectant 1 */}
      <>
        {[17, 16, 15, 14].map((toothNumber) => (
          <FiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant1 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant1.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      {/* Sectant 2 */}
      <>
        {[13, 12, 11].map((toothNumber) => (
          <FourSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant2 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant2.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      <>
        {[21, 22, 23].map((toothNumber) => (
          <InverseFourSurfaceToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant2 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant2.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
      {/* Sectant 3 */}
      <>
        {[24, 25, 26, 27].map((toothNumber) => (
          <InverseFiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant3 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={`${name}.sectant3.tooth_${toothNumber}`}
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </>
    </Box>
  );
});
