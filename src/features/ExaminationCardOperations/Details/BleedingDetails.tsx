import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import {
  Box,
  Button,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { Comment } from "@mui/icons-material";
import { BleedingValues } from "../../../app/models/APIBleeding";
import APIBleedingEditForm from "../Forms/APIBleedingEditForm";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import CommentForm from "../Forms/CommentForm";
import { useTranslation } from "react-i18next";

interface Props {
  cardId: string;
  bleeding: BleedingValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

/**
 * Renders the bleeding details component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.cardId - The ID of the card.
 * @param {Bleeding} props.bleeding - The bleeding details.
 * @param {boolean} props.isRegularMode - Indicates if it's in regular mode.
 * @param {boolean} props.isUserEligibleToComment - Indicates if the user is eligible to comment.
 * @param {boolean} props.isUserEligibleToEdit - Indicates if the user is eligible to edit.
 * @param {Function} props.setIsEditMode - The function to set the edit mode.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function BleedingDetails({
  cardId,
  bleeding,
  isRegularMode,
  isUserEligibleToComment,
  isUserEligibleToEdit,
  setIsEditMode,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");

  const {
    userStore: { user },
    patientExaminationCardStore: { commentBleedingForm },
  } = useStore();

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = React.useState(false);

  const isStudent = user?.role === "Student";
  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const comment = isStudent
    ? bleeding.studentComment
    : isDoctor
    ? bleeding.doctorComment
    : "";

  const handleComment = async (comment: string) => {
    await commentBleedingForm(cardId, comment).then(() => {
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
            label={t("examination-card-operations.details.bleeding-details.bleeding-result")}
            value={bleeding.bleedingResult}
          />
          <TextField
            fullWidth
            color="secondary"
            label={t("examination-card-operations.details.bleeding-details.maxilla")}
            value={bleeding.maxilla}
          />
          <TextField
            fullWidth
            color="secondary"
            label={t("examination-card-operations.details.bleeding-details.mandible")}
            value={bleeding.mandible}
          />
        </Box>
        <TextField
          multiline
          fullWidth
          color="secondary"
          label={t("examination-card-operations.details.bleeding-details.doctor-bleeding-comment")}
          rows={3}
          value={bleeding.doctorComment ?? t("examination-card-operations.details.bleeding-details.no-comment")}
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label={t("examination-card-operations.details.bleeding-details.student-bleeding-comment")}
            rows={3}
            value={bleeding.studentComment ?? t("examination-card-operations.details.bleeding-details.no-comment")}
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
              {comment ? t("examination-card-operations.details.bleeding-details.edit-comment"): t("examination-card-operations.details.bleeding-details.add-comment")}
            </Button>
          </Box>
        )}
      </Box>
      <APIBleedingEditForm
        cardId={cardId}
        assessmentModel={bleeding.assessmentModel}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
        isAPIForm={false}
      />
      <CommentForm
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t("examination-card-operations.details.bleeding-details.comment-bleeding-form")}
        description={t("examination-card-operations.details.bleeding-details.description")}
        handleSubmit={(comment) => {
          handleComment(comment);
        }}
        comment={comment}
      />
      <CustomSanckbar
        snackbarOpen={commentSnackbarOpen}
        snackbarClose={() => setCommentSnackbarOpen(false)}
        message={t("examination-card-operations.details.bleeding-details.message")}
      />
    </Box>
  );
});
