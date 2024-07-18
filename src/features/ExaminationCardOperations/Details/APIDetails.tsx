import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import {
  Box,
  Button,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { APIValues } from "../../../app/models/APIBleeding";
import { Comment } from "@mui/icons-material";
import APIBleedingEditForm from "../Forms/APIBleedingEditForm";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import CommentForm from "../Forms/CommentForm";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";

interface Props {
  cardId: string;
  api: APIValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function APIDetails({
  cardId,
  api,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userStore: { user },
    patientExaminationCardStore: { commentAPIForm },
  } = useStore();

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = React.useState(false);

  const isStudent = user?.role === "Student";
  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const comment = isStudent
    ? api.studentComment
    : isDoctor
    ? api.doctorComment
    : "";

  const handleComment = async (comment: string) => {
    await commentAPIForm(cardId, comment).then(() => {
      setCommentSnackbarOpen(true);
    });
  };

  return (
    <Box width="100%">
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
        <Box display="flex" gap={1}>
          <TextField
            fullWidth
            color="secondary"
            label="API Result"
            value={api.apiResult}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Maxilla"
            value={api.maxilla}
          />
          <TextField
            fullWidth
            color="secondary"
            label="Mandible"
            value={api.mandible}
          />
        </Box>
        <TextField
          multiline
          fullWidth
          color="secondary"
          label="Doctor API Comment"
          rows={3}
          value={api.doctorComment ?? "No Comment Provided."}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label="Student API Comment"
            rows={3}
            value={api.studentComment ?? "No Comment Provided."}
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
      <APIBleedingEditForm
        cardId={cardId}
        assessmentModel={api.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
        isAPIForm
      />
      <CommentForm
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title="Comment API Form"
        description="Please provide your comment for the API Form."
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
