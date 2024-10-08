import { Box, Paper, TextField, Typography, useTheme } from "@mui/material";
import { APIFormValues } from "../../../../app/models/APIBleeding";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  apiFormValues: APIFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating an API.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.apiFormValues - The values of the API form.
 * @param {Function} props.handleChange - The function to handle form field changes.
 * @returns {JSX.Element} The JSX element representing the create API form.
 */
export default function CreateAPIForm({ apiFormValues, handleChange }: Props) {
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
          label={t("examination-card-operations.forms.create-api-form.comment")}
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
        {t("examination-card-operations.forms.create-api-form.input-values")}
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
