import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import PatientList from "../../PatientOperations/List/DataGrid/PatientList";
import { router } from "../../../app/router/Routes";

export default observer(function ArchivedPatientListShortcut() {
  const { patientStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchPatients = async () => {
      if (patientStore.archivedPatients.length <= 0) {
        await patientStore.fetchArchivedPatients();
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
          Archived Patients
        </Typography>
        <PatientList
          patients={patientStore.archivedPatients}
          loading={patientStore.loading.archivedPatients}
          height="30vh"
          isDashboard={true}
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/archived-patients")}
            size="small"
          >
            View All
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
