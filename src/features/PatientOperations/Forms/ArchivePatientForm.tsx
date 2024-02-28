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

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function ArchivePatientForm({
  patientId,
  isOpen,
  onClose,
}: Props) {
  const {
    patientStore: { archivePatient },
  } = useStore();
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
      <DialogTitle>Archive Patient</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to archive this patient?
        </DialogContentText>
        <TextField
          color="secondary"
          autoFocus
          required
          margin="dense"
          id="archiveComment"
          name="archiveComment"
          label="Archive Comment"
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
          Cancel
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          startIcon={<ArchiveOutlined />}
        >
          Archive
        </Button>
      </DialogActions>
    </Dialog>
  );
});
