import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { BeweAssessmentModel } from "../../../app/models/Bewe";
import BeweUpperMouthInput from "./BeweUpperMouthInput";
import BeweLowerMouthInput from "./BeweLowerMouthInput";

interface Props {
  beweAssessmentModel: BeweAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

/**
 * Renders the BeweForm component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {BeweAssessmentModel} props.beweAssessmentModel - The BeweAssessmentModel object.
 * @param {boolean} [props.isView=false] - Indicates if the form is in view mode.
 * @param {Function} props.handleChange - The function to handle form input changes.
 * @param {string} props.name - The name of the form.
 * @returns {JSX.Element} The rendered BeweForm component.
 */
export default observer(function BeweForm({
  beweAssessmentModel,
  isView = false,
  handleChange,
  name,
}: Props) {
  return (
    <Box mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={4}>
        <BeweUpperMouthInput
          beweAssessmentModel={beweAssessmentModel}
          handleChange={handleChange}
          isView={isView}
          name={name}
        />
        <BeweLowerMouthInput
          beweAssessmentModel={beweAssessmentModel}
          handleChange={handleChange}
          isView={isView}
          name={name}
        />
      </Box>
    </Box>
  );
});
