import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { SendOutlined } from "@mui/icons-material";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  description: string;
  marks: number;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (marks: number) => void;
}

export default function AddStudentMarksDialog({
  title,
  description,
  marks,
  isOpen,
  onClose,
  handleSubmit,
}: Props) {
  const [marksValue, setMarksValue] = React.useState(marks);

  React.useEffect(() => {
    if (marks !== 0) {
      setMarksValue(marks);
    }
  }, [marks]);

  const [t] = useTranslation("global");

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
          console.log(marksValue);
          handleSubmit(marksValue);
          setMarksValue(0);
          onClose();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          color="secondary"
          autoFocus
          required
          type="number"
          value={marksValue}
          onChange={(e) => {
            setMarksValue(parseInt(e.target.value));
          }}
          margin="dense"
          id="studentMarks"
          name="studentMarks"
          label={t(
            "student-exam-operations.forms.add-student-marks-dialog.student-mark"
          )}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          color="error"
        >
          {t(
            "student-exam-operations.forms.add-student-marks-dialog.cancel-button"
          )}
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          startIcon={<SendOutlined />}
        >
          {marks === 0
            ? t(
                "student-exam-operations.forms.add-student-marks-dialog.add-button"
              )
            : t(
                "student-exam-operations.forms.add-student-marks-dialog.edit-button"
              )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
