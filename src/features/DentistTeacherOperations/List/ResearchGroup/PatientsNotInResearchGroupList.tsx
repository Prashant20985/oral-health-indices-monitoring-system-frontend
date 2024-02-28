import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box, Button, useTheme } from "@mui/material";
import ResearchGroupPatientList from "../ResearchGroupPatientList/ResearchGroupPatientList";
import { useParams } from "react-router-dom";
import Header from "../../../../app/common/header/Header";
import { router } from "../../../../app/router/Routes";
import { ArrowBackIos } from "@mui/icons-material";

export default observer(function PatientsNotInResearchGroupList() {
  const { dentistTeacherStore } = useStore();

  const theme = useTheme();

  const { id } = useParams<string>();

  React.useEffect(() => {
    if (id) {
      dentistTeacherStore.getResearchGroup(id);
    }
    const getPatientsNotInResearchGroup = async () => {
      await dentistTeacherStore.getPatientsNotInResearchGroup();
    };
    getPatientsNotInResearchGroup();
  }, [dentistTeacherStore, id]);

  return (
    <Box>
      <Button
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        size="small"
        onClick={() => router.navigate(`/research-groups/${id}`)}
        startIcon={<ArrowBackIos />}
      >
        Back
      </Button>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Header
          title={`Add Patients to ${dentistTeacherStore.selectedResearchGroup?.groupName}`}
        />
      </Box>
      <ResearchGroupPatientList
        patients={dentistTeacherStore.patientsNotInResearchGroup}
        loading={dentistTeacherStore.loading.patientsNotInResearchGroup}
        patientsInGroupList={false}
        researchGroupId={id !== undefined ? id : ""}
      />
    </Box>
  );
});
