import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import { useParams } from "react-router-dom";
import { Alert, Box, Grid, Typography } from "@mui/material";
import StudentExamCard from "./StudentExamCard";

export default observer(function ExamsList() {
  const {
    studentExamStore: { groupedStudentExams, fetchStudentExams },
  } = useStore();

  const { id } = useParams<string>();

  React.useEffect(() => {
    if (id) {
      fetchStudentExams(id);
    }
  }, [fetchStudentExams, id]);

  return (
    <Box>
      {groupedStudentExams.length > 0 ? (
        <>
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
        </>
      ) : (
        <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
          No Exams Published
        </Alert>
      )}
    </Box>
  );
});
