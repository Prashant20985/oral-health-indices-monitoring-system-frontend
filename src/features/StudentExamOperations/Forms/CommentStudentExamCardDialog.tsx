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
import * as React from "react";

interface Props {
  title: string;
  description: string;
  comment: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (comment: string) => void;
}

export default function CommentStudentExamCardDialog({
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
          autoFocus
          required
          value={commentValue === null ? "" : commentValue}
          onChange={(e) => {
            setCommentValue(e.target.value);
          }}
          margin="dense"
          id="comment"
          name="comment"
          label="Comment"
          type="text"
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
          {comment === "" ? "Add Comment" : "Edit Comment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
