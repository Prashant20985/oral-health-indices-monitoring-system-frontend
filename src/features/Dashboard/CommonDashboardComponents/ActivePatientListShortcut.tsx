import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import PatientList from "../../PatientOperations/List/DataGrid/PatientList";
import { router } from "../../../app/router/Routes";
import { useTranslation } from "react-i18next";

/**
 * Renders the ActivePatientListShortcut component.
 * This component displays a list of active patients in a shortcut format on the dashboard.
 * It fetches the active patients from the patientStore and renders the PatientList component.
 * The component also includes a button to navigate to the active patients page.
 */
export default observer(function ActivePatientListShortcut() {
  const { patientStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  React.useEffect(() => {
    const fetchPatients = async () => {
      if (patientStore.activePatients.patients.length <= 0) {
        await patientStore.fetchActivePatients();
      }
    };
    fetchPatients();
  }, [patientStore]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.primary[900],
        }}
      >
        <Typography
          variant="h6"
          p={1}
          textTransform="uppercase"
          fontWeight={600}
        >
          {t("admin-operations.dashboard.active-patients.header")}
        </Typography>
        <PatientList
          patients={patientStore.activePatients}
          loading={patientStore.loading.activePatients}
          height="30vh"
          isDashboard={true}
          page={patientStore.activePatientsSerachParams.page}
          pageSize={patientStore.activePatientsSerachParams.pageSize}
          setPaginationParams={(page: number, pageSize: number) => {
            patientStore.setActivePatientsSearchParams({
              ...patientStore.activePatientsSerachParams,
              page: page,
              pageSize: pageSize,
            });
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/active-patients")}
            size="small"
          >
            {t("admin-operations.dashboard.active-patients.button")}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
