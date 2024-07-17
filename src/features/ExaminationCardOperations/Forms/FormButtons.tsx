import { Edit, Close, Send } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

interface Props {
  isView: boolean;
  setIsView: (value: boolean) => void;
  resetForm: () => void;
  setIsEditMode: (value: boolean) => void;
  handleSubmit: () => void;
  message?: string;
}

export default function FormButtons({
  isView,
  setIsView,
  resetForm,
  setIsEditMode,
  handleSubmit,
  message,
}: Props) {
  return (
    <Box mt={1} mb={1} display="flex" justifyContent="flex-end" gap={4}>
      <Button
        variant="outlined"
        color="warning"
        startIcon={<Edit />}
        disabled={!isView}
        onClick={() => {
          setIsView(false);
          setIsEditMode(true);
        }}
      >
        Edit {message}
      </Button>
      {!isView && (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="info"
            endIcon={<Close />}
            onClick={() => {
              resetForm();
              setIsView(true);
              setIsEditMode(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            color="secondary"
            endIcon={<Send />}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
}
