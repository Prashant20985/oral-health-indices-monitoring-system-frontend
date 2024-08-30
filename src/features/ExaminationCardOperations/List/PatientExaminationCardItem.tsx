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
import { useTranslation } from "react-i18next";

interface Props {
  patientExaminationCard: PatientExaminationCard;
  patientId?: string;
  setOpenDeleteSnackbar: (value: boolean) => void;
}

/**
 * Renders a card component for displaying a patient examination card item.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {PatientExaminationCard} props.patientExaminationCard - The patient examination card object.
 * @param {string} props.patientId - The ID of the patient.
 * @param {function} props.setOpenDeleteSnackbar - The function to set the state of the delete snackbar.
 * @returns {JSX.Element} The rendered card component.
 */
export default observer(function ExaminationCardItem({
  patientExaminationCard,
  patientId,
  setOpenDeleteSnackbar,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);

  const [openPatientDetails, setOpenPatientDetails] = React.useState(false);

  const {
    patientExaminationCardStore: { deletePatientExaminationCard },
    userStore: { user },
  } = useStore();

  const isUserEligibleToDelete =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

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
            {t(
              "dentist-teacher-operations.list.patient-examination-card.created-by"
            )}
            &nbsp;
            {patientExaminationCard.isRegularMode
              ? patientExaminationCard.doctorName
              : patientExaminationCard.studentName}
            <br />
            {!patientExaminationCard.isRegularMode &&
              `${t(
                "dentist-teacher-operations.list.patient-examination-card.assigned-doctor"
              )} ${patientExaminationCard.doctorName}`}
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
          label={t(
            "dentist-teacher-operations.list.patient-examination-card.description-of-the-treatment"
          )}
          value={patientExaminationCard.summary.description}
        />
      </CardContent>
      <CardActions>
        <IconButton
          onClick={() => {
            setOpenDeleteConfirmation(true);
            console.log(patientExaminationCard);
          }}
          disabled={!isUserEligibleToDelete}
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
                {t(
                  "dentist-teacher-operations.list.patient-examination-card.patient-details"
                )}
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
              {t(
                "dentist-teacher-operations.list.patient-examination-card.view-card"
              )}
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
