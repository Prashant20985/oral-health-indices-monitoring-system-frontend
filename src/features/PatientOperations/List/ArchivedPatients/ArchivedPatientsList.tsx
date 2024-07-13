import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import PatientListFilter from "../Filters/PatientListFilter";
import PatientList from "../DataGrid/PatientList";

export default observer(function ArchivedPatientsList() {
  const {
    patientStore: {
      fetchArchivedPatients,
      loading,
      archivedPatients,
      archivedPatientsSearchParams,
      setArchivedPatientsSearchParams,
      clearArchivedPatientNameSearch,
      clearArchivedPatientEmailSearch,
    },
  } = useStore();

  React.useEffect(() => {
    fetchArchivedPatients();
  }, [fetchArchivedPatients]);

  return (
    <Box>
      <PatientListFilter
        title="Archived Patients"
        subTitle="List Of Archived Patients"
        searchTerm={archivedPatientsSearchParams}
        setSearchTerm={setArchivedPatientsSearchParams}
        clearEmailSearch={clearArchivedPatientEmailSearch}
        clearNameSearch={clearArchivedPatientNameSearch}
      />
      <PatientList
        patients={archivedPatients}
        loading={loading.archivedPatients}
      />
    </Box>
  );
});
