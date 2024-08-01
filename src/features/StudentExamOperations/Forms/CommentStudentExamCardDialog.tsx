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
import { useTranslation } from "react-i18next";

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
          label={t(
            "student-exam-operations.forms.comment-student-exam-card-dialog.comment"
          )}
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
          {t(
            "student-exam-operations.forms.comment-student-exam-card-dialog.cancel-button"
          )}
        </Button>
        <Button
          size="small"
          color="secondary"
          type="submit"
          variant="contained"
          startIcon={<SendOutlined />}
        >
          {comment === ""
            ? t(
                "student-exam-operations.forms.comment-student-exam-card-dialog.add-comment"
              )
            : t(
                "student-exam-operations.forms.comment-student-exam-card-dialog.edit-comment"
              )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
