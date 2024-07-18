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
  comment: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (comment: string) => void;
}

export default function CommentForm({
  comment,
  isOpen,
  onClose,
  title,
  description,
  handleSubmit,
}: Props) {
  const [commentValue, setCommentValue] = React.useState("");

  React.useEffect(() => {
    if (comment !== "") {
      setCommentValue(comment);
    }
  }, [comment]);

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
          console.log(commentValue);
          handleSubmit(commentValue);
          setCommentValue("");
          onClose();
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
        <TextField
          color="secondary"
          multiline
          rows={4}
          label="Comment"
          margin="dense"
          fullWidth
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          inputProps={{ maxLength: 500 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            onClose();
          }}
        >
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
