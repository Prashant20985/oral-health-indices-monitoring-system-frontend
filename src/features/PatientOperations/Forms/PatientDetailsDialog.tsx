import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import * as React from "react";
import { useStore } from "../../../app/stores/Store";
import { Patient } from "../../../app/models/Patient";
import { Close } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  patientId?: string;
  isOpen: boolean;
  onClose: () => void;
  patientDetails?: Patient;
}

export default observer(function PatientDetailsDialog({
  patientId,
  isOpen,
  onClose,
  patientDetails,
}: Props) {
  const [patient, setPatient] = React.useState<Patient | null>(
    patientDetails ?? null
  );

  const {
    patientStore: { getPatientById },
  } = useStore();

  React.useEffect(() => {
    if (!patientDetails) {
      if (patientId) {
        const patientDetails = getPatientById(patientId);
        if (patientDetails) {
          setPatient(patientDetails);
        }
      }
    }
  }, [patientId, getPatientById, patientDetails]);

  const [t] = useTranslation("global");

  return (
    <Dialog
      open={isOpen}
      fullWidth
      TransitionComponent={SlideUpTransition}
      sx={{
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            minWidth: "50rem",
          },
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignContent="center"
      >
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ textTransform: "uppercase" }}
        >
          {t("patient-operations.patient-details-dialog.header")}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {patient && (
          <Box width="100%">
            <Box
              display="grid"
              gap={2}
              p={2}
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <CustomTextField
                label={t("patient-operations.patient-details-dialog.first-name")}
                name="firstName"
                variant="outlined"
                value={patient.firstName}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.last-name")}
                name="lastName"
                variant="outlined"
                value={patient.lastName}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.email")}
                name="email"
                variant="outlined"
                value={patient.email}
                readOnly={true}
                gridColumn="span 4"
              />
              <CustomTextField
                label={t("patient-operations.patient-details-dialog.gender")}
                name="gender"
                variant="outlined"
                value={patient.gender}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.ethnic-group")}
                name="ethnicGroup"
                variant="outlined"
                value={patient.ethnicGroup}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.other-group")}
                name="otherGroup"
                variant="outlined"
                value={patient.otherGroup}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.years-in-school")}
                name="yearsInSchool"
                variant="outlined"
                value={patient.yearsInSchool.toString()}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.other-data")}
                name="otherData"
                value={patient.otherData}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.other-data2")}
                name="otherData2"
                value={patient.otherData2}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.other-data3")}
                name="otherData3"
                value={patient.otherData3}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.location")}
                name="location"
                value={patient.location}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.age")}
                name="age"
                value={patient.age.toString()}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.created-at")}
                name="createdAt"
                value={new Date(patient.createdAt).toDateString()}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              {patient.isArchived && (
                <CustomTextField
                  label={t("patient-operations.patient-details-dialog.archive-comment")}
                  name="archiveComment"
                  value={patient.archiveComment}
                  readOnly={true}
                  variant="outlined"
                  gridColumn="span 4"
                />
              )}

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.doctor-name")}
                name="doctorName"
                value={patient.doctorName}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />

              <CustomTextField
                label={t("patient-operations.patient-details-dialog.research-group-name")}
                name="researchGroupName"
                value={patient.researchGroupName}
                readOnly={true}
                variant="outlined"
                gridColumn="span 2"
              />
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
});
