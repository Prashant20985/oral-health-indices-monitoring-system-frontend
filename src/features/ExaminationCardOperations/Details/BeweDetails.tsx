import { observer } from "mobx-react-lite";
import { BeweValues } from "../../../app/models/Bewe";
import { Box, Button, Grid, Paper, TextField, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import { Comment } from "@mui/icons-material";
import BeweEditForm from "../Forms/BeweEditForm";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import CommentForm from "../Forms/CommentForm";
import { useTranslation } from "react-i18next";

interface Props {
  cardId: string;
  bewe: BeweValues;
  isRegularMode?: boolean;
  setIsEditMode: (value: boolean) => void;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

/**
 * Renders the details of a Bewe card.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.cardId - The ID of the card.
 * @param {Bewe} props.bewe - The Bewe object.
 * @param {boolean} props.isRegularMode - Indicates if the component is in regular mode.
 * @param {boolean} props.isUserEligibleToComment - Indicates if the user is eligible to comment.
 * @param {boolean} props.isUserEligibleToEdit - Indicates if the user is eligible to edit.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsEditMode - The state setter for edit mode.
 * @returns {JSX.Element} The rendered component.
 */
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

  const [t] = useTranslation("global");

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
          label={t(
            "examination-card-operations.details.bewe-details.bewe-result"
          )}
          value={bewe.beweResult}
        />
        <Grid container spacing={2}>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S1"
              value={bewe.sectant1}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S2"
              value={bewe.sectant2}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S3"
              value={bewe.sectant3}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S6"
              value={bewe.sectant6}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S5"
              value={bewe.sectant5}
            />
          </Grid>
          <Grid item xs={4} lg={4} md={6}>
            <TextField
              fullWidth
              color="secondary"
              label="S4"
              value={bewe.sectant4}
            />
          </Grid>
        </Grid>
        <TextField
          multiline
          fullWidth
          color="secondary"
          label={t(
            "examination-card-operations.details.bewe-details.doctor-bewe-comment"
          )}
          rows={3}
          value={
            bewe.doctorComment ??
            t("examination-card-operations.details.bewe-details.no-comment")
          }
        />
        {!isRegularMode && (
          <TextField
            multiline
            fullWidth
            color="secondary"
            label={t(
              "examination-card-operations.details.bewe-details.student-bewe-comment"
            )}
            rows={3}
            value={
              bewe.studentComment ??
              t("examination-card-operations.details.bewe-details.no-comment")
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
                    "examination-card-operations.details.bewe-details.edit-comment"
                  )
                : t(
                    "examination-card-operations.details.bewe-details.add-comment"
                  )}
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
        title={t(
          "examination-card-operations.details.bewe-details.comment-bewe-form"
        )}
        description={t(
          "examination-card-operations.details.bewe-details.description"
        )}
        handleSubmit={(comment) => {
          handleComment(comment);
        }}
        comment={comment}
      />
      <CustomSanckbar
        snackbarOpen={commentSnackbarOpen}
        snackbarClose={() => setCommentSnackbarOpen(false)}
        message={t("examination-card-operations.details.bewe-details.message")}
      />
    </Box>
  );
});
