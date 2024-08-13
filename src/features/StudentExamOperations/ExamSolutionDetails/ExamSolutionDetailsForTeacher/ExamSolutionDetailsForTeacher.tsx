import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useStore } from "../../../../app/stores/Store";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Tab,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PatientDetails from "../../../PatientOperations/PatientProfile/PatientDetails";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { colors } from "../../../../themeConfig";
import LoadingComponent from "../../../../app/common/loadingComponents/LoadingComponent";
import {
  AssignmentOutlined,
  Download,
  MessageOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";
import AddStudentMarksDialog from "../../Forms/AddStudentMarksDialog";
import PracticePatientDMFT_DMFSDetailsForTeacher from "./PracticePatientDMFT_DMFSDetailsForTeacher";
import PracticePatientBeweDetailsForTeacher from "./PracticePatientBeweDetailsForTeacher";
import PracticePatientAPIDetailsForTeacher from "./PracticePatientAPIDetailsForTeacher";
import PracticePatientBleedingDetailsForTeacher from "./PracticePatientBleedingDetailsForTeacher";
import axiosAgent from "../../../../app/api/axiosAgent";
import { useTranslation } from "react-i18next";

const RiskFactorAssessment = React.lazy(
  () => import("../../../IndexCalculationForms/RiskFactorAssessment")
);

const Summary = React.lazy(
  () => import("../../../IndexCalculationForms/SummaryForm")
);

/**
 * Renders the details of an exam solution for a teacher.
 * 
 * @returns JSX element representing the exam solution details for a teacher.
 */
export default observer(function ExamSolutionDetailsForTeacher() {
  const { cardId } = useParams<{ cardId: string }>();
  const [value, setValue] = React.useState("1");
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [openMarksDialog, setOpenMarksDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const {
    studentExamStore: {
      fetchExamCard,
      examCard,
      commentPracticePatientExaminationCard,
      gradeExaminationCard,
    },
  } = useStore();

  const handleComment = async (comment: string) => {
    if (examCard) {
      await commentPracticePatientExaminationCard(examCard.id, comment);
    }
  };

  const handleGrade = async (marks: number) => {
    if (examCard) {
      await gradeExaminationCard(examCard.id, marks);
    }
  };

  const handleDownloadClick = async () => {
    if (examCard) {
      setLoading(true);
      try {
        await axiosAgent.ExportOperations.exportExamSolution(examCard);
      } catch (error) {
        console.error(t("student-exam-operations.exam-solution-details-for-teacher.error-downloading-message"), error);
      } finally {
        setLoading(false);
      }
    }
  };

  React.useEffect(() => {
    if (cardId) {
      fetchExamCard(cardId);
    }
  }, [fetchExamCard, cardId]);

  return (
    <>
      {examCard && (
        <Box>
          <Card
            elevation={3}
            sx={{
              mb: 3,
              background:
                theme.palette.mode === "dark"
                  ? color.primary[400]
                  : blueGrey[50],
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? blueGrey[400]
                        : blueGrey[600],
                    width: 50,
                    height: 50,
                  }}
                >
                  <AssignmentOutlined />
                </Avatar>
              }
              title={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignContent="center"
                >
                  <Typography variant="h4">Exam Solution Details</Typography>
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
                    {loading ? t("student-exam-operations.exam-solution-details-for-teacher.loading-download-message"): t("student-exam-operations.exam-solution-details-for-teacher.download-button")}
                  </Button>
                </Box>
              }
              subheader={
                <Typography variant="h6">
                  {t("student-exam-operations.exam-solution-details-for-teacher.exam-solution-by")} {examCard?.studentName}
                </Typography>
              }
            />
            <CardContent>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ textTransform: "uppercase" }}
                  >
                    {t("student-exam-operations.exam-solution-details-for-teacher.student-mark")} {examCard.studentMark}
                  </Typography>
                </Box>
                <TextField
                  label={t("student-exam-operations.exam-solution-details-for-teacher.doctor-comment")}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  color="secondary"
                  value={examCard.doctorComment ?? t("student-exam-operations.exam-solution-details-for-teacher.no-comment")}
                  inputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Box
                display="flex"
                justifyContent="flex-end"
                gap={1}
                width="100%"
              >
                <Button
                  color={theme.palette.mode === "light" ? "info" : "secondary"}
                  variant="outlined"
                  size="small"
                  startIcon={<MessageOutlined />}
                  onClick={() => setOpenCommentDialog(true)}
                >
                  {examCard.doctorComment === null
                    ? t("student-exam-operations.exam-solution-details-for-teacher.add-comment")
                    : t("student-exam-operations.exam-solution-details-for-teacher.edit-comment")}
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenMarksDialog(true)}
                  startIcon={<SchoolOutlined />}
                >
                  {examCard.studentMark === 0 ? t("student-exam-operations.exam-solution-details-for-teacher.add-marks") : t("student-exam-operations.exam-solution-details-for-teacher.edit-marks")}
                </Button>
              </Box>
            </CardActions>
          </Card>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={(_e, newValue) => setValue(newValue)}
                TabIndicatorProps={{
                  style: {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? color.greenAccent[500]
                        : color.primary[500],
                  },
                }}
              >
                <Tab
                  label={
                    <Typography color={color.grey[100]}>
                      {t("student-exam-operations.exam-solution-details-for-teacher.patient-details")}
                    </Typography>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <Typography color={color.grey[100]}>
                      {t("student-exam-operations.exam-solution-details-for-teacher.risk-factor-assessment")}
                    </Typography>
                  }
                  value="2"
                />
                <Tab
                  label={
                    <Typography color={color.grey[100]}>DMFT/DMFS</Typography>
                  }
                  value="3"
                />
                <Tab
                  label={<Typography color={color.grey[100]}>BEWE</Typography>}
                  value="4"
                />
                <Tab
                  label={<Typography color={color.grey[100]}>API</Typography>}
                  value="5"
                />
                <Tab
                  label={
                    <Typography color={color.grey[100]}>Bleeding</Typography>
                  }
                  value="6"
                />
                <Tab
                  label={
                    <Typography color={color.grey[100]}>{t("student-exam-operations.exam-solution-details-for-teacher.summary")}</Typography>
                  }
                  value="7"
                />
              </TabList>
              <TabPanel value="1">
                <PatientDetails
                  patientDetails={examCard.practicePatient}
                  isPracticePatient
                />
              </TabPanel>
              <TabPanel value="2">
                <React.Suspense fallback={<LoadingComponent />}>
                  <RiskFactorAssessment
                    riskFactorAssessment={
                      examCard.practiceRiskFactorAssessment
                        .riskFactorAssessmentModel
                    }
                    isView
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="3">
                <React.Suspense fallback={<LoadingComponent />}>
                  <PracticePatientDMFT_DMFSDetailsForTeacher
                    dmft_dmfs={
                      examCard.practicePatientExaminationResult.dmfT_DMFS
                    }
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="4">
                <React.Suspense fallback={<LoadingComponent />}>
                  <PracticePatientBeweDetailsForTeacher
                    bewe={examCard.practicePatientExaminationResult.bewe}
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="5">
                <React.Suspense fallback={<LoadingComponent />}>
                  <PracticePatientAPIDetailsForTeacher
                    api={examCard.practicePatientExaminationResult.api}
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="6">
                <React.Suspense fallback={<LoadingComponent />}>
                  <PracticePatientBleedingDetailsForTeacher
                    bleeding={
                      examCard.practicePatientExaminationResult.bleeding
                    }
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="7">
                <React.Suspense fallback={<LoadingComponent />}>
                  <Summary summary={examCard.summary} isView />
                </React.Suspense>
              </TabPanel>
            </Box>
          </TabContext>
          <CommentStudentExamCardDialog
            isOpen={openCommentDialog}
            onClose={() => setOpenCommentDialog(false)}
            comment={examCard.doctorComment ?? ""}
            handleSubmit={handleComment}
            title={t("student-exam-operations.exam-solution-details-for-teacher.comment-practice-patient-examintation-card")}
            description={t("student-exam-operations.exam-solution-details-for-teacher.description")}
          />
          <AddStudentMarksDialog
            isOpen={openMarksDialog}
            onClose={() => setOpenMarksDialog(false)}
            title={t("student-exam-operations.exam-solution-details-for-teacher.add-student-marks")}
            description={t("student-exam-operations.exam-solution-details-for-teacher.student-mark-description")}
            marks={examCard.studentMark}
            handleSubmit={handleGrade}
          />
        </Box>
      )}
    </>
  );
});
