import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { Box, Alert, Typography, Grid } from "@mui/material";
import ButtonLoadingComponent from "../../../app/common/loadingComponents/ButtonLoadingComponent";
import PatientExaminationCardItem from "./PatientExaminationCardItem";

interface Props {
  patientExaminationCards: [string, PatientExaminationCard[]][];
  loading: boolean;
  patientId: string;
}

export default observer(function PatientExaminationCardsList({
  patientExaminationCards,
  loading,
  patientId,
}: Props) {
  return (
    <Box>
      {loading ? (
        <ButtonLoadingComponent />
      ) : (
        <>
          {patientExaminationCards.length < 0 ? (
            <Alert severity="info" variant="outlined">
              <Typography variant="h5">No examination cards found</Typography>
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
                          />
                        </Grid>
                      ))}
                    </Grid>
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