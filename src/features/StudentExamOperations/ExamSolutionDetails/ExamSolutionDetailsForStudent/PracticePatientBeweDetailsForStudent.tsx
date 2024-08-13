import { observer } from "mobx-react-lite";
import { Bewe } from "../../../../app/models/Bewe";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
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
              {t("student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.title")}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" mb={2}>
            <TextField
              label={t("student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.bewe-result")}
              value={bewe.beweResult}
              fullWidth
              color="secondary"
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={bewe.comment ?? t("student-exam-operations.exam-solution-details.practice-patient-bewe-details-for-student.no-comment")}
            />
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
    </Box>
  );
});
