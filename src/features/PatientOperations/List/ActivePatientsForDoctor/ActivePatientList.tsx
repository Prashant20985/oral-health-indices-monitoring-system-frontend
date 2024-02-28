import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import { Box } from "@mui/material";
import PatientListFilter from "../Filters/PatientListFilter";
import PatientList from "../DataGrid/PatientList";
import * as React from "react";

export default observer(function ActivePatientList() {
  const {
    patientStore: {
      fetchActivePatientsByDoctorId,
      loading,
      activePatientsByDoctorId,
      setActivePatientsByDoctorIdSearchParams,
      activePatientsByDoctorIdSearchParams,
      clearActivePatientsByDoctorIdEmailSearch,
      clearActivePatientsByDoctorIdNameSearch,
    },
  } = useStore();

  React.useEffect(() => {
    fetchActivePatientsByDoctorId();
  }, [fetchActivePatientsByDoctorId]);

  return (
    <Box>
      <PatientListFilter
        title="Active Patients"
        subTitle="List Of Active Patients"
        searchTerm={activePatientsByDoctorIdSearchParams}
        setSearchTerm={setActivePatientsByDoctorIdSearchParams}
        clearEmailSearch={clearActivePatientsByDoctorIdEmailSearch}
        clearNameSearch={clearActivePatientsByDoctorIdNameSearch}
      />
      <PatientList
        patients={activePatientsByDoctorId}
        loading={loading.activePatientsByDoctorId}
        isListForDoctor={true}
      />
    </Box>
  );
});
