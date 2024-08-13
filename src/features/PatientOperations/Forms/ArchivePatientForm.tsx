import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import * as React from "react";
import { ArchiveOutlined } from "@mui/icons-material";
import { useStore } from "../../../app/stores/Store";
import { useTranslation } from "react-i18next";

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Renders a form for archiving a patient.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.patientId - The ID of the patient to be archived.
 * @param {boolean} props.isOpen - Indicates whether the form is open or not.
 * @param {() => void} props.onClose - Callback function to close the form.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function ArchivePatientForm({
  patientId,
  isOpen,
  onClose,
}: Props) {
  const {
    patientStore: { archivePatient },
  } = useStore();

  const [t] = useTranslation("global");
  
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      TransitionComponent={SlideUpTransition}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const formJson = Object.fromEntries((formData as any).entries());
          const archiveComment = formJson.archiveComment;
          archivePatient(patientId, archiveComment);
          onClose();
        },
      }}
    >
      <DialogTitle>{t("patient-operations.form.archive-patient.header")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
        {t("patient-operations.form.archive-patient.dialog")}
        </DialogContentText>
        <TextField
          color="secondary"
          autoFocus
          required
          margin="dense"
          id="archiveComment"
          name="archiveComment"
          label={t("patient-operations.form.archive-patient.comment")}
          type="text"
          variant="standard"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          color="error"
        >
          {t("patient-operations.form.archive-patient.cancel-button")}
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          startIcon={<ArchiveOutlined />}
        >
          {t("patient-operations.form.archive-patient.archive-button")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
