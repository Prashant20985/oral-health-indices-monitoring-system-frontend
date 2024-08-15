import { observer } from "mobx-react-lite";
import { Bewe } from "../../../../app/models/Bewe";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import BeweForm from "../../../IndexCalculationForms/Bewe/BeweForm";
import { useTranslation } from "react-i18next";

interface Props {
  bewe: Bewe;
}

/**
 * Renders the details of a practice patient's BEWE (Basic Erosive Wear Examination) for a student.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Bewe} props.bewe - The BEWE object containing the details of the practice patient's BEWE.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientBeweDetailsForStudent({
  bewe,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              {t(
                "student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.title"
              )}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <TextField
              label={t(
                "student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.bewe-result"
              )}
              value={bewe.beweResult}
              fullWidth
              color="secondary"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 1"
                  value={bewe.sectant1}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 2"
                  value={bewe.sectant2}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 3"
                  value={bewe.sectant3}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 6"
                  value={bewe.sectant6}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 5"
                  value={bewe.sectant5}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="Sectant 4"
                  value={bewe.sectant4}
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t(
                "student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.doctor-comment"
              )}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={
                bewe.comment ??
                t(
                  "student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.no-comment"
                )
              }
            />
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
    </Box>
  );
});
