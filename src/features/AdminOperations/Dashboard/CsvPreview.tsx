import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FilePresent } from "@mui/icons-material";
import { toast } from "react-toastify";

interface Props {
  file: File;
  loading: boolean;
  handleSave: (file: File) => void;
}

export default function CsvPreview({ file, handleSave, loading }: Props) {
  const isCSVFile = file?.name.toLocaleLowerCase().endsWith(".csv");

  if (!isCSVFile) {
    toast.warn("Incorrect File format");
  }

  return (
    <Box component={Tooltip} title="click to add users">
      <Box
        component={IconButton}
        onClick={() => {
          if (isCSVFile) {
            handleSave(file);
          }
        }}
        disableFocusRipple
        disableRipple
        disabled={!isCSVFile}
      >
        <FilePresent
          color={!isCSVFile ? "error" : "secondary"}
          sx={{ fontWeight: 15 }}
        />
        <Typography variant="h6" color={!isCSVFile ? "error" : "inherit"}>
          {file?.name}
        </Typography>
        {loading && (
          <div style={{ marginLeft: "5px" }}>
            <CircularProgress color="success" size={15} thickness={4} />
          </div>
        )}
      </Box>
    </Box>
  );
}
