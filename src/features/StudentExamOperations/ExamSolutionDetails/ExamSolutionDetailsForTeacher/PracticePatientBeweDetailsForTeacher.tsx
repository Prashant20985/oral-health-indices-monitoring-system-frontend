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
import { observer } from "mobx-react-lite";

import * as React from "react";
import { Bewe } from "../../../../app/models/Bewe";
import { colors } from "../../../../themeConfig";
import { Send } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { useStore } from "../../../../app/stores/Store";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";
import { useTranslation } from "react-i18next";

const BeweForm = React.lazy(
  () => import("../../../IndexCalculationForms/Bewe/BeweForm")
);

interface Props {
  bewe: Bewe;
  cardId: string;
}

export default observer(function PracticePatientBeweDetailsForTeacher({
  bewe,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentBeweForm },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentBeweForm(cardId, commnet);
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
              {t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.title")}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.bewe-result")}
              name="beweResult"
              value={bewe.beweResult}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={bewe.comment ?? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.no-comment")}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {bewe.comment === null ? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.add-comment") : t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.edit-comment")}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.comment-bewe-form")}
        description={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.description")}
        comment={bewe.comment ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
