import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { BeweFormValues } from "../../../../app/models/Bewe";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";
import { colors } from "../../../../themeConfig";

interface Props {
  beweFormValues: BeweFormValues;
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
        <TextField
          label="Comment"
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
          Input values can only be 0, 1, 2, 3 or x
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
