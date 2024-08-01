import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import PatientListFilter from "../Filters/PatientListFilter";
import PatientList from "../DataGrid/PatientList";
import { useTranslation } from "react-i18next";

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

  const [t] = useTranslation("global");

  return (
    <Box>
      <PatientListFilter
        title={t("patient-operations.list.archived-patients.header")}
        subTitle={t("patient-operations.list.archived-patients.sub-header")}
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
