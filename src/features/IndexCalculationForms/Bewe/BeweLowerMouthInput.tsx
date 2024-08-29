import { Box, Typography } from "@mui/material";
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

/**
 * Renders the lower mouth input for the Bewe index calculation form.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {BeweAssessmentModel} props.beweAssessmentModel - The Bewe assessment model.
 * @param {boolean} props.isView - Indicates if the input is in view mode.
 * @param {Function} props.handleChange - The change event handler.
 * @param {string | undefined} props.name - The input name.
 * @returns {JSX.Element} The rendered lower mouth input component.
 */
export default React.memo(function BeweLowerMouthInput({
  beweAssessmentModel,
  isView,
  handleChange,
  name,
}: Props) {
  return (
    <Box display="flex" gap={2}>
      {/* Sectant 6 */}
      <Box>
        {[47, 46, 45, 44].map((toothNumber) => (
          <FiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel.sectant6 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={
              name !== undefined
                ? `${name}.sectant6.tooth_${toothNumber}`
                : `sectant6.tooth_${toothNumber}`
            }
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
        <Box width="100%" display="flex" justifyContent="center" mt={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S6
          </Typography>
        </Box>
      </Box>
      {/* Sectant 5 */}
      <Box>
        <>
          {[43, 42, 41].map((toothNumber) => (
            <FourSurfaceToothInput
              key={toothNumber}
              surfaces={
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (beweAssessmentModel.sectant5 as any)[`tooth_${toothNumber}`]
              }
              toothNumber={`tooth_${toothNumber}`}
              name={
                name !== undefined
                  ? `${name}.sectant5.tooth_${toothNumber}`
                  : `sectant5.tooth_${toothNumber}`
              }
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
              name={
                name !== undefined
                  ? `${name}.sectant5.tooth_${toothNumber}`
                  : `sectant5.tooth_${toothNumber}`
              }
              onChange={handleChange}
              readOnly={isView}
            />
          ))}
        </>
        <Box width="100%" display="flex" justifyContent="center" mt={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S5
          </Typography>
        </Box>
      </Box>
      {/* Sectant 4 */}
      <Box>
        {[34, 35, 36, 37].map((toothNumber) => (
          <InverseFiveSurfaceBeweToothInput
            key={toothNumber}
            surfaces={
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (beweAssessmentModel.sectant4 as any)[`tooth_${toothNumber}`]
            }
            toothNumber={`tooth_${toothNumber}`}
            name={
              name !== undefined
                ? `${name}.sectant4.tooth_${toothNumber}`
                : `sectant4.tooth_${toothNumber}`
            }
            onChange={handleChange}
            readOnly={isView}
          />
        ))}
        <Box width="100%" display="flex" justifyContent="center" mt={0.5}>
          <Typography variant="h4" fontWeight={600}>
            S4
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
