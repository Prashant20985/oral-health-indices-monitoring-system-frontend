import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { useTranslation } from "react-i18next";

interface Props {
  examId: string;
  examTitle: string;
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function DeleteExamConfirmationForm({
  examId,
  examTitle,
  isOpen,
  onClose,
}: Props) {
  const {
    studentExamStore: { deleteExam },
  } = useStore();

  const handleDeleteExam = async () => {
    await deleteExam(examId);
  };

  const [t] = useTranslation("global");

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      keepMounted
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle>{`${t(
        "student-exam-operations.forms.delete-exam-confirmation-form.delete-exam"
      )} ${examTitle}`}</DialogTitle>
      <DialogContent>
        {t(
          "student-exam-operations.forms.delete-exam-confirmation-form.delete-warning"
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="contained" size="small">
          {t(
            "student-exam-operations.forms.delete-exam-confirmation-form.cancel-button"
          )}
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleDeleteExam}
        >
          {t(
            "student-exam-operations.forms.delete-exam-confirmation-form.delete-button"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
