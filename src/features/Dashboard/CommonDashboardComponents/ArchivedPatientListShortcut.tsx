import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import PatientList from "../../PatientOperations/List/DataGrid/PatientList";
import { router } from "../../../app/router/Routes";
import { useTranslation } from "react-i18next";

/**
 * Renders a shortcut component for the archived patient list in the dashboard.
 * Fetches archived patients from the patient store and displays them in a list.
 * Provides a button to navigate to the archived patients page.
 */
export default observer(function ArchivedPatientListShortcut() {
  const { patientStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchPatients = async () => {
      if (patientStore.archivedPatients.patients.length <= 0) {
        await patientStore.fetchArchivedPatients();
      }
    };
    fetchPatients();
  }, [patientStore]);

  const [t] = useTranslation("global");

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
          {t("admin-operations.dashboard.archived-patients.header")}
        </Typography>
        <PatientList
          patients={patientStore.archivedPatients}
          loading={patientStore.loading.archivedPatients}
          height="30vh"
          isDashboard={true}
          page={patientStore.archivedPatientsSearchParams.page}
          pageSize={patientStore.archivedPatientsSearchParams.pageSize}
          setPaginationParams={(page: number, pageSize: number) => {
            patientStore.setArchivedPatientsSearchParams({
              ...patientStore.archivedPatientsSearchParams,
              page: page,
              pageSize: pageSize,
            });
          }}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/archived-patients")}
            size="small"
          >
            {t("admin-operations.dashboard.archived-patients.button")}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
