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
import { useTranslation } from "react-i18next";

interface Props {
  title: string;
  description: string;
  comment: string;
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (comment: string) => void;
}

/**
 * Renders a comment form component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.comment - The initial comment value.
 * @param {boolean} props.isOpen - Indicates if the form is open.
 * @param {() => void} props.onClose - The function to close the form.
 * @param {string} props.title - The title of the form.
 * @param {string} props.description - The description of the form.
 * @param {(comment: string) => void} props.handleSubmit - The function to handle form submission.
 * @returns {JSX.Element} The rendered component.
 */
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
          multiline
          rows={4}
          label={t("examination-card-operations.forms.comment-form.comment")}
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
          {t("examination-card-operations.forms.comment-form.cancel-button")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<SendOutlined />}
        >
          {t("examination-card-operations.forms.comment-form.send-button")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
