import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { PracticeAPIFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  apiFormValues: PracticeAPIFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePracticeAPIForm({
  apiFormValues,
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
            {t("student-exam-operations.form.practice-api-form.add-calculated-api-result")}
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <TextField
            label={t("student-exam-operations.form.practice-api-form.api-result")}
            variant="outlined"
            type="number"
            value={apiFormValues.apiResult}
            fullWidth
            color="secondary"
            onChange={handleChange}
            name="practiceAPI.apiResult"
          />

          <TextField
            label="Maxilla"
            variant="outlined"
            type="number"
            color="secondary"
            value={apiFormValues.maxilla}
            fullWidth
            onChange={handleChange}
            name="practiceAPI.maxilla"
          />

          <TextField
            label="Mandible"
            variant="outlined"
            type="number"
            value={apiFormValues.mandible}
            fullWidth
            color="secondary"
            onChange={handleChange}
            name="practiceAPI.mandible"
          />
        </Box>
      </Box>
      <APIBleedingForm
        apiBleedingAssessmentModel={apiFormValues.assessmentModel}
        handleChange={handleChange}
        name="practiceAPI.assessmentModel"
      />
    </Box>
  );
}
