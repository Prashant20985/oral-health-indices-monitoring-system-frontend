import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { useParams } from "react-router-dom";
import React from "react";
import { Box, Button } from "@mui/material";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";
import PatientExaminationDetailsHeaderCard from "./PatientExaminationDetailsHeaderCard";
import IndexFormTabs from "./IndexFormTabs";
import { ChevronLeft } from "@mui/icons-material";
import { router } from "../../../app/router/Routes";

export default observer(function PatientExaminationCardDetails() {
  const { cardId } = useParams<{ cardId: string }>();
  const { id } = useParams<{ id: string }>();

  const {
    patientExaminationCardStore: {
      getPatientExaminationCardDetails,
      patientExaminationCardDetails,
      loading: { getPatientExaminationCardDetails: loading },
    },
    userStore: { user },
  } = useStore();

  const isUserEligibleToEdit =
    patientExaminationCardDetails?.doctorName.split("(")[1].split(")")[0] ===
    user?.email;

  const isUserEligibleToComment =
    isUserEligibleToEdit ||
    patientExaminationCardDetails?.studentName.split("(")[1].split(")")[0] ===
      user?.email;

  React.useEffect(() => {
    if (cardId) {
      getPatientExaminationCardDetails(cardId);
    }
  }, [cardId, getPatientExaminationCardDetails]);

  return (
    <Box>
      {loading ? (
        <Box>
          <ButtonLoadingComponent content="Loading Card..." />
        </Box>
      ) : patientExaminationCardDetails !== null ? (
        <Box>
          <Box mb={1}>
            <Button
              variant="text"
              color="info"
              startIcon={<ChevronLeft />}
              onClick={() => router.navigate(`/patient-profile/${id}`)}
              size="small"
            >
              Back
            </Button>
          </Box>
          <PatientExaminationDetailsHeaderCard
            patientExaminationCard={patientExaminationCardDetails}
            isUserEligibleToComment={isUserEligibleToComment}
            isUserEligibleToEdit={isUserEligibleToEdit}
          />
          <IndexFormTabs
            patientExaminationCard={patientExaminationCardDetails}
            isUserEligibleToEdit={isUserEligibleToEdit}
            isUserEligibleToComment={isUserEligibleToComment}
          />
        </Box>
      ) : null}
    </Box>
  );
});
