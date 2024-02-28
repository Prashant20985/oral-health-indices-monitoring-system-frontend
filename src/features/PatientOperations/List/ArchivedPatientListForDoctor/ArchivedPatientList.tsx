import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import { Box } from "@mui/material";
import PatientListFilter from "../Filters/PatientListFilter";
import PatientList from "../DataGrid/PatientList";
import * as React from "react";

export default observer(function ArchivedPatientList() {
  const {
    patientStore: {
      fetchArchivedPatientsByDoctorId,
      loading,
      archivedPatientsByDoctorId,
      setArchivedPatientsByDoctorIdSearchParams,
      archivedPatientsByDoctorIdSearchParams,
      clearArchivedPatientsByDoctorIdEmailSearch,
      clearArchivedPatientsByDoctorIdNameSearch,
    },
  } = useStore();

  React.useEffect(() => {
    fetchArchivedPatientsByDoctorId();
  }, [fetchArchivedPatientsByDoctorId]);

  return (
    <Box>
      <PatientListFilter
        title="Archived Patients"
        subTitle="List Of Archived Patients"
        searchTerm={archivedPatientsByDoctorIdSearchParams}
        setSearchTerm={setArchivedPatientsByDoctorIdSearchParams}
        clearEmailSearch={clearArchivedPatientsByDoctorIdEmailSearch}
        clearNameSearch={clearArchivedPatientsByDoctorIdNameSearch}
      />
      <PatientList
        patients={archivedPatientsByDoctorId}
        loading={loading.archivedPatientsByDoctorId}
        isListForDoctor={true}
      />
    </Box>
  );
});
