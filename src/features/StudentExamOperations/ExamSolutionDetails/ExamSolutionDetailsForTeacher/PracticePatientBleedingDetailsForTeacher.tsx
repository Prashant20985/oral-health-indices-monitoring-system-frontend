import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { Send } from "@mui/icons-material";
import { useStore } from "../../../../app/stores/Store";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";
import { Bleeding } from "../../../../app/models/APIBleeding";
import { useTranslation } from "react-i18next";

const APIBleedingForm = React.lazy(
  () => import("../../../IndexCalculationForms/APIBleeding/APIBleedingForm")
);

interface Props {
  bleeding: Bleeding;
  cardId: string;
}

/**
 * Renders the details of bleeding for a practice patient in the teacher view.
 * @param {Props} props - The component props.
 * @param {Bleeding} props.bleeding - The bleeding details.
 * @param {string} props.cardId - The ID of the card.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientBleedingDetailsForTeacher({
  bleeding,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentBleedingForm },
  } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentBleedingForm(cardId, commnet);
  };
  
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
              {t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.title")}
            </Typography>
          }
        />

        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.bleeding-result")}
              name="apiResult"
              value={`${bleeding.bleedingResult} %`}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="Maxilla"
              name="maxilla"
              value={`${bleeding.bleedingResult} %`}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="Mandible"
              name="mandible"
              value={`${bleeding.bleedingResult} %`}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={bleeding.comment ?? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.no-comment")}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {bleeding.comment === null ? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.add-comment") : t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.edit-comment")}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <APIBleedingForm
        apiBleedingAssessmentModel={bleeding.assessmentModel}
        isView
      />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.comment-bleeding-form")}
        description={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bleeding-details-for-teacher.description")}
        comment={bleeding.comment ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
