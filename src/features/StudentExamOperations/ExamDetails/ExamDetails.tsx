import { observer } from "mobx-react-lite";
import ExamSolutionList from "./ExamSolutionList";
import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/Store";
import { Box, Grid } from "@mui/material";
import StudentExamCard from "../ExamsList/StudentExamCard";

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
    },
  } = useStore();

  const { examId } = useParams<string>();

  React.useEffect(() => {
    if (examId) {
      fetchExamCards(examId);
      fetchExamDetails(examId);
    }
  }, [fetchExamCards, fetchExamDetails, examId]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sm={4}>
          <Box display="flex" flexDirection="column" gap={1}>
            {examDetails && (
              <StudentExamCard exam={examDetails} isExamDetails />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sm={8}>
          {examCards && examId && (
            <ExamSolutionList examSolutions={examCards} examId={examId} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
});
