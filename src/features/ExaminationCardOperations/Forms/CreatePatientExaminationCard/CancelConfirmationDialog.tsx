import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      fullWidth
    >
      <DialogTitle>{t("examination-card-operations.forms.create-patient-examination-card.cancel-confirmation")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("examination-card-operations.forms.create-patient-examination-card.cancel-warning")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          {t("examination-card-operations.forms.create-patient-examination-card.no")}
        </Button>
        <Button onClick={onConfirm} color="error" variant="outlined">
          {t("examination-card-operations.forms.create-patient-examination-card.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
