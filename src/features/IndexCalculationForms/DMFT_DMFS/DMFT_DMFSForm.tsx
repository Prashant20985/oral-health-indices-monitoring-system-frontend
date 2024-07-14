import { observer } from "mobx-react-lite";
import {
  Box,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { DMFT_DMFSAssessmentModel } from "../../../app/models/DMFT_DMFS";
import DMFT_DMFSUpperMouthInput from "./DMFT_DMFSUpperMouthInput";
import DMFT_DMFSExtraToothInput from "./DMFT_DMFSExtraToothInput";
import DMFT_DMFSLowerMouthInput from "./DMFT_DMFSLowerMouthInput";
import { colors } from "../../../themeConfig";

interface Props {
  dmft_dmfsAssessmentModel: DMFT_DMFSAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  prostheticStatus: string;
}

export default observer(function DMFT_DMFSForm({
  dmft_dmfsAssessmentModel,
  isView = false,
  handleChange,
  name,
  prostheticStatus,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <DMFT_DMFSUpperMouthInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          isViewMode={isView}
          handleChange={handleChange}
          name={name?.concat(".assessmentModel")}
        />
        <DMFT_DMFSExtraToothInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={name?.concat(".assessmentModel")}
        />
        <DMFT_DMFSLowerMouthInput
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={name?.concat(".assessmentModel")}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          mt={5}
          display="flex"
          gap={3}
          justifyContent="center"
          alignItems="center"
          component={Paper}
          elevation={3}
          p={2}
          sx={{
            backgroundColor: color.primary[400],
            boxShadow: 2,
            borderRadius: 2,
            p: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              color="secodnary"
              fontWeight={700}
              fontFamily="monospace"
              noWrap
            >
              STATUS PROTECTIVE (Removable Restorations)
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              0 &nbsp;&nbsp;&nbsp; No Prosthetic Restorations
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              1 &nbsp;&nbsp;&nbsp; Partial Denture
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              2 &nbsp;&nbsp;&nbsp; Complete Denture
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              X &nbsp;&nbsp;&nbsp; During Prosthetic Treatment
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            select
            color="secondary"
            sx={{ width: 100 }}
            onChange={handleChange}
            value={prostheticStatus}
            name={`${name}.prostheticStatus`}
            inputProps={{ readOnly: isView }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["0", "1", "2", "x"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
    </Box>
  );
});
