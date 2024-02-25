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

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function PatientDetailsDialog({
  patientId,
  isOpen,
  onClose,
}: Props) {
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const {
    patientStore: { getPatientById },
  } = useStore();

  React.useEffect(() => {
    if (patientId) {
      const patientDetails = getPatientById(patientId);
      if (patientDetails) {
        setPatient(patientDetails);
      }
    }
  }, [patientId, getPatientById]);

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
        <Typography variant="h5">Patient Details</Typography>
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
              p={3}
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            >
              <CustomTextField
                label="First Name"
                name="firstName"
                value={patient.firstName}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Last Name"
                name="lastName"
                value={patient.lastName}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Email"
                name="email"
                value={patient.email}
                readOnly={true}
                gridColumn="span 4"
              />
              <CustomTextField
                label="Gender"
                name="gender"
                value={patient.gender}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Ethnic Group"
                name="ethnicGroup"
                value={patient.ethnicGroup}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Other Group"
                name="otherGroup"
                value={patient.otherGroup}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Years In School"
                name="yearsInSchool"
                value={patient.yearsInSchool.toString()}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Other Data"
                name="otherData"
                value={patient.otherData}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Other Data2"
                name="otherData2"
                value={patient.otherData2}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Other Data3"
                name="otherData3"
                value={patient.otherData3}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Location"
                name="location"
                value={patient.location}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Age"
                name="age"
                value={patient.age.toString()}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Created At"
                name="createdAt"
                value={new Date(patient.createdAt).toDateString()}
                readOnly={true}
                gridColumn="span 2"
              />

              {patient.isArchived && (
                <CustomTextField
                  label="Archive Comment"
                  name="archiveComment"
                  value={patient.archiveComment}
                  readOnly={true}
                  gridColumn="span 4"
                />
              )}

              <CustomTextField
                label="Doctor Name"
                name="doctorName"
                value={patient.doctorName}
                readOnly={true}
                gridColumn="span 2"
              />

              <CustomTextField
                label="Research Group Name"
                name="researchGroupName"
                value={patient.researchGroupName}
                readOnly={true}
                gridColumn="span 2"
              />
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
});
