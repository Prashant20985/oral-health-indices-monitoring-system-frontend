import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Delete } from "@mui/icons-material";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

/**
 * Renders a delete confirmation dialog.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open or not.
 * @param {() => void} props.onClose - The function to handle the dialog close event.
 * @param {() => void} props.handleDelete - The function to handle the delete action.
 * @returns {JSX.Element} The delete confirmation dialog component.
 */
export default function DeleteConfirmation({
  isOpen,
  onClose,
  handleDelete,
}: Props) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle>Are you sure you want to delete this card?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action cannot be undone. Are you sure you want to delete this
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          endIcon={<Delete />}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
