import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import AddPatientButton from "../../Dashboard/CommonDashboardComponents/AddPatientButton";
import Header from "../../../app/common/header/Header";
import ActivePatientListShortcut from "../../Dashboard/CommonDashboardComponents/ActivePatientListShortcut";
import ArchivedPatientListShortcut from "../../Dashboard/CommonDashboardComponents/ArchivedPatientListShortcut";
import { useStore } from "../../../app/stores/Store";
import UpcomingExams from "../StudentGroupsList/UpcomingExams";
import React from "react";
import UserRequestShortcut from "../../Dashboard/CommonDashboardComponents/UserRequestShortcut";

export default observer(function StudentDashboard() {
  const {
    studentStore: { getTop3ExamsByDate, fetchStudentGroupsWithExams },
  } = useStore();

  React.useEffect(() => {
    fetchStudentGroupsWithExams();
  }, [fetchStudentGroupsWithExams]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header title="Student Dashboard" />
        <AddPatientButton />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <UpcomingExams top3Exams={getTop3ExamsByDate} direction="row" />
        </Grid>
        <ActivePatientListShortcut />
        <ArchivedPatientListShortcut />
        <UserRequestShortcut />
      </Grid>
    </Box>
  );
});
