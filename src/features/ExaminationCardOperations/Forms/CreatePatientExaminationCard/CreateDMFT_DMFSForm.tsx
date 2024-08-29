import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import DMFT_DMFSForm from "../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";
import { DMFT_DMFSFormValues } from "../../../../app/models/DMFT_DMFS";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  dmft_dmfsFormValues: DMFT_DMFSFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a DMFT/DMFS record.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Object} props.dmft_dmfsFormValues - The values for the DMFT/DMFS form.
 * @param {Function} props.handleChange - The function to handle form field changes.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreateDMFT_DMFSForm({
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
         {t("examination-card-operations.forms.create-dmft-dmfs-form.add-calculated-result")}
        </Typography>
        <TextField
          label={t("examination-card-operations.forms.create-dmft-dmfs-form.dmft-result")}
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          value={dmft_dmfsFormValues.dmftResult}
          onChange={handleChange}
          name="dmfT_DMFS.dmftResult"
        />
        <TextField
          label={t("examination-card-operations.forms.create-dmft-dmfs-form.dmfs-result")}
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          value={dmft_dmfsFormValues.dmfsResult}
          onChange={handleChange}
          name="dmfT_DMFS.dmfsResult"
        />
        <TextField
          label={t("examination-card-operations.forms.create-dmft-dmfs-form.comment")}
          variant="outlined"
          fullWidth
          type="number"
          value={dmft_dmfsFormValues.comment}
          color="secondary"
          onChange={handleChange}
          multiline
          rows={4}
          name="dmfT_DMFS.comment"
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h5" fontWeight={600}>
          {t("examination-card-operations.forms.create-dmft-dmfs-form.input-values")}
        </Typography>
      </Box>
      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfsFormValues.assessmentModel}
        handleChange={handleChange}
        prostheticStatus={dmft_dmfsFormValues.prostheticStatus}
        name="dmfT_DMFS"
      />
    </Box>
  );
}
