import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import { Summary } from "../../app/models/Summary";
import { colors } from "../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  summary: Summary;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  isView?: boolean;
}

/**
 * Renders a form for displaying and editing summary information.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Summary} props.summary - The summary object containing the form data.
 * @param {Function} props.handleChange - The function to handle changes in the form fields.
 * @param {boolean} props.isView - Indicates whether the form is in view-only mode.
 * @param {string} props.name - The name of the form.
 * @returns {JSX.Element} The rendered SummaryForm component.
 */
export default function SummaryForm({
  summary,
  handleChange,
  isView,
  name,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={4}
      component={Paper}
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 4,
        backgroundColor: color.primary[400],
      }}
    >
      <Box display="flex" gap={6} alignItems="center">
        <Box>
          <Typography
            noWrap
            variant="h4"
            fontFamily="monospace"
            fontWeight={600}
            sx={{ mb: 2 }}
          >
            {t("examination-card-operations.forms.summary-form.need-for-dental-interventions")}
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            0 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.summary-form.missing")}
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            1 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.summary-form.preventive-treatment")}
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            2 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.summary-form.treatment-in-normal-mode")}
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            3 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.summary-form.emergency-treatment")}
          </Typography>
          <Typography noWrap variant="h6" fontWeight={600}>
            4 &nbsp;&nbsp;&nbsp; {t("examination-card-operations.forms.summary-form.interdisciplinary-treatment")}
          </Typography>
        </Box>
        <TextField
          variant="outlined"
          select
          color="secondary"
          onChange={handleChange}
          value={summary.needForDentalInterventions}
          fullWidth
          label={t("examination-card-operations.forms.summary-form.need-for-dental-interventions")}
          name={
            name !== undefined
              ? `${name}.needForDentalInterventions`
              : "needForDentalInterventions"
          }
          InputProps={{
            readOnly: isView,
          }}
          inputProps={{ maxLength: 1 }}
          sx={{ width: 250 }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {["0", "1", "2", "3", "4"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        color="secondary"
        multiline
        label={t("examination-card-operations.forms.summary-form.proposed-plan-of-treatment")}
        onChange={handleChange}
        value={summary.proposedTreatment}
        rows={4}
        name={
          name !== undefined ? `${name}.proposedTreatment` : "proposedTreatment"
        }
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        onChange={handleChange}
        color="secondary"
        label={t("examination-card-operations.forms.summary-form.description-of-the-treatment")}
        multiline
        value={summary.description}
        rows={4}
        name={name !== undefined ? `${name}.description` : "description"}
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
      <TextField
        variant="outlined"
        fullWidth
        color="secondary"
        multiline
        label={t("examination-card-operations.forms.summary-form.patient-recommendation")}
        onChange={handleChange}
        value={summary.patientRecommendations}
        rows={4}
        name={
          name !== undefined
            ? `${name}.patientRecommendations`
            : "patientRecommendations"
        }
        inputProps={{ maxLength: 500 }}
        InputProps={{
          readOnly: isView,
        }}
      />
    </Box>
  );
}
