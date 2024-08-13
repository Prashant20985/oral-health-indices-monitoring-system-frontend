import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { colors } from "../../../themeConfig";
import {
  Medication,
  Download,
  Person2,
  Mail,
  Assessment,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Button,
  CardContent,
  useTheme,
  Grid,
  Stack,
  TextField,
  CardActions,
  CircularProgress,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { Add, Comment } from "@mui/icons-material";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import CommentForm from "../Forms/CommentForm";
import GradeCardForm from "../Forms/GradeCardForm";
import { useParams } from "react-router-dom";
import axiosAgent from "../../../app/api/axiosAgent";
import { useTranslation } from "react-i18next";

interface Props {
  patientExaminationCard: PatientExaminationCard;
  isUserEligibleToComment: boolean;
  isUserEligibleToEdit: boolean;
}

/**
 * Renders the header card for patient examination details.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {PatientExaminationCard} props.patientExaminationCard - The patient examination card.
 * @param {boolean} props.isUserEligibleToComment - Indicates if the user is eligible to comment.
 * @param {boolean} props.isUserEligibleToEdit - Indicates if the user is eligible to edit.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PatientExaminationDetailsHeaderCard({
  patientExaminationCard,
  isUserEligibleToComment,
  isUserEligibleToEdit,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const { id } = useParams<{ id: string }>();

  const {
    userStore: { user },
    patientExaminationCardStore: {
      commentPatientExaminationCard,
      gradePatientExaminationCard,
    },
    patientStore: { patientDetails, fetchPatientDetails },
  } = useStore();

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [openGradeDialog, setOpenGradeDialog] = React.useState(false);
  const [commentSnackbarOpen, setCommentSnackbarOpen] = React.useState(false);
  const [totalScoreSnackbarOpen, setTotalScoreSnackbarOpen] =
    React.useState(false);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchDetails = async () => {
      if (patientExaminationCard.patient === undefined) {
        await fetchPatientDetails(id!);
      }
    };
    fetchDetails();
  }, [fetchPatientDetails, id, patientExaminationCard.patient]);

  const isStudent = user?.role === "Student";
  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const comment = isStudent
    ? patientExaminationCard.studentComment
    : isDoctor
    ? patientExaminationCard.doctorComment
    : "";

  const handleComment = async (comment: string) => {
    await commentPatientExaminationCard(
      patientExaminationCard.id,
      comment
    ).then(() => {
      setCommentSnackbarOpen(true);
    });
  };

  const handleDownloadClick = async () => {
    setLoading(true);
    try {
      if (patientExaminationCard.patient === undefined) {
        if (patientDetails) {
          patientExaminationCard.patient = patientDetails;
        }
      }
      await axiosAgent.ExportOperations.exportExamaminationCard(
        patientExaminationCard
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTotalScore = async (totalScore: number) => {
    await gradePatientExaminationCard(
      patientExaminationCard.id,
      totalScore ?? 0
    ).then(() => {
      setTotalScoreSnackbarOpen(true);
    });
  };

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.grey[900],
          marginBottom: 2,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              variant="rounded"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
                width: 70,
                height: 70,
              }}
              aria-label="patient-card-avatar"
            >
              <Medication sx={{ fontSize: 40 }} />
            </Avatar>
          }
          title={
            <Box
              display="flex"
              alignItems="center"
              mb={1}
              justifyContent="space-between"
            >
              <Box display="flex" gap={6} alignItems="center">
                <Typography variant="h3" fontWeight="bold">
                  {new Date(
                    patientExaminationCard.dateOfExamination
                  ).toDateString()}
                </Typography>
                <Chip
                  size="small"
                  label={
                    <Typography
                      fontWeight={700}
                      sx={{ textTransform: "uppercase" }}
                    >
                      {patientExaminationCard.isRegularMode
                        ? "Regular Mode"
                        : "Test Mode"}
                    </Typography>
                  }
                  color="secondary"
                />
              </Box>
              {!isStudent && (
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={
                    loading ? (
                      <CircularProgress color="info" size={24} />
                    ) : (
                      <Download />
                    )
                  }
                  onClick={handleDownloadClick}
                  disabled={loading}
                >
                  {loading
                    ? t(
                        "examination-card-operations.details.patient-examination-details-header-card.downloading"
                      )
                    : t(
                        "examination-card-operations.details.patient-examination-details-header-card.download-button"
                      )}
                </Button>
              )}
            </Box>
          }
          subheader={
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="h5" fontWeight="bold">
                {t(
                  "examination-card-operations.details.patient-examination-details-header-card.patient-name"
                )}{" "}
                {patientExaminationCard.patientName}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} lg={3}>
              <Box component={Stack} spacing={1}>
                <Typography
                  variant="h5"
                  fontWeight={700}
                  textTransform={"uppercase"}
                >
                  {t(
                    "examination-card-operations.details.patient-examination-details-header-card.doctor-information"
                  )}
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <Person2 />
                  <Typography variant="h6" color="textSecondary">
                    {patientExaminationCard.doctorName.split("(")[0]}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <Mail />
                  <Typography variant="h6" color="textSecondary">
                    {
                      patientExaminationCard.doctorName
                        .split("(")[1]
                        .split(")")[0]
                    }
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={4} xs={12} lg={3}>
              {!patientExaminationCard.isRegularMode && (
                <Box component={Stack} spacing={1}>
                  <Typography
                    variant="h5"
                    fontWeight={700}
                    textTransform={"uppercase"}
                  >
                    {t(
                      "examination-card-operations.details.patient-examination-details-header-card.student-information"
                    )}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={6}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Person2 />
                      <Typography variant="h6" color="textSecondary">
                        {patientExaminationCard.studentName.split("(")[0]}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Assessment />
                      <Typography variant="h5" color="textSecondary">
                        {t(
                          "examination-card-operations.details.patient-examination-details-header-card.grade"
                        )}{" "}
                        {patientExaminationCard.totalScore ??
                          t(
                            "examination-card-operations.details.patient-examination-details-header-card.not-graded"
                          )}
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Mail />
                    <Typography variant="h6" color="textSecondary">
                      {
                        patientExaminationCard.studentName
                          .split("(")[1]
                          .split(")")[0]
                      }
                    </Typography>
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
          <Box mt={3} display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              multiline
              rows={3}
              color="secondary"
              label={t(
                "examination-card-operations.details.patient-examination-details-header-card.doctor-comment"
              )}
              value={
                patientExaminationCard.doctorComment ??
                t(
                  "examination-card-operations.details.patient-examination-details-header-card.no-comment"
                )
              }
            />
            {!patientExaminationCard.isRegularMode && (
              <TextField
                fullWidth
                multiline
                rows={3}
                color="secondary"
                label={t(
                  "examination-card-operations.details.patient-examination-details-header-card.student-comment"
                )}
                value={
                  patientExaminationCard.studentComment ??
                  t(
                    "examination-card-operations.details.patient-examination-details-header-card.no-comment"
                  )
                }
              />
            )}
          </Box>
        </CardContent>
        <CardActions sx={{ gap: 2, p: 2 }}>
          {isUserEligibleToEdit && !patientExaminationCard.isRegularMode && (
            <Button
              color="info"
              variant="outlined"
              startIcon={<Add />}
              onClick={() => setOpenGradeDialog(true)}
            >
              {patientExaminationCard.totalScore
                ? t(
                    "examination-card-operations.details.patient-examination-details-header-card.edit-grade"
                  )
                : t(
                    "examination-card-operations.details.patient-examination-details-header-card.grade-card"
                  )}
            </Button>
          )}
          {isUserEligibleToComment && (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={<Comment />}
              onClick={() => setOpenCommentDialog(true)}
            >
              {comment
                ? t(
                    "examination-card-operations.details.patient-examination-details-header-card.edit-comment"
                  )
                : t(
                    "examination-card-operations.details.patient-examination-details-header-card.add-comment"
                  )}
            </Button>
          )}
        </CardActions>
      </Card>
      <CommentForm
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t(
          "examination-card-operations.details.patient-examination-details-header-card.comment-examination-card"
        )}
        description={t(
          "examination-card-operations.details.patient-examination-details-header-card.description"
        )}
        handleSubmit={(comment) => {
          handleComment(comment);
        }}
        comment={comment}
      />
      <GradeCardForm
        isOpen={openGradeDialog}
        onClose={() => setOpenGradeDialog(false)}
        title={t(
          "examination-card-operations.details.patient-examination-details-header-card.grade-examination-card"
        )}
        description={`${t(
          "examination-card-operations.details.patient-examination-details-header-card.description2"
        )} ${patientExaminationCard.studentName}.`}
        totalScore={patientExaminationCard.totalScore ?? 0}
        handleSubmit={(totalScore) => {
          handleTotalScore(totalScore);
        }}
      />
      <CustomSanckbar
        snackbarOpen={commentSnackbarOpen}
        snackbarClose={() => setCommentSnackbarOpen(false)}
        message={t(
          "examination-card-operations.details.patient-examination-details-header-card.message"
        )}
      />
      <CustomSanckbar
        snackbarOpen={totalScoreSnackbarOpen}
        snackbarClose={() => setTotalScoreSnackbarOpen(false)}
        message={t(
          "examination-card-operations.details.patient-examination-details-header-card.message2"
        )}
      />
    </Box>
  );
});
