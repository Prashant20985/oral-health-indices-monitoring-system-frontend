import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { APIFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";

interface Props {
  apiFormValues: APIFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateAPIForm({ apiFormValues, handleChange }: Props) {
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
          value={apiFormValues.comment}
          name="api.comment"
          multiline
          rows={4}
        />
      </Box>

      <Box mt={2}>
        <Typography variant="h5" fontWeight={600}>
          Input values can only be +/-
        </Typography>
      </Box>
      <APIBleedingForm
        apiBleedingAssessmentModel={apiFormValues.assessmentModel}
        handleChange={handleChange}
        name="api.assessmentModel"
      />
    </Box>
  );
}
