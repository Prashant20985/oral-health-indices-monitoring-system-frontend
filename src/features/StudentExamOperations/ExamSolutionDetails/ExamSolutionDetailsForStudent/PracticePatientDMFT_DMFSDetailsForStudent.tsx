import { observer } from "mobx-react-lite";
import { DMFT_DMFS } from "../../../../app/models/DMFT_DMFS";
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
import DMFT_DMFSForm from "../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm";
import { useTranslation } from "react-i18next";

interface Props {
  dmft_dmfs: DMFT_DMFS;
}

/**
 * Renders the details of a practice patient's DMFT/DMFS for a student.
 * 
 * @component
 * @param {Props} props - The component props.
 * @param {DMFT_DMFS} props.dmft_dmfs - The DMFT/DMFS data for the patient.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientDMFT_DMFSDetailsForStudent({
  dmft_dmfs,
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
              {t("student-exam-operations.exam-solution-details.practice-patient-dmft-dmfs-details-for-student.title")}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            {[
              { label: "DMFT", value: dmft_dmfs.dmftResult },
              { label: "DMFS", value: dmft_dmfs.dmftResult },
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
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details.practice-patient-dmft-dmfs-details-for-student.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={dmft_dmfs.comment ?? t("student-exam-operations.exam-solution-details.practice-patient-dmft-dmfs-details-for-student.no-comment")}
            />
          </Box>
        </CardContent>
      </Card>
      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfs.assessmentModel}
        prostheticStatus={dmft_dmfs.prostheticStatus}
        isView
      />
    </Box>
  );
});
