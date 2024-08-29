import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { PracticeBleedingFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  bleedingFormValues: PracticeBleedingFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a practice bleeding record.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.bleedingFormValues - The values of the bleeding form.
 * @param {Function} props.handleChange - The function to handle form field changes.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreatePracticeBleedingForm({
  bleedingFormValues,
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
        <Box>
          <Typography
            variant="h5"
            sx={{
              textTransform: "uppercase",
              color: color.greenAccent[400],
              fontweight: 600,
            }}
          >
             {t("student-exam-operations.forms.practice-bleeding-form.add-calculated-bleeding-result")}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <TextField
            label= {t("student-exam-operations.forms.practice-bleeding-form.bleeding-result")}
            variant="outlined"
            type="number"
            color="secondary"
            value={bleedingFormValues.bleedingResult}
            onChange={handleChange}
            fullWidth
            name="practiceBleeding.bleedingResult"
          />

          <TextField
            label={t("student-exam-operations.forms.practice-bleeding-form.maxilla")}
            variant="outlined"
            type="number"
            color="secondary"
            fullWidth
            value={bleedingFormValues.maxilla}
            onChange={handleChange}
            name="practiceBleeding.maxilla"
          />

          <TextField
            label={t("student-exam-operations.forms.practice-bleeding-form.mandible")}
            variant="outlined"
            type="number"
            color="secondary"
            value={bleedingFormValues.mandible}
            onChange={handleChange}
            name="practiceBleeding.mandible"
            fullWidth
          />
        </Box>
      </Box>
      <APIBleedingForm
        apiBleedingAssessmentModel={bleedingFormValues.assessmentModel}
        handleChange={handleChange}
        name="practiceBleeding.assessmentModel"
      />
    </Box>
  );
}
