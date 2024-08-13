import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { BleedingFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";

interface Props {
  bleedingFormValues: BleedingFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a bleeding record.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.bleedingFormValues - The bleeding form values.
 * @param {Function} props.handleChange - The change event handler.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreateBleedingForm({
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
        <TextField
          label="Comment"
          variant="outlined"
          fullWidth
          color="secondary"
          onChange={handleChange}
          value={bleedingFormValues.comment}
          name="bleeding.comment"
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
        apiBleedingAssessmentModel={bleedingFormValues.assessmentModel}
        handleChange={handleChange}
        name="bleeding.assessmentModel"
      />
    </Box>
  );
}
