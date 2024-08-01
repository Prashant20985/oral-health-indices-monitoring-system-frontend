import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Bleeding } from "../../../../app/models/APIBleeding";
import { colors } from "../../../../themeConfig";
import APIBleedingForm from "../../../IndexCalculationForms/APIBleeding/APIBleedingForm";
import { useTranslation } from "react-i18next";

interface Props {
  bleeding: Bleeding;
}

export default observer(function PracticePatientBleedingDetailsForStudent({
  bleeding,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor: color.primary[400],
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              {t("student-exam-operations.exam-solution-details.practice-patient-bleeding-details-for-student.title")}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            {[
              { label: "Bleeding Result", value: bleeding.bleedingResult },
              { label: "Maxilla", value: bleeding.maxilla },
              { label: "Mandible", value: bleeding.mandible },
            ].map((item) => (
              <TextField
                id={item.label}
                label={item.label}
                value={item.value}
                fullWidth
                color="secondary"
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            ))}
          </Box>
          <TextField
            label={t("student-exam-operations.exam-solution-details.practice-patient-bleeding-details-for-student.doctor-comment")}
            value={bleeding.comment ? bleeding.comment : t("student-exam-operations.exam-solution-details.practice-patient-bleeding-details-for-student.no-comment")}
            fullWidth
            color="secondary"
            rows={3}
            multiline
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </CardContent>
      </Card>
      <APIBleedingForm
        apiBleedingAssessmentModel={bleeding.assessmentModel}
        isView
      />
    </Box>
  );
});
