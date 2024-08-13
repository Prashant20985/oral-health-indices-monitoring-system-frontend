import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { useParams } from "react-router-dom";
import React from "react";
import { Box } from "@mui/material";
import LoadingComponent from "../../../app/common/loadingComponents/LoadingComponent";
import PatientExaminationDetailsHeaderCard from "./PatientExaminationDetailsHeaderCard";
import IndexFormTabs from "./IndexFormTabs";

export default observer(function PatientExaminationCardDetails() {
  const { cardId } = useParams<{ cardId: string }>();

  const {
    patientExaminationCardStore: {
      getPatientExaminationCardDetails,
      patientExaminationCardDetails,
      loading: { getPatientExaminationCardDetails: loading },
    },
    userStore: { user },
  } = useStore();

  React.useEffect(() => {
    if (cardId) {
      getPatientExaminationCardDetails(cardId);
    }
  }, [cardId, getPatientExaminationCardDetails]);

  const isUserEligibleToEdit =
    patientExaminationCardDetails?.doctorName.split("(")[1].split(")")[0] ===
    user?.email;

   const isCardAssociatedToStudent =
    patientExaminationCardDetails?.studentName !== ""
      ? patientExaminationCardDetails?.studentName
          .split("(")[1]
          .split(")")[0] === user?.email
      : false;

  const isUserEligibleToComment = isUserEligibleToEdit || isCardAssociatedToStudent;

  return (
    <Box>
      {loading ? (
        <Box>
          <LoadingComponent content="Loading Card..." />
        </Box>
      ) : patientExaminationCardDetails !== null ? (
        <Box>
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
