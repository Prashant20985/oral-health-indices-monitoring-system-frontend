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
import { useTranslation } from "react-i18next";

interface Props {
  dmft_dmfsAssessmentModel: DMFT_DMFSAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  prostheticStatus: string;
}

/**
 * Renders the DMFT_DMFSForm component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {dmft_dmfsAssessmentModel} props.dmft_dmfsAssessmentModel - The DMFT_DMFS assessment model.
 * @param {boolean} [props.isView=false] - Indicates if the form is in view mode.
 * @param {Function} props.handleChange - The change event handler.
 * @param {string} props.name - The name of the form.
 * @param {string} props.prostheticStatus - The prosthetic status.
 * @returns {JSX.Element} The rendered DMFT_DMFSForm component.
 */
export default observer(function DMFT_DMFSForm({
  dmft_dmfsAssessmentModel,
  isView = false,
  handleChange,
  name,
  prostheticStatus,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Box mt={3}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <DMFT_DMFSUpperMouthInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          isViewMode={isView}
          handleChange={handleChange}
          name={
            name !== undefined ? `${name}.assessmentModel` : "assessmentModel"
          }
        />
        <DMFT_DMFSExtraToothInput
          upperMouth={dmft_dmfsAssessmentModel.upperMouth}
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={
            name !== undefined ? `${name}.assessmentModel` : "assessmentModel"
          }
        />
        <DMFT_DMFSLowerMouthInput
          lowerMouth={dmft_dmfsAssessmentModel.lowerMouth}
          isView={isView}
          handleChange={handleChange}
          name={
            name !== undefined ? `${name}.assessmentModel` : "assessmentModel"
          }
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
              {t("examination-card-operations.forms.dmft-dmfs-form.prosthetic-status")}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              0 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.dmft-dmfs-form.no-prosthetic-restorations")}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              1 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.dmft-dmfs-form.partial-denture")}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              2 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.dmft-dmfs-form.complete-denture")}
            </Typography>
            <Typography variant="h6" fontWeight={600}>
              X &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.dmft-dmfs-form.during-prostethic-treatment")}
            </Typography>
          </Box>
          <TextField
            variant="outlined"
            select
            color="secondary"
            sx={{ width: 100 }}
            onChange={handleChange}
            value={prostheticStatus}
            name={
              name !== undefined
                ? `${name}.prostheticStatus`
                : "prostheticStatus"
            }
            inputProps={{ readOnly: isView }}
          >
            <MenuItem value="">
              <em>{t("examination-card-operations.forms.dmft-dmfs-form.none")}</em>
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
