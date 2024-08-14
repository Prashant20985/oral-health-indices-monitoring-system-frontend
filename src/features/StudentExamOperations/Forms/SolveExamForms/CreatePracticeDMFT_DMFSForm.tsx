import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import DMFT_DMFSForm from "../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";
import { PracticeDMFT_DMFSFormValues } from "../../../../app/models/DMFT_DMFS";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  dmft_dmfsFormValues: PracticeDMFT_DMFSFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a practice DMFT_DMFS.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.dmft_dmfsFormValues - The values of the DMFT_DMFS form.
 * @param {Function} props.handleChange - The function to handle form field changes.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreatePracticeDMFT_DMFSForm({
  dmft_dmfsFormValues,
  handleChange,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");
  
  return (
    <Box>
      <Box
        component={Paper}
        elevation={3}
        sx={{
          backgroundColor: color.primary[400],
          boxShadow: 2,
          borderRadius: 2,
          p: 2,
          gap: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textTransform: "uppercase",
            color: color.greenAccent[400],
            fontweight: 600,
          }}
        >
           {t("student-exam-operations.forms.practice-dmft-dmfs-form.add-calculated-dmft-dmfs-result")}
        </Typography>

        <TextField
          label= {t("student-exam-operations.forms.practice-dmft-dmfs-form.dmft-result")}
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceDMFT_DMFS.dmftResult"
        />

        <TextField
          label= {t("student-exam-operations.forms.practice-dmft-dmfs-form.dmfs-result")}
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceDMFT_DMFS.dmfsResult"
        />
      </Box>

      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfsFormValues.assessmentModel}
        handleChange={handleChange}
        prostheticStatus={dmft_dmfsFormValues.prostheticStatus}
        name="practiceDMFT_DMFS"
      />
    </Box>
  );
}
