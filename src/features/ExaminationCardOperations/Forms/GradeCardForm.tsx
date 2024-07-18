import { SendOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React from "react";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";

interface Props {
  title: string;
  description: string;
  totalScore: number;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (totalScore: number) => void;
}

export default function GradeCardForm({
  totalScore,
  isOpen,
  onClose,
  title,
  description,
  handleSubmit,
}: Props) {
  const [totalScoreValue, setTotalScoreValue] = React.useState(0);

  React.useEffect(() => {
    if (totalScore !== 0) {
      setTotalScoreValue(totalScore);
    }
  }, [totalScore]);

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
          console.log(totalScoreValue);
          handleSubmit(totalScoreValue);
          setTotalScoreValue(0);
          onClose();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          color="secondary"
          type="number"
          fullWidth
          label="Total Score"
          margin="dense"
          value={totalScoreValue}
          onChange={(event) => setTotalScoreValue(Number(event.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<SendOutlined />}
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}
