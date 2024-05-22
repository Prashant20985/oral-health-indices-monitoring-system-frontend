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
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      fullWidth
    >
      <DialogTitle>Mark as Graded</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to mark this exam as graded?
        </DialogContentText>
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
          onClick={() => markExamAsGraded(examId)}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
