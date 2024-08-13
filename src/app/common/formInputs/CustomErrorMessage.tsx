import { Alert, AlertTitle } from "@mui/material";
import { ErrorMessage } from "formik";

interface Props {
  error?: string;
}

/**
 * Renders a custom error message component.
 * 
 * @param {Props} props - The component props.
 * @param {string} props.error - The error message to display.
 * @returns {JSX.Element} The custom error message component.
 */
export default function CustomErrorMessage({ error }: Props) {
  return (
    <ErrorMessage
      name="error"
      render={() => (
        <Alert severity="error" variant="filled" sx={{ gridColumn: "span 4" }}>
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    />
  );
}
