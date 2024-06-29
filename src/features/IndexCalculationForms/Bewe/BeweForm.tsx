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
