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

/**
 * Renders a dialog component for confirming cancellation.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.open - Determines whether the dialog is open or not.
 * @param {() => void} props.onClose - The function to call when the dialog is closed.
 * @param {() => void} props.onConfirm - The function to call when the cancellation is confirmed.
 * @returns {JSX.Element} The rendered CancelConfirmationDialog component.
 */
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
