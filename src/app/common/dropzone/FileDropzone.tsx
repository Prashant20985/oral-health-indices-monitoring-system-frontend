import { useCallback } from "react";
import { FileUpload } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import SlideUpTransition from "../transition/SlideUpTransition";
import { useDropzone } from "react-dropzone";
import Header from "../header/Header";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
  setFiles: (files: File[]) => void;
}

/**
 * Renders a file dropzone component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.open - Determines if the dropzone is open.
 * @param {Function} props.onClose - The function to close the dropzone.
 * @param {Function} props.setFiles - The function to set the dropped files.
 * @param {string} props.message - The message to display in the dropzone.
 * @returns {JSX.Element} The rendered component.
 */
export default function FileDropzone({
  open,
  onClose,
  setFiles,
  message,
}: Props) {
  const dropzoneStyles = {
    border: "dashed 3px",
    borderRadius: "4px",
    paddingTop: "35px",
    textAlign: "center" as const,
    height: 250,
  };

  const dropzoneActive = {
    borderColor: "green",
  };

  const [t] = useTranslation("global");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      onClose();
    },
    [setFiles, onClose]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={SlideUpTransition}
    >
      <DialogTitle display="flex" justifyContent="center">
        <Header title={t("common.file-dropzone.title")} />
      </DialogTitle>
      <DialogContent>
        <div
          {...getRootProps()}
          style={
            isDragActive
              ? { ...dropzoneStyles, ...dropzoneActive }
              : { ...dropzoneStyles }
          }
        >
          <input {...getInputProps()} />
          <FileUpload sx={{ fontSize: 120 }} />
          <Typography variant="h6" fontWeight="bold" color="text.secondary">
            {message}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}
