import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { Box, Alert, Typography, Grid } from "@mui/material";
import LoadingComponent from "../../../app/common/loadingComponents/LoadingComponent";
import PatientExaminationCardItem from "./PatientExaminationCardItem";
import React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  patientExaminationCards: [string, PatientExaminationCard[]][];
  loading: boolean;
  patientId?: string;
}

/**
 * Renders a list of patient examination cards.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Array} props.patientExaminationCards - The array of patient examination cards.
 * @param {boolean} props.loading - Indicates whether the data is loading.
 * @param {string} props.patientId - The ID of the patient.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PatientExaminationCardsList({
  patientExaminationCards,
  loading,
  patientId,
}: Props) {
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = React.useState(false);
  const [t] = useTranslation("global");
  return (
    <Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {patientExaminationCards.length <= 0 ? (
            <Alert severity="info" variant="outlined" sx={{ mt: 4 }}>
              <Typography variant="h5">{t("dentist-teacher-operations.list.patient-examination-card.no-examination-cards-found")}</Typography>
            </Alert>
          ) : (
            <>
              {patientExaminationCards.map(
                ([group, patientExaminationCards]) => (
                  <Box>
                    <Box m={1.5}>
                      <Typography variant="h4" fontWeight="bold">
                        {group}
                      </Typography>
                    </Box>
                    <Grid container spacing={2} sx={{ p: 0.5, width: "100%" }}>
                      {patientExaminationCards.map((patientExaminationCard) => (
                        <Grid
                          item
                          md={6}
                          lg={6}
                          sm={12}
                          key={patientExaminationCard.id}
                        >
                          <PatientExaminationCardItem
                            patientExaminationCard={patientExaminationCard}
                            patientId={patientId}
                            setOpenDeleteSnackbar={setOpenDeleteSnackbar}
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <CustomSanckbar
                      snackbarClose={() => setOpenDeleteSnackbar(false)}
                      snackbarOpen={openDeleteSnackbar}
                      message={t("dentist-teacher-operations.list.patient-examination-card.delete-message")}
                    />
                  </Box>
                )
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
});
