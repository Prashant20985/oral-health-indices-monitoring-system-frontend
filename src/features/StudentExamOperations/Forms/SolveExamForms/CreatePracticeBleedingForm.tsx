import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { PracticeBleedingFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";

interface Props {
  bleedingFormValues: PracticeBleedingFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePracticeBleedingForm({
  bleedingFormValues,
  handleChange,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
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
            Add Calculated Bleeding Result
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <TextField
            label="Bleeding Result"
            variant="outlined"
            type="number"
            color="secondary"
            value={bleedingFormValues.bleedingResult}
            onChange={handleChange}
            fullWidth
            name="practiceBleeding.bleedingResult"
          />

          <TextField
            label="Maxilla"
            variant="outlined"
            type="number"
            color="secondary"
            fullWidth
            value={bleedingFormValues.maxilla}
            onChange={handleChange}
            name="practiceBleeding.maxilla"
          />

          <TextField
            label="Mandible"
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
