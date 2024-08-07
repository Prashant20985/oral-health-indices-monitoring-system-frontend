import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import { Box, Typography, useTheme, Tab, Button } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { colors } from "../../../themeConfig";
import { Details, Assessment, ChevronLeft, Add } from "@mui/icons-material";
import PatientDetails from "./PatientDetails";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";
import PatientExaminationCardsList from "../../ExaminationCardOperations/List/PatientExaminationCardsList";
import { router } from "../../../app/router/Routes";
import { useTranslation } from "react-i18next";

export default observer(function PatientProfile() {
  const { id } = useParams();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    patientStore: { fetchPatientDetails, patientDetails, loading },
    patientExaminationCardStore: {
      groupedPatientExaminationCards,
      getPatientExaminationCards,
      clearPatientExamiantionCards,
      loading: { getPatientExaminationCards: loadingPatientExaminationCards },
    },
  } = useStore();

  const [value, setValue] = React.useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const fetchDetails = async () => {
      await fetchPatientDetails(id!);
    };
    fetchDetails();
  }, [fetchPatientDetails, id]);

  React.useEffect(() => {
    if (id) {
      getPatientExaminationCards(id);
    }
    return () => clearPatientExamiantionCards();
  }, [getPatientExaminationCards, id, clearPatientExamiantionCards]);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Button
          variant="text"
          color="info"
          startIcon={<ChevronLeft />}
          onClick={() => {
            if (patientDetails?.isArchived) {
              router.navigate("/archived-patients");
            } else {
              router.navigate("/active-patients");
            }
          }}
          size="small"
        >
          {t("patient-operations.patient-profile.back-button")}
        </Button>
        {!patientDetails?.isArchived && (
          <Button
            variant="contained"
            color="success"
            onClick={() => router.navigate(`/create-card/${id!}`)}
            startIcon={<Add />}
          >
            {t("patient-operations.patient-profile.add-examination-card")}
          </Button>
        )}
      </Box>
      <TabContext value={value}>
        <Box>
          <TabList
            onChange={handleChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: color.greenAccent[600],
              },
            }}
          >
            <Tab
              value="1"
              icon={<Details color="info" />}
              iconPosition="start"
              label={
                <Typography color={color.grey[100]}>
                  {t("patient-operations.patient-profile.patient-details")}
                </Typography>
              }
            />
            <Tab
              value="2"
              icon={<Assessment color="info" />}
              iconPosition="start"
              label={
                <Typography color={color.grey[100]}>
                  {t("patient-operations.patient-profile.patient-cards")}
                </Typography>
              }
            />
          </TabList>
        </Box>
        <>
          {loading.patientDetails ? (
            <ButtonLoadingComponent
              content={t(
                "patient-operations.patient-profile.loading-patient-details"
              )}
            />
          ) : (
            <>
              {patientDetails && (
                <>
                  <TabPanel value="1">
                    <PatientDetails patientDetails={patientDetails} />
                  </TabPanel>
                  <TabPanel value="2">
                    <PatientExaminationCardsList
                      patientExaminationCards={groupedPatientExaminationCards}
                      patientId={id!}
                      loading={loadingPatientExaminationCards}
                    />
                  </TabPanel>
                </>
              )}
            </>
          )}
        </>
      </TabContext>
    </Box>
  );
});
