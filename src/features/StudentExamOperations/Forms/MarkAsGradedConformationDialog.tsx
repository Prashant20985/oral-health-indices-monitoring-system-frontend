import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useStore } from "../../../app/stores/Store";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  examId: string;
}

export default function MarkAsGradedConformationDialog({
  isOpen,
  onClose,
  examId,
}: Props) {
  const {
    studentExamStore: { markExamAsGraded },
  } = useStore();

  const [t] = useTranslation("global");

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      fullWidth
    >
      <DialogTitle>
        {t(
          "student-exam-operations.forms.mark-as-graded-confirmation-dialog.mark-as-graded"
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t(
            "student-exam-operations.forms.mark-as-graded-confirmation-dialog.mark-as-graded-warning"
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          color="error"
        >
          {t(
            "student-exam-operations.forms.mark-as-graded-confirmation-dialog.cancel-button"
          )}
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          onClick={() => {
            markExamAsGraded(examId);
            onClose();
          }}
        >
          {t(
            "student-exam-operations.forms.mark-as-graded-confirmation-dialog.yes-button"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
