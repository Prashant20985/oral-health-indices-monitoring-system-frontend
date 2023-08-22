import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  Button,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Tooltip,
} from "@mui/material";
import { CancelOutlined, CloudUploadRounded } from "@mui/icons-material";
import { useStore } from "../../../app/stores/Store";
import CsvPreview from "./CsvPreview";
import FileDropzone from "../../../app/common/dropzone/FileDropzone";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { colors } from "../../../themeConfig";

export default observer(function AddApplicationUserFromCsvButton() {
  const { adminStore } = useStore();
  const {
    addApplicationUserFromCsv,
    loading,
    csvAddResponse,
    setCsvAddResponse,
  } = adminStore;

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [files, setFiles] = useState<File[]>([]);
  const [isDropzoneOpen, setIsDropzoneOpen] = useState(false);

  const openDropzone = () => {
    setIsDropzoneOpen(true);
  };

  const closeDropzone = () => {
    setIsDropzoneOpen(false);
  };

  const handleClearFile = () => {
    setFiles([]);
  };

  const handleAddUsersFromCsv = async (file: File) => {
    try {
      await addApplicationUserFromCsv(file);
    } catch (error) {
      console.error("Error adding app users:", error);
    } finally {
      handleClearFile();
    }
  };

  return (
    <>
      {files.length > 0 ? (
        <>
          <CsvPreview
            file={files[0]}
            handleSave={handleAddUsersFromCsv}
            loading={loading.addAppUsers}
          />
          {!loading.addAppUsers && (
            <IconButton onClick={handleClearFile}>
              <CancelOutlined color="info" />
            </IconButton>
          )}
        </>
      ) : (
        <Tooltip title="Add Users from csv file">
          <Button
            variant="contained"
            startIcon={<CloudUploadRounded />}
            sx={{
              margin: 2,
              backgroundColor: color.pinkAccent[400],
              "&:hover": { backgroundColor: color.blueAccent[300] },
            }}
            onClick={openDropzone}
          >
            Upload CSV
          </Button>
        </Tooltip>
      )}

      <FileDropzone
        open={isDropzoneOpen}
        onClose={closeDropzone}
        setFiles={setFiles}
        message="Drop only .csv files"
      />

      <Dialog
        TransitionComponent={SlideUpTransition}
        scroll="body"
        open={!!csvAddResponse}
        onClose={() => setCsvAddResponse("")}
      >
        <DialogTitle>Results from Add Users:</DialogTitle>
        <DialogContent sx={{ maxHeight: "40vh", minWidth: 500 }}>
          <Typography sx={{ whiteSpace: "pre-wrap" }} color="text.primary">
            <pre>{csvAddResponse}</pre>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            variant="contained"
            onClick={() => setCsvAddResponse("")}
            color="info"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});
