import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import AddPatientButton from "../../Dashboard/CommonDashboardComponents/AddPatientButton";
import Header from "../../../app/common/header/Header";
import ActivePatientListShortcut from "../../Dashboard/CommonDashboardComponents/ActivePatientListShortcut";
import ArchivedPatientListShortcut from "../../Dashboard/CommonDashboardComponents/ArchivedPatientListShortcut";
import UpcomingExams from "../StudentGroupsList/UpcomingExams";
import UserRequestShortcut from "../../Dashboard/CommonDashboardComponents/UserRequestShortcut";
import { useTranslation } from "react-i18next";

export default observer(function StudentDashboard() {
  const [t] = useTranslation("global");

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header title={t("student-operations.dashboard.title")} />
        <AddPatientButton />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
            <UpcomingExams direction="row" />
        </Grid>
        <ActivePatientListShortcut />
        <ArchivedPatientListShortcut />
        <UserRequestShortcut />
      </Grid>
    </Box>
  );
});
