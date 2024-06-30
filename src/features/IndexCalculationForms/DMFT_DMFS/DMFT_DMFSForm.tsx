import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { DMFT_DMFSAssessmentModel } from "../../../app/models/DMFT_DMFS";
import DMFT_DMFSUpperMouthInput from "./DMFT_DMFSUpperMouthInput";
import DMFT_DMFSExtraToothInput from "./DMFT_DMFSExtraToothInput";
import DMFT_DMFSLowerMouthInput from "./DMFT_DMFSLowerMouthInput";

interface Props {
  dmft_dmfsAssessmentModel: DMFT_DMFSAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

export default observer(function DMFT_DMFSForm({
  dmft_dmfsAssessmentModel,
  isView = false,
  handleChange,
  name,
}: Props) {
  return (
    <Box mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <DMFT_DMFSUpperMouthInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          isViewMode={isView}
          handleChange={handleChange}
          name={name}
        />
        <DMFT_DMFSExtraToothInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={name}
        />
        <DMFT_DMFSLowerMouthInput
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={name}
        />
      </Box>
    </Box>
  );
});
