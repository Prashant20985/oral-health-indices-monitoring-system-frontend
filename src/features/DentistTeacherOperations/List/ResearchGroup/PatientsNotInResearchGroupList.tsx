import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box, Button, TextField, useTheme } from "@mui/material";
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
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box sx={{ mt: 2, mb: 2 }}>
          <Header
            title={
              t(
                "dentist-teacher-operations.list.research-group.patients-not-in-research-group.header"
              ) + ` ${dentistTeacherStore.selectedResearchGroup?.groupName}`
            }
          />
        </Box>
        <Box display="flex" gap={2} alignItems="center" width="50%">
          <TextField
            label="Email"
            fullWidth
            variant="filled"
            color="secondary"
            sx={{ mb: 2 }}
            value={
              dentistTeacherStore.patientnNotInResearchGroupSearchParams.email
            }
            onChange={(e) => {
              dentistTeacherStore.setPatientNotInResearchGroupSearchParams({
                ...dentistTeacherStore.patientnNotInResearchGroupSearchParams,
                email: e.target.value,
              });
            }}
          />
          <TextField
            label={t("dentist-teacher-operations.list.research-group.patients-not-in-research-group.student-name")}
            variant="filled"
            fullWidth
            value={
              dentistTeacherStore.patientnNotInResearchGroupSearchParams
                .patientName
            }
            color="secondary"
            sx={{ mb: 2 }}
            onChange={(e) => {
              dentistTeacherStore.setPatientNotInResearchGroupSearchParams({
                ...dentistTeacherStore.patientnNotInResearchGroupSearchParams,
                patientName: e.target.value,
              });
            }}
          />
        </Box>
      </Box>
      <ResearchGroupPatientList
        patients={dentistTeacherStore.patientsNotInResearchGroup.patients}
        loading={dentistTeacherStore.loading.patientsNotInResearchGroup}
        patientsInGroupList={false}
        researchGroupId={id !== undefined ? id : ""}
        page={dentistTeacherStore.patientnNotInResearchGroupSearchParams.page}
        pageSize={
          dentistTeacherStore.patientnNotInResearchGroupSearchParams.pageSize
        }
        setPaginationParams={(page: number, pageSize: number) => {
          dentistTeacherStore.setPatientNotInResearchGroupSearchParams({
            ...dentistTeacherStore.patientnNotInResearchGroupSearchParams,
            page: page,
            pageSize: pageSize,
          });
        }}
      />
    </Box>
  );
});
