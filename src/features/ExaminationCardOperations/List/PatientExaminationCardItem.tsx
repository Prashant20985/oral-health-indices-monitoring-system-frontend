import { observer } from "mobx-react-lite";
import { PatientExaminationCard } from "../../../app/models/PatientExaminationCard";
import { colors } from "../../../themeConfig";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Delete, DoubleArrow, Medication, Person } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../../app/router/Routes";
import React from "react";
import { useStore } from "../../../app/stores/Store";
import DeleteConfirmation from "../Forms/DeleteConfirmation";
import PatientDetailsDialog from "../../PatientOperations/Forms/PatientDetailsDialog";

interface Props {
  patientExaminationCard: PatientExaminationCard;
  patientId?: string;
  setOpenDeleteSnackbar: (value: boolean) => void;
}

export default observer(function ExaminationCardItem({
  patientExaminationCard,
  patientId,
  setOpenDeleteSnackbar,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);

  const [openPatientDetails, setOpenPatientDetails] = React.useState(false);

  const {
    patientExaminationCardStore: { deletePatientExaminationCard },
  } = useStore();

  const handleDelete = async () => {
    await deletePatientExaminationCard(patientExaminationCard.id);
    setOpenDeleteConfirmation(false);
    setOpenDeleteSnackbar(true);
  };

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor: color.primary[400],
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
              width: 85,
              height: 85,
            }}
            aria-label="patient-card-avatar"
          >
            <Medication sx={{ fontSize: 40 }} />
          </Avatar>
        }
        title={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="h3" fontWeight="bold">
              {new Date(
                patientExaminationCard.dateOfExamination
              ).toDateString()}
            </Typography>
            <Chip
              size="small"
              label={
                <Typography
                  fontWeight={700}
                  sx={{ textTransform: "uppercase" }}
                >
                  {patientExaminationCard.isRegularMode
                    ? "Regular Mode"
                    : "Test Mode"}
                </Typography>
              }
              color="secondary"
            />
          </Box>
        }
        subheader={
          <Typography variant="h6" color="textSecondary">
            Created By:{" "}
            {patientExaminationCard.isRegularMode
              ? patientExaminationCard.doctorName
              : patientExaminationCard.studentName}
            <br />
            {!patientExaminationCard.isRegularMode &&
              `Assigned Doctor: ${patientExaminationCard.doctorName}`}
          </Typography>
        }
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          color="secondary"
          label="Description of the treatment"
          value={patientExaminationCard.summary.description}
        />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            setOpenDeleteConfirmation(true);
            console.log(patientExaminationCard);
          }}
        >
          <Delete />
        </IconButton>
        <Box display="flex" justifyContent="flex-end" width="100%">
          <Box display="flex" gap={2}>
            {patientExaminationCard.patient && (
              <Button
                color="info"
                variant="outlined"
                startIcon={<Person />}
                onClick={() => setOpenPatientDetails(true)}
              >
                Patient Details
              </Button>
            )}
            <Button
              variant="outlined"
              color={theme.palette.mode === "dark" ? "secondary" : "info"}
              endIcon={<DoubleArrow />}
              onClick={() => {
                if (patientExaminationCard.patient) {
                  router.navigate(
                    `/patient-profile/${patientExaminationCard.patient.id}/${patientExaminationCard.id}`
                  );
                } else {
                  router.navigate(
                    `/patient-profile/${patientId}/${patientExaminationCard.id}`
                  );
                }
              }}
            >
              View Card
            </Button>
          </Box>
        </Box>
      </CardActions>
      <DeleteConfirmation
        isOpen={openDeleteConfirmation}
        onClose={() => setOpenDeleteConfirmation(false)}
        handleDelete={handleDelete}
      />
      <PatientDetailsDialog
        isOpen={openPatientDetails}
        onClose={() => setOpenPatientDetails(false)}
        patientDetails={patientExaminationCard.patient}
      />
    </Card>
  );
});
