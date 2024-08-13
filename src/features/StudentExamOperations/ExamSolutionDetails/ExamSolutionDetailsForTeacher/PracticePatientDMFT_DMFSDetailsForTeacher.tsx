import { observer } from "mobx-react-lite";
import * as React from "react";
import { DMFT_DMFS } from "../../../../app/models/DMFT_DMFS";
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
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { Send } from "@mui/icons-material";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";
import { useStore } from "../../../../app/stores/Store";
import { useTranslation } from "react-i18next";

const DMFT_DMFSForm = React.lazy(
  () => import("../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm")
);

interface Props {
  dmft_dmfs: DMFT_DMFS;
  cardId: string;
}

/**
 * Renders the details of a practice patient's DMFT/DMFS for a teacher.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {DmftDmfs} props.dmft_dmfs - The DMFT/DMFS data.
 * @param {string} props.cardId - The ID of the card.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientDMFT_DMFSDetailsForTeacher({
  dmft_dmfs,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentDMFT_DMFSForm },
  } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentDMFT_DMFSForm(cardId, commnet);
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
              {t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.title")}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label="DMFT"
              name="dmft"
              value={dmft_dmfs.dmftResult}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="DMFS"
              name="dmfs"
              value={dmft_dmfs.dmfsResult}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.doctor-comment")}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={dmft_dmfs.comment ?? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.no-comment")}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {dmft_dmfs.comment === null ? t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.add-comment") : t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.edit-comment")}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfs.assessmentModel}
        prostheticStatus={dmft_dmfs.prostheticStatus}
        isView
      />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.comment-dmft-dmfs-form")}
        description={t("student-exam-operations.exam-solution-details-for-teacher.practice-patient-dmft-dmfs-details-for-teacher.description")}
        handleSubmit={handleComment}
        comment={dmft_dmfs.comment ?? ""}
      />
    </Box>
  );
});
