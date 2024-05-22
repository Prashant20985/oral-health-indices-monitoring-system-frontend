import { observer } from "mobx-react-lite";
import ExamSolutionList from "./ExamSolutionList";
import React from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, useTheme } from "@mui/material";
import StudentExamCard from "../ExamsList/StudentExamCard";
import MarkAsGradedConformationDialog from "../Forms/MarkAsGradedConformationDialog";

export default observer(function ExamDetails() {
  const {
    studentExamStore: {
      examCards,
      fetchExamCards,
      examDetails,
      fetchExamDetails,
    },
  } = useStore();

  const theme = useTheme();

  const { examId } = useParams<string>();

  const [openMarkAsGradedDialog, setOpenMarkAsGradedDialog] =
    React.useState(false);

  React.useEffect(() => {
    if (examId) {
      fetchExamCards(examId);
      fetchExamDetails(examId);
    }
  }, [fetchExamCards, fetchExamDetails, examId]);

  const hasExamEnded = (
    dateOfExamination: Date | null,
    endTime: string
  ): boolean => {
    if (!dateOfExamination) return false;

    // Combine dateOfExamination and endTime into a single Date object
    const endDateTime = new Date(
      dateOfExamination.getFullYear(),
      dateOfExamination.getMonth(),
      dateOfExamination.getDate(),
      ...endTime.split(":").map(Number)
    );

    console.log(endDateTime);

    // Get the current date and time
    const now = new Date();

    // Check if the current date and time is greater than endDateTime
    return now > endDateTime;
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} sm={4}>
          <Box display="flex" flexDirection="column" gap={1}>
            {examDetails && (
              <StudentExamCard exam={examDetails} isExamDetails />
            )}
            {examDetails?.examStatus === "Published" &&
              hasExamEnded(
                new Date(examDetails.dateOfExamination),
                examDetails.endTime
              ) && (
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color={theme.palette.mode === "dark" ? "secondary" : "info"}
                    size="small"
                    onClick={() => setOpenMarkAsGradedDialog(true)}
                  >
                    Mark as Graded
                  </Button>
                </Box>
              )}
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sm={8}>
          {examCards && examId && (
            <ExamSolutionList examSolutions={examCards} examId={examId} />
          )}
        </Grid>
      </Grid>
      <MarkAsGradedConformationDialog
        isOpen={openMarkAsGradedDialog}
        onClose={() => setOpenMarkAsGradedDialog(false)}
        examId={examDetails?.id ? examDetails.id : ""}
      />
    </Box>
  );
});
