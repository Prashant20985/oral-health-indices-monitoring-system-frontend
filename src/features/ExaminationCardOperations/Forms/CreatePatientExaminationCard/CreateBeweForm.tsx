import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { BeweFormValues } from "../../../../app/models/Bewe";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  beweFormValues: BeweFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a practice BEWE (Basic Erosive Wear Examination) card.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.beweFormValues - The values of the BEWE form.
 * @param {Function} props.handleChange - The function to handle form field changes.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreatePracticeBeweForm({
  beweFormValues,
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
        <TextField
          label={t("examination-card-operations.forms.create-bewe-form.comment")}
          variant="outlined"
          fullWidth
          color="secondary"
          onChange={handleChange}
          name="bewe.comment"
          value={beweFormValues.comment}
          multiline
          rows={4}
        />
      </Box>
      <Box mt={2}>
        <Typography variant="h5" fontWeight={600}>
          {t("examination-card-operations.forms.create-bewe-form.input-values")}
        </Typography>
      </Box>
      <BeweForm
        beweAssessmentModel={beweFormValues.assessmentModel}
        handleChange={handleChange}
        name="bewe.assessmentModel"
      />
    </Box>
  );
}
