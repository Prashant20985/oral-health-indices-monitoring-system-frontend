import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      fullWidth
    >
      <DialogTitle>Are you sure you want to cancel?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have unsaved changes that will be lost if you cancel.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          No
        </Button>
        <Button onClick={onConfirm} color="error" variant="outlined">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
