import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box, Button, useTheme } from "@mui/material";
import ResearchGroupPatientList from "../ResearchGroupPatientList/ResearchGroupPatientList";
import { useParams } from "react-router-dom";
import Header from "../../../../app/common/header/Header";
import { router } from "../../../../app/router/Routes";
import { ArrowBackIos } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of patients who are not in a research group.
 * 
 * @returns The PatientsNotInResearchGroupList component.
 */
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

  const [t] = useTranslation("global");

  return (
    <Box>
      <Button
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        size="small"
        onClick={() => router.navigate(`/research-groups/${id}`)}
        startIcon={<ArrowBackIos />}
      >
        {t(
          "dentist-teacher-operations.list.research-group.patients-not-in-research-group.back-button"
        )}
      </Button>
      <Box sx={{ mt: 2, mb: 2 }}>
        <Header
          title={
            t(
              "dentist-teacher-operations.list.research-group.patients-not-in-research-group.header"
            ) + ` ${dentistTeacherStore.selectedResearchGroup?.groupName}`
          }
        />
      </Box>
      <ResearchGroupPatientList
        patients={dentistTeacherStore.patientsNotInResearchGroup.patients}
        loading={dentistTeacherStore.loading.patientsNotInResearchGroup}
        patientsInGroupList={false}
        researchGroupId={id !== undefined ? id : ""}
      />
    </Box>
  );
});
