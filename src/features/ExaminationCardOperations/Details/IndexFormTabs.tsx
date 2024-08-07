import { Box, Tab, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { colors } from "../../../themeConfig";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";

const SummaryEditForm = React.lazy(() => import("../Forms/SummaryEditForm"));

const APIDetails = React.lazy(() => import("./APIDetails"));

const BleedingDetails = React.lazy(() => import("./BleedingDetails"));

const BeweDetails = React.lazy(() => import("./BeweDetails"));

const DMFT_DMFSDetails = React.lazy(() => import("./DMFT_DMFSDetails"));

const RiskFactorAssessmentEditForm = React.lazy(
  () => import("../Forms/RiskFactorAssessmentEditForm")
);

interface Props {
  patientExaminationCard: PatientExaminationCard;
  isUserEligibleToEdit: boolean;
  isUserEligibleToComment: boolean;
}

export default observer(function IndexFormTabs({
  patientExaminationCard,
  isUserEligibleToEdit,
  isUserEligibleToComment,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [value, setValue] = React.useState("1");
  const [isEditMode, setIsEditMode] = React.useState(false);

  const handleTabChange = (
    _event: React.ChangeEvent<unknown>,
    newValue: string
  ) => {
    if (!isEditMode) {
      setValue(newValue);
    } else {
      const userConfirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to change the tab?"
      );
      if (userConfirmed) {
        setValue(newValue);
        setIsEditMode(false);
      }
    }
  };

  React.useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      if (isEditMode) {
        event.preventDefault();
        return (event.returnValue = "Are you sure you want to leave?");
      }
    };
    window.addEventListener("beforeunload", unloadCallback);
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [isEditMode]);

  return (
    <TabContext value={value}>
      <Box>
        <TabList
          onChange={handleTabChange}
          TabIndicatorProps={{
            style: {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? color.greenAccent[500]
                  : color.primary[500],
            },
          }}
        >
          <Tab
            label={
              <Typography color={color.grey[100]}>
                Risk Factor Assessment
              </Typography>
            }
            value="1"
          />
          <Tab
            label={<Typography color={color.grey[100]}>DMFT/DMFS</Typography>}
            value="2"
          />
          <Tab
            label={<Typography color={color.grey[100]}>BEWE</Typography>}
            value="3"
          />
          <Tab
            label={<Typography color={color.grey[100]}>API</Typography>}
            value="4"
          />
          <Tab
            label={<Typography color={color.grey[100]}>Bleeding</Typography>}
            value="5"
          />
          <Tab
            label={<Typography color={color.grey[100]}>Summary</Typography>}
            value="6"
          />
        </TabList>
        <TabPanel value="1">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <RiskFactorAssessmentEditForm
              riskfactorAssessmentModel={
                patientExaminationCard.riskFactorAssessment
                  .riskFactorAssessmentModel
              }
              isUserEligibleToEdit={isUserEligibleToEdit}
              cardId={patientExaminationCard.id}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
        <TabPanel value="2">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <DMFT_DMFSDetails
              dmft_dmfs={
                patientExaminationCard.patientExaminationResult.dmfT_DMFS
              }
              isUserEligibleToEdit={isUserEligibleToEdit}
              isUserEligibleToComment={isUserEligibleToComment}
              cardId={patientExaminationCard.id}
              isRegularMode={patientExaminationCard.isRegularMode}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
        <TabPanel value="3">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <BeweDetails
              bewe={patientExaminationCard.patientExaminationResult.bewe}
              isUserEligibleToEdit={isUserEligibleToEdit}
              isUserEligibleToComment={isUserEligibleToComment}
              cardId={patientExaminationCard.id}
              isRegularMode={patientExaminationCard.isRegularMode}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
        <TabPanel value="4">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <APIDetails
              api={patientExaminationCard.patientExaminationResult.api}
              isUserEligibleToEdit={isUserEligibleToEdit}
              isUserEligibleToComment={isUserEligibleToComment}
              cardId={patientExaminationCard.id}
              isRegularMode={patientExaminationCard.isRegularMode}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
        <TabPanel value="5">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <BleedingDetails
              bleeding={
                patientExaminationCard.patientExaminationResult.bleeding
              }
              isUserEligibleToEdit={isUserEligibleToEdit}
              isUserEligibleToComment={isUserEligibleToComment}
              cardId={patientExaminationCard.id}
              isRegularMode={patientExaminationCard.isRegularMode}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
        <TabPanel value="6">
          <React.Suspense fallback={<ButtonLoadingComponent />}>
            <SummaryEditForm
              isUserEligibleToEdit={isUserEligibleToEdit}
              summary={patientExaminationCard.summary}
              cardId={patientExaminationCard.id}
              setIsEditMode={setIsEditMode}
            />
          </React.Suspense>
        </TabPanel>
      </Box>
    </TabContext>
  );
});
