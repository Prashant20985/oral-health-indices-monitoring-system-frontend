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

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      keepMounted
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle>{`Delete Exam: ${examTitle}`}</DialogTitle>
      <DialogContent>
        Exam will be deleted permanently. Are you sure you want to delete this
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="info" variant="contained" size="small">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={handleDeleteExam}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
});
