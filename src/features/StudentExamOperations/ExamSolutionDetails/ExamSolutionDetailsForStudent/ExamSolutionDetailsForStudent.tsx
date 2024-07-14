import { observer } from "mobx-react-lite";
import React from "react";
import { Alert, Box, Grid, Tab, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { colors } from "../../../../themeConfig";
import { useStore } from "../../../../app/stores/Store";
import StudentExamCard from "../../ExamsList/StudentExamCard";
import { Info, Warning } from "@mui/icons-material";
import StudentGradeCard from "./StudentGradeCard";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ButtonLoadingComponent from "../../../../app/common/loadingComponents/ButtonLoadingComponent";
import PatientDetails from "../../../PatientOperations/PatientProfile/PatientDetails";
import { CheckExamStatus } from "../../../../app/helper/CheckExamStatus";

const RiskFactorAssessment = React.lazy(
  () => import("../../../IndexCalculationForms/RiskFactorAssessment")
);

const PracticePatientDMFT_DMFSDetailsForStudent = React.lazy(
  () => import("./PracticePatientDMFT_DMFSDetailsForStudent")
);

const PracticePatientBeweDetailsForStudent = React.lazy(
  () => import("./PracticePatientBeweDetailsForStudent")
);

const PracticePatientAPIDetailsForStudent = React.lazy(
  () => import("./PracticePatientAPIDetailsForStudent")
);

const PracticePatientBleedingDetailsForStudent = React.lazy(
  () => import("./PracticePatientBleedingDetailsForStudent")
);

const Summary = React.lazy(
  () => import("../../../IndexCalculationForms/SummaryForm")
);

export default observer(function ExamSolutionDetailsForStudent() {
  const { examId } = useParams();
  const { studentExamStore } = useStore();
  const {
    fetchExamSolutionByStudent,
    fetchExamDetails,
    examDetails,
    examSolutionByStudent,
    clearExamDetails,
    clearExamSolutionByStudent,
    checkEligibilityToSubmitExam,
    isEligibleToSubmitExam,
  } = studentExamStore;

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    if (examId) {
      fetchExamDetails(examId);
    }
    return () => clearExamDetails();
  }, [examId, fetchExamDetails, clearExamDetails]);

  React.useEffect(() => {
    if (examDetails) {
      const { ended, ongoing } = CheckExamStatus(
        examDetails.dateOfExamination.toString(),
        examDetails.endTime,
        examDetails.startTime
      );
      if (ongoing && examId) {
        checkEligibilityToSubmitExam(examId);
      }
      if (ended && examDetails.examStatus === "Graded" && examId) {
        fetchExamSolutionByStudent(examId);
      }
    }
    return () => clearExamSolutionByStudent();
  }, [
    examDetails,
    examId,
    fetchExamSolutionByStudent,
    clearExamSolutionByStudent,
    checkEligibilityToSubmitExam,
  ]);

  if (!examDetails) return null;

  const { ongoing, ended, started } = CheckExamStatus(
    examDetails.dateOfExamination.toString(),
    examDetails.endTime,
    examDetails.startTime
  );

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={6} md={6}>
          <StudentExamCard exam={examDetails} isExamDetails isForStudentUser />
        </Grid>
        {ended && (
          <Grid item xs={12} lg={6} md={6}>
            {examDetails.examStatus === "Graded" ? (
              examSolutionByStudent !== null ? (
                <StudentGradeCard
                  studentMark={examSolutionByStudent.studentMark}
                  doctorName={examSolutionByStudent.doctorName}
                  doctorComment={examSolutionByStudent.doctorComment}
                  subheader=""
                />
              ) : (
                <StudentGradeCard
                  studentMark={0}
                  doctorName=""
                  doctorComment="You have not submitted your solution for this exam."
                  subheader="Solution Not Submitted"
                />
              )
            ) : (
              <StudentGradeCard
                studentMark={0}
                doctorName=""
                doctorComment="This exam has not been graded yet."
                subheader="Not Graded Yet"
              />
            )}
          </Grid>
        )}
        {!started && (
          <Grid item xs={12} lg={6} md={6}>
            <StudentGradeCard
              studentMark={0}
              doctorName=""
              doctorComment="Exam hasn't started yet.."
              subheader="Not Started Yet"
            />
          </Grid>
        )}
        {started && !ended && (
          <Grid item xs={12} lg={6} md={6}>
            <StudentGradeCard
              studentMark={0}
              doctorName=""
              subheader="Exam has started..."
              doctorComment=""
              isExamGoingOn
              isEligibleForExam={isEligibleToSubmitExam}
              examId={examId}
            />
          </Grid>
        )}
      </Grid>
      <Box sx={{ mt: 2 }}>
        {!started ? (
          <Alert
            severity="warning"
            variant="outlined"
            icon={<Warning color="warning" />}
          >
            <Typography variant="h6">The exam has not started yet.</Typography>
          </Alert>
        ) : ended && examDetails.examStatus === "Published" ? (
          <Alert
            severity="info"
            variant="outlined"
            icon={<Warning color="info" />}
          >
            <Typography variant="h6">Exam Not Graded Yet</Typography>
          </Alert>
        ) : ended && examSolutionByStudent === null ? (
          <Alert
            severity="info"
            variant="outlined"
            icon={<Warning color="info" />}
          >
            <Typography variant="h6">Solution Not Submitted</Typography>
          </Alert>
        ) : ongoing ? (
          <Alert
            severity="info"
            variant="outlined"
            icon={<Info color="info" />}
          >
            <Typography variant="h6">Exam Has Started</Typography>
          </Alert>
        ) : ended &&
          examDetails.examStatus === "Graded" &&
          examSolutionByStudent ? (
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
                  patientDetails={examSolutionByStudent.practicePatient}
                  isPracticePatient
                />
              </TabPanel>
              <TabPanel value="2">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <RiskFactorAssessment
                    isView
                    riskFactorAssessment={
                      examSolutionByStudent.practiceRiskFactorAssessment
                        .riskFactorAssessmentModel
                    }
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="3">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientDMFT_DMFSDetailsForStudent
                    dmft_dmfs={
                      examSolutionByStudent.practicePatientExaminationResult
                        .dmfT_DMFS
                    }
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="4">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientBeweDetailsForStudent
                    bewe={
                      examSolutionByStudent.practicePatientExaminationResult
                        .bewe
                    }
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="5">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientAPIDetailsForStudent
                    api={
                      examSolutionByStudent.practicePatientExaminationResult.api
                    }
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="6">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <PracticePatientBleedingDetailsForStudent
                    bleeding={
                      examSolutionByStudent.practicePatientExaminationResult
                        .bleeding
                    }
                  />
                </React.Suspense>
              </TabPanel>
              <TabPanel value="7">
                <React.Suspense fallback={<ButtonLoadingComponent />}>
                  <Summary summary={examSolutionByStudent.summary} isView />
                </React.Suspense>
              </TabPanel>
            </Box>
          </TabContext>
        ) : null}
      </Box>
    </Box>
  );
});
