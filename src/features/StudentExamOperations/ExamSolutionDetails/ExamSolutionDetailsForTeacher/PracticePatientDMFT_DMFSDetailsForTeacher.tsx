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

const DMFT_DMFSForm = React.lazy(
  () => import("../../../IndexCalculationForms/DMFT_DMFS/DMFT_DMFSForm")
);

interface Props {
  dmft_dmfs: DMFT_DMFS;
  cardId: string;
}

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
              DMFT/DMFS Details
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
              label="Doctor's Comment"
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={dmft_dmfs.comment ?? "No comment yet."}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {dmft_dmfs.comment === null ? "Add Comment" : "Edit Comment"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <DMFT_DMFSForm
        dmft_dmfsAssessmentModel={dmft_dmfs.assessmentModel}
        isView
      />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title="Comment DMFT/DMFS"
        description="To comment on the student exam DMFT/DMFS form, please fill in the form below."
        handleSubmit={handleComment}
        comment={dmft_dmfs.comment ?? ""}
      />
    </Box>
  );
});
