import { observer } from "mobx-react-lite";
import { BeweValues } from "../../../app/models/Bewe";
import {
  Box,
  Button,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import { Comment } from "@mui/icons-material";
import BeweEditForm from "../Forms/BeweEditForm";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import CommentForm from "../Forms/CommentForm";

interface Props {
  cardId: string;
  bewe: BeweValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function BeweDetails({
  cardId,
  bewe,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userStore: { user },
    patientExaminationCardStore: { commentBeweForm },
  } = useStore();

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = React.useState(false);

  const isStudent = user?.role === "Student";
  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const comment = isStudent
    ? bewe.studentComment
    : isDoctor
    ? bewe.doctorComment
    : "";

  const handleComment = async (comment: string) => {
    await commentBeweForm(cardId, comment).then(() => {
      setCommentSnackbarOpen(true);
    });
  };

  return (
    <Box>
      <Box
        display="flex"
        gap={2}
        mb={3}
        flexDirection="column"
        component={Paper}
        elevation={3}
        sx={{
          borderRadius: 2,
          padding: 3,
          backgroundColor: color.primary[400],
        }}
      >
        <TextField
          fullWidth
          color="secondary"
          label="Bewe Result"
          value={bewe.beweResult}
        />
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor DMFT/DMFS Comment"
          rows={3}
          value={bewe.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student DMFT/DMFS Comment"
            rows={3}
            value={bewe.studentComment ?? "No Comment Provided."}
          />
        )}
        {isUserEligibleToComment && (
          <Box mt={1} display="flex" justifyContent="flex-end">
            <Button
              color="secondary"
              startIcon={<Comment />}
              variant="outlined"
              onClick={() => setOpenCommentDialog(true)}
            >
              {comment ? "Edit Comment" : "Add Comment"}
            </Button>
          </Box>
        )}
      </Box>
      <BeweEditForm
        cardId={cardId}
        assessmentModel={bewe.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
      />
      <CommentForm
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title="Comment BEWE Form"
        description="Please provide your comment for the BEWE Form."
        handleSubmit={(comment) => {
          handleComment(comment);
        }}
        comment={comment}
      />
      <CustomSanckbar
        snackbarOpen={commentSnackbarOpen}
        snackbarClose={() => setCommentSnackbarOpen(false)}
        message="Comment has been successfully added."
      />
    </Box>
  );
});
