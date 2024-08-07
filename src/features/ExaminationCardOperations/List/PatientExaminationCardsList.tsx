import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { Box, Alert, Typography, Grid } from "@mui/material";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";
import PatientExaminationCardItem from "./PatientExaminationCardItem";
import React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  patientExaminationCards: [string, PatientExaminationCard[]][];
  loading: boolean;
  patientId?: string;
}

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
        <ButtonLoadingComponent />
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
