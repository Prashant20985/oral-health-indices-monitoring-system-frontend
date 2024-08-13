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
import { API } from "../../../../app/models/APIBleeding";
import { useTranslation } from "react-i18next";

const APIBleedingForm = React.lazy(
  () => import("../../../IndexCalculationForms/APIBleeding/APIBleedingForm")
);

interface Props {
  api: API;
  cardId: string;
}

/**
 * Renders the details of the practice patient API for a teacher.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {API} props.api - The practice patient API data.
 * @param {string} props.cardId - The ID of the card.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientAPIDetailsForTeacher({
  api,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentAPIForm },
  } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentAPIForm(cardId, commnet);
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
              {t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.title")}
            </Typography>
          }
        />

        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.api-result")}
              name="apiResult"
              value={`${api.apiResult} %`}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="Maxilla"
              name="maxilla"
              value={`${api.maxilla} %`}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="Mandible"
              name="mandible"
              value={`${api.mandible} %`}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={api.comment ?? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.no-comment")}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {api.comment === null ? "Add Comment" : "Edit Comment"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <APIBleedingForm
        apiBleedingAssessmentModel={api.assessmentModel}
        isView
      />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.comment-api-form")}
        description={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-api-details-for-teacher.description")}
        comment={api.comment ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
