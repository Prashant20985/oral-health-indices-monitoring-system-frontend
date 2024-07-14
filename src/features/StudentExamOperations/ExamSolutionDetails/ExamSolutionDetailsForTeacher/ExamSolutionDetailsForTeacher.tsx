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
  Tab,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PatientDetails from "../../../PatientOperations/PatientProfile/PatientDetails";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { colors } from "../../../../themeConfig";
import ButtonLoadingComponent from "../../../../app/common/loadingComponents/ButtonLoadingComponent";
import {
  AssignmentOutlined,
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

const RiskFactorAssessment = React.lazy(
  () => import("../../../IndexCalculationForms/RiskFactorAssessment")
);

const Summary = React.lazy(
  () => import("../../../IndexCalculationForms/SummaryForm")
);

export default observer(function ExamSolutionDetailsForTeacher() {
  const { cardId } = useParams<{ cardId: string }>();
  const [value, setValue] = React.useState("1");
  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);
  const [openMarksDialog, setOpenMarksDialog] = React.useState(false);

  const theme = useTheme();
  const color = colors(theme.palette.mode);

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
                <Typography variant="h4">Exam Solution Details</Typography>
              }
              subheader={
                <Typography variant="h6">
                  Exam Solution by {examCard?.studentName}
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
                    Student Mark: {examCard.studentMark}
                  </Typography>
                </Box>
                <TextField
                  label="Doctor's Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  color="secondary"
                  value={examCard.doctorComment ?? "No Comment Yet."}
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
                    ? "Add Comment"
                    : "Edit Comment"}
                </Button>
                <Button
                  color="success"
                  variant="outlined"
                  size="small"
                  onClick={() => setOpenMarksDialog(true)}
                  startIcon={<SchoolOutlined />}
                >
                  {examCard.studentMark === 0 ? "Add Marks" : "Edit Marks"}
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
                      Patient Details
                    </Typography>
                  }
                  value="1"
                />
                <Tab
                  label={
                    <Typography color={color.grey[100]}>
                      Risk Factor Assessment
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
                    <Typography color={color.grey[100]}>Summary</Typography>
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
                <React.Suspense fallback={<ButtonLoadingComponent />}>
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
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientDMFT_DMFSDetailsForTeacher
                    dmft_dmfs={
                      examCard.practicePatientExaminationResult.dmfT_DMFS
                    }
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="4">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientBeweDetailsForTeacher
                    bewe={examCard.practicePatientExaminationResult.bewe}
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="5">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientAPIDetailsForTeacher
                    api={examCard.practicePatientExaminationResult.api}
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="6">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientBleedingDetailsForTeacher
                    bleeding={
                      examCard.practicePatientExaminationResult.bleeding
                    }
                    cardId={examCard.id}
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="7">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
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
            title="Comment Practice Patient Examination Card"
            description="To comment on the practice patient examination card, please fill in the form below."
          />
          <AddStudentMarksDialog
            isOpen={openMarksDialog}
            onClose={() => setOpenMarksDialog(false)}
            title="Add Student Marks"
            description="Please enter the student marks below."
            marks={examCard.studentMark}
            handleSubmit={handleGrade}
          />
        </Box>
      )}
    </>
  );
});
