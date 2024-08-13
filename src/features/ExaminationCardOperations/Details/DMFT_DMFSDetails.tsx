import { observer } from "mobx-react-lite";
import {
  DMFT_DMFSValues,
  UpdateDMFT_DMFSFormValues,
} from "../../../app/models/DMFT_DMFS";
import { Box, Button, Paper, TextField, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import DMFT_DMFSEditForm from "../Forms/DMFT_DMFSEditForm";
import { Comment } from "@mui/icons-material";
import React from "react";
import CommentForm from "../Forms/CommentForm";
import { useStore } from "../../../app/stores/Store";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  cardId: string;
  dmft_dmfs: DMFT_DMFSValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

/**
 * Renders the DMFT_DMFSDetails component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.cardId - The ID of the card.
 * @param {DMFT_DMFS} props.dmft_dmfs - The DMFT_DMFS data.
 * @param {boolean} props.isRegularMode - Indicates if the component is in regular mode.
 * @param {boolean} props.isUserEligibleToComment - Indicates if the user is eligible to comment.
 * @param {boolean} props.isUserEligibleToEdit - Indicates if the user is eligible to edit.
 * @param {Function} props.setIsEditMode - The function to set the edit mode.
 * @returns {JSX.Element} The rendered DMFT_DMFSDetails component.
 */
export default observer(function DMFT_DMFSDetails({
  cardId,
  dmft_dmfs,
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
    patientExaminationCardStore: { commentDMFT_DMFSForm },
  } = useStore();

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = React.useState(false);

  const updateDMFT_DMFSFromValues: UpdateDMFT_DMFSFormValues = {
    dmftResult: dmft_dmfs.dmftResult,
    dmfsResult: dmft_dmfs.dmfsResult,
    assessmentModel: dmft_dmfs.assessmentModel,
    prostheticStatus: dmft_dmfs.prostheticStatus,
  };

  const isStudent = user?.role === "Student";
  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const comment = isStudent
    ? dmft_dmfs.studentComment
    : isDoctor
    ? dmft_dmfs.doctorComment
    : "";

  const handleComment = async (comment: string) => {
    await commentDMFT_DMFSForm(cardId, comment).then(() => {
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
        <TextField
          multiline
          fullWidth
          color="secondary"
          label={t(
            "examination-card-operations.details.dmft-dmfs-details.doctor-dmft-dmfs-comment"
          )}
          rows={3}
          value={
            dmft_dmfs.doctorComment ??
            t(
              "examination-card-operations.details.dmft-dmfs-details.no-comment"
            )
          }
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label={t(
              "examination-card-operations.details.dmft-dmfs-details.student-dmft-dmfs-comment"
            )}
            rows={3}
            value={
              dmft_dmfs.studentComment ??
              t(
                "examination-card-operations.details.dmft-dmfs-details.no-comment"
              )
            }
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
              {comment
                ? t(
                    "examination-card-operations.details.dmft-dmfs-details.edit-comment"
                  )
                : t(
                    "examination-card-operations.details.dmft-dmfs-details.add-comment"
                  )}
            </Button>
          </Box>
        )}
      </Box>
      <DMFT_DMFSEditForm
        cardId={cardId}
        updateDMFT_DMFSFromValues={updateDMFT_DMFSFromValues}
        setIsEditMode={setIsEditMode}
        isUserEligibleToEdit={isUserEligibleToEdit}
      />
      <CommentForm
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t(
          "examination-card-operations.details.dmft-dmfs-details.comment-dmft-dmfs-form"
        )}
        description={t(
          "examination-card-operations.details.dmft-dmfs-details.description"
        )}
        handleSubmit={(comment) => {
          handleComment(comment);
        }}
        comment={comment}
      />
      <CustomSanckbar
        snackbarOpen={commentSnackbarOpen}
        snackbarClose={() => setCommentSnackbarOpen(false)}
        message={t(
          "examination-card-operations.details.dmft-dmfs-details.message"
        )}
      />
    </Box>
  );
});
