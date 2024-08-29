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
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle>{t("examination-card-operations.forms.delete-confirmation.header")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("examination-card-operations.forms.delete-confirmation.delete-warning")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="outlined">
          {t("examination-card-operations.forms.delete-confirmation.cancel-button")}
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          endIcon={<Delete />}
        >
          {t("examination-card-operations.forms.delete-confirmation.delete-button")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
