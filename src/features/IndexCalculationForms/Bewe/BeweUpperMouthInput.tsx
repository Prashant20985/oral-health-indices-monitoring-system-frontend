import { Box, Typography } from "@mui/material";
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

/**
 * Renders the upper mouth input for the Bewe index calculation form.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {BeweAssessmentModel} props.beweAssessmentModel - The Bewe assessment model.
 * @param {boolean} props.isView - Indicates if the input is in view mode.
 * @param {Function} props.handleChange - The change event handler.
 * @param {string} props.name - The name of the input.
 * @returns {JSX.Element} The rendered upper mouth input component.
 */
export default React.memo(function BeweUpperMouthInput({
  beweAssessmentModel,
  isView,
  handleChange,
  name,
}: Props) {
  return (
    <Box display="flex" gap={2}>
      {/* Sectant 1 */}
      <Box>
        <Box width="100%" display="flex" justifyContent="center" mb={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S1
          </Typography>
        </Box>
        {[17, 16, 15, 14].map((toothNumber) => (
          <FiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant1 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={
              name !== undefined
                ? `${name}.sectant1.tooth_${toothNumber}`
                : `sectant1.tooth_${toothNumber}`
            }
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </Box>
      {/* Sectant 2 */}
      <Box>
        <Box width="100%" display="flex" justifyContent="center" mb={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S2
          </Typography>
        </Box>
        <>
          {[13, 12, 11].map((toothNumber) => (
            <FourSurfaceToothInput
              key={toothNumber}
              surfaces={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (beweAssessmentModel?.sectant2 as any)[`tooth_${toothNumber}`]
              }
              toothNumber={`tooth_${toothNumber}`}
              name={
                name !== undefined
                  ? `${name}.sectant2.tooth_${toothNumber}`
                  : `sectant2.tooth_${toothNumber}`
              }
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
              name={
                name !== undefined
                  ? `${name}.sectant2.tooth_${toothNumber}`
                  : `sectant2.tooth_${toothNumber}`
              }
              onChange={handleChange}
              readOnly={isView}
            />
          ))}
        </>
      </Box>
      {/* Sectant 3 */}
      <Box>
        <Box width="100%" display="flex" justifyContent="center" mb={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S3
          </Typography>
        </Box>
        {[24, 25, 26, 27].map((toothNumber) => (
          <InverseFiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel?.sectant3 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={
              name !== undefined
                ? `${name}.sectant3.tooth_${toothNumber}`
                : `sectant3.tooth_${toothNumber}`
            }
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
      </Box>
    </Box>
  );
});
