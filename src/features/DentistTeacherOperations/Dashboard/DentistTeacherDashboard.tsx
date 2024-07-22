import { Box, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import Header from "../../../app/common/header/Header";
import AddPatientButton from "../../Dashboard/CommonDashboardComponents/AddPatientButton";
import ArchivedPatientListShortcut from "../../Dashboard/CommonDashboardComponents/ArchivedPatientListShortcut";
import ActivePatientListShortcut from "../../Dashboard/CommonDashboardComponents/ActivePatientListShortcut";
import UserRequestShortcut from "../../Dashboard/CommonDashboardComponents/UserRequestShortcut";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import PatientExaminationCardsList from "../../ExaminationCardOperations/List/PatientExaminationCardsList";
import { colors } from "../../../themeConfig";

export default observer(function DentistTeacherDashboard() {
  const {
    patientExaminationCardStore: {
      getPatientExaminationCardsAssignedToDoctor,
      getTop4PatientExaminationCardsAssignedToDoctor,
      loading,
    },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchCards = async () => {
      await getPatientExaminationCardsAssignedToDoctor();
    };
    fetchCards();
  }, [getPatientExaminationCardsAssignedToDoctor]);

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Header title="Dentist Teacher Dashboard" />
        <AddPatientButton />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.primary[500]
                  : color.primary[900],
              minHeight: "25vh",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                p={1}
                textTransform="uppercase"
                fontWeight={600}
              >
                Assigned Cards
              </Typography>
            </Box>
            <Divider />
            <PatientExaminationCardsList
              patientExaminationCards={
                getTop4PatientExaminationCardsAssignedToDoctor
              }
              loading={loading.getPatientExaminationCardsAssignedToDoctor}
            />
          </Paper>
        </Grid>
        <ActivePatientListShortcut />
        <ArchivedPatientListShortcut />
        <UserRequestShortcut />
      </Grid>
    </Box>
  );
});
