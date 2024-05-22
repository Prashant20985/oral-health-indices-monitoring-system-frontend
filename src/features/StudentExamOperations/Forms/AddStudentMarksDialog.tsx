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
          label="Student Mark"
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
          Cancel
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          startIcon={<SendOutlined />}
        >
          {marks === 0 ? "Add" : "Edit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
