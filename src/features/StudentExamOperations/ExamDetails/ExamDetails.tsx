import { observer } from "mobx-react-lite";
import ExamSolutionList from "./ExamSolutionList";
import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/Store";
import { Box, Grid } from "@mui/material";
import StudentExamCard from "../ExamsList/StudentExamCard";
import ExamResults from "./ExamResults";

/**
 * Renders the details of an exam.
 *
 * @returns The ExamDetails component.
 */
export default observer(function ExamDetails() {
  const {
    studentExamStore: {
      examCards,
      fetchExamCards,
      examDetails,
      fetchExamDetails,
      fetchExamResults,
      examResults,
      loading,
    },
  } = useStore();

  const { examId } = useParams<string>();

  React.useEffect(() => {
    if (examId) {
      fetchExamCards(examId);
      fetchExamDetails(examId);
    }
  }, [fetchExamCards, fetchExamDetails, examId]);

  React.useEffect(() => {
    if (examId) {
      fetchExamResults(examId);
    }
  }, [fetchExamResults, examId]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={6} lg={6} sm={12}>
          <Box display="flex" flexDirection="column" gap={1}>
            {examDetails && (
              <StudentExamCard exam={examDetails} isExamDetails />
            )}
          </Box>
          <Box mt={1}>
            {examDetails && (
              <ExamResults
                examDetails={examDetails}
                studentExamResults={examResults}
                loading={loading.studentExamResults}
              />
            )}
          </Box>
        </Grid>
        <Grid item lg={6} md={6} sm={12}>
          {examCards && examId && (
            <ExamSolutionList examSolutions={examCards} examId={examId} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
});
