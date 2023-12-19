import { useCallback } from "react";
import { FileUpload } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import SlideUpTransition from "../transition/SlideUpTransition";
import { useDropzone } from "react-dropzone";
import Header from "../header/Header";

interface Props {
  open: boolean;
  message: string;
  onClose: () => void;
  setFiles: (files: File[]) => void;
}

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
        <Header title="Drop file here" />
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
