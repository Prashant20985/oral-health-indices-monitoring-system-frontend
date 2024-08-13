import { Alert, Snackbar, Typography } from "@mui/material";
import SlideUpTransition from "../transition/SlideUpTransition";

interface Props {
  snackbarOpen: boolean;
  message: string;
  snackbarClose: () => void;
}

/**
 * CustomSnackbar component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.snackbarClose - The function to close the snackbar.
 * @param {boolean} props.snackbarOpen - The flag indicating whether the snackbar is open or not.
 * @param {string} props.message - The message to be displayed in the snackbar.
 * @returns {JSX.Element} The rendered CustomSnackbar component.
 */
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
