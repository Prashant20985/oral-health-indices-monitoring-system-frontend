import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import PatientList from "../DataGrid/PatientList";
import PatientListFilter from "../Filter/PatientListFilter";

export default observer(function ActivePatientsList() {
  const {
    patientStore: {
      fetchActivePatients,
      loading,
      activePatients,
      activePatientsSerachParams,
      setActivePatientsSearchParams,
      clearActivePatientNameSearch,
      clearActivePatientEmailSearch,
    },
  } = useStore();

  React.useEffect(() => {
    fetchActivePatients();
  }, [fetchActivePatients]);

  return (
    <Box>
      <PatientListFilter
        title="Active Patients"
        subTitle="List Of Active Patients"
        searchTerm={activePatientsSerachParams}
        setSearchTerm={setActivePatientsSearchParams}
        clearEmailSearch={clearActivePatientEmailSearch}
        clearNameSearch={clearActivePatientNameSearch}
      />
      <PatientList patients={activePatients} loading={loading.activePatients} />
    </Box>
  );
});
