import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { PracticeBeweFormValues } from "../../../../app/models/Bewe";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  beweFormValues: PracticeBeweFormValues;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a form for creating a practice BEWE (Basic Erosive Wear Examination) result.
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
        <Typography
          variant="h5"
          sx={{
            textTransform: "uppercase",
            color: color.greenAccent[400],
            fontweight: 600,
          }}
        >
          {t(
            "student-exam-operations.forms.practice-bewe-form.add-calculated-bewe-result"
          )}
        </Typography>
        <TextField
          label={t(
            "student-exam-operations.forms.practice-bewe-form.bewe-result"
          )}
          variant="outlined"
          fullWidth
          type="number"
          color="secondary"
          onChange={handleChange}
          name="practiceBewe.beweResult"
        />

        <Grid container spacing={2}>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant1"
              label="Sectant 1"
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant2"
              label="Sectant 2"
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant3"
              label="Sectant 3"
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant6"
              label="Sectant 6"
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant5"
              label="Sectant 5"
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              color="secondary"
              onChange={handleChange}
              name="practiceBewe.sectant4"
              label="Sectant 4"
            />
          </Grid>
        </Grid>
      </Box>
      <BeweForm
        beweAssessmentModel={beweFormValues.assessmentModel}
        handleChange={handleChange}
        name="practiceBewe.assessmentModel"
      />
    </Box>
  );
}
