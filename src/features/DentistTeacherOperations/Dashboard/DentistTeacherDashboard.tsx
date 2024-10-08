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
import { useTranslation } from "react-i18next";

/**
 * Renders the DentistTeacherDashboard component.
 *
 * This component displays the dashboard for the dentist or teacher operations.
 * It fetches and displays the patient examination cards assigned to the doctor.
 *
 * @returns The DentistTeacherDashboard component.
 */
export default observer(function DentistTeacherDashboard() {
  const [t] = useTranslation("global");

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
        <Header title={t("dentist-teacher-operations.dashboard.header")} />
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
                  : color.primary[400],
              minHeight: "25vh",
              maxHeight: "50vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Sticky Header */}
            <Box sx={{ position: "sticky", top: 0, zIndex: 1, backgroundColor: "transparent" }}>
              <Typography
                variant="h6"
                p={1}
                textTransform="uppercase"
                fontWeight={600}
              >
                {t("dentist-teacher-operations.dashboard.assigned-cards")}
              </Typography>
              <Divider />
            </Box>

            {/* Scrollable Content */}
            <Box
              sx={{
                overflowY: "auto",
                flexGrow: 1,
              }}
            >
              <PatientExaminationCardsList
                patientExaminationCards={
                  getTop4PatientExaminationCardsAssignedToDoctor
                }
                loading={loading.getPatientExaminationCardsAssignedToDoctor}
              />
            </Box>
          </Paper>
        </Grid>
        <ActivePatientListShortcut />
        <ArchivedPatientListShortcut />
        <UserRequestShortcut />
      </Grid>
    </Box>
  );
});
