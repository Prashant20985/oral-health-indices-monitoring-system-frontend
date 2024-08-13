import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FilePresent } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface Props {
  file: File;
  loading: boolean;
  handleSave: (file: File) => void;
}

/**
 * Renders a preview of a CSV file and provides functionality to handle saving the file.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {File} props.file - The CSV file to preview.
 * @param {Function} props.handleSave - The function to handle saving the file.
 * @param {boolean} props.loading - Indicates whether the file is currently being loaded.
 * @returns {JSX.Element} The rendered CsvPreview component.
 */
export default function CsvPreview({ file, handleSave, loading }: Props) {
  const isCSVFile = file?.name.toLocaleLowerCase().endsWith(".csv");

  const [t] = useTranslation("global");

  if (!isCSVFile) {
    toast.warn(t("admin-operations.dashboard.csv-preview.warn-toast"));
  }

  return (
    <Box component={Tooltip} title={t("admin-operations.dashboard.csv-preview.add-button")}>
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
