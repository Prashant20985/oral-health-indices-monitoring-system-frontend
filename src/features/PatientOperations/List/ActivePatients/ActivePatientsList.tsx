import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import PatientList from "../DataGrid/PatientList";
import PatientListFilter from "../Filters/PatientListFilter";
import { useTranslation } from "react-i18next";

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

  const [t] = useTranslation("global");

  return (
    <Box>
      <PatientListFilter
        title={t("patient-operations.list.active-patients.header")}
        subTitle={t("patient-operations.list.active-patients.header")}
        searchTerm={activePatientsSerachParams}
        setSearchTerm={setActivePatientsSearchParams}
        clearEmailSearch={clearActivePatientEmailSearch}
        clearNameSearch={clearActivePatientNameSearch}
      />
      <PatientList patients={activePatients} loading={loading.activePatients} />
    </Box>
  );
});
