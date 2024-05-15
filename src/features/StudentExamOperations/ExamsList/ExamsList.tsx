import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import StudentExamCard from "./StudentExamCard";

export default observer(function ExamsList() {
  const {
    studentExamStore: { groupedStudentExams, fetchStudentExams, studentExams },
  } = useStore();

  const { id } = useParams<string>();

  React.useEffect(() => {
    if (id) {
      if (Array.from(studentExams.values()).length === 0) {
        fetchStudentExams(id);
      }
    }
  }, [fetchStudentExams, id, studentExams]);

  return (
    <Box>
      {groupedStudentExams.map(([group, exams]) => (
        <Box mb={1}>
          <Typography variant="h5" fontWeight="bold">
            {group}
          </Typography>
          <>
            <Grid container spacing={1} sx={{ p: 0.5, width: "100%" }}>
              {exams.map((exam) => (
                <Grid item md={6} lg={3} sm={12} xs={12} key={exam.id}>
                  <StudentExamCard exam={exam} />
                </Grid>
              ))}
            </Grid>
          </>
        </Box>
      ))}
    </Box>
  );
});
