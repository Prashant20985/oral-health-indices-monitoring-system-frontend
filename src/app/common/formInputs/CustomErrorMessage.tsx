import { Alert, AlertTitle } from "@mui/material";
import { ErrorMessage } from "formik";

interface Props {
  error?: string;
}

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
