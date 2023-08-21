import { Alert, Snackbar, Typography } from "@mui/material";
import SlideUpTransition from "../transition/SlideUpTransition";

interface Props {
  snackbarOpen: boolean;
  message: string;
  snackbarClose: () => void;
}

export default function CustomSanckbar({
  snackbarClose,
  snackbarOpen,
  message,
}: Props) {
  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={2000}
      onClose={snackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      TransitionComponent={SlideUpTransition}
    >
      <Alert
        onClose={snackbarClose}
        variant="filled"
        severity="success"
        sx={{ width: "100%" }}
      >
        <Typography variant="h6" sx={{ color: "white" }}>
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
