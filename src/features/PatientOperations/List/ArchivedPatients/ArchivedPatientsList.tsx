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

  const handlePagination = (page: number, pageSize: number) => {
    setArchivedPatientsSearchParams({
      ...archivedPatientsSearchParams,
      page: page,
      pageSize: pageSize,
    });
  };

  const handleSeachParamChange = ({
    email,
    name,
  }: {
    email: string;
    name: string;
  }) => {
    setArchivedPatientsSearchParams({
      ...archivedPatientsSearchParams,
      name: name,
      email: email,
    });
  };

  return (
    <Box>
      <PatientListFilter
        title={t("patient-operations.list.archived-patients.header")}
        subTitle={t("patient-operations.list.archived-patients.sub-header")}
        searchTerm={archivedPatientsSearchParams}
        setSearchTerm={handleSeachParamChange}
        clearEmailSearch={clearArchivedPatientEmailSearch}
        clearNameSearch={clearArchivedPatientNameSearch}
      />
      <PatientList
        patients={archivedPatients}
        loading={loading.archivedPatients}
        page={archivedPatientsSearchParams.page}
        pageSize={archivedPatientsSearchParams.pageSize}
        setPaginationParams={handlePagination}
      />
    </Box>
  );
});
