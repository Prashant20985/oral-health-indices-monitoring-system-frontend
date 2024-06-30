import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { PracticeBeweFormValues } from "../../../../app/models/Bewe";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";
import { colors } from "../../../../themeConfig";

interface Props {
  beweFormValues: PracticeBeweFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreatePracticeBeweForm({
  beweFormValues,
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
        <Typography
          variant="h5"
          sx={{
            textTransform: "uppercase",
            color: color.greenAccent[400],
            fontweight: 600,
          }}
        >
          Add Calculated BEWE Result
        </Typography>
        <TextField
          label="BEWE Result"
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceBewe.beweResult"
        />
      </Box>
      <BeweForm
        beweAssessmentModel={beweFormValues.assessmentModel}
        handleChange={handleChange}
        name="practiceBewe.assessmentModel"
      />
    </Box>
  );
}
