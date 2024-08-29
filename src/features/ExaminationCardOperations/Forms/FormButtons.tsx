import { Edit, Close, Send } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  isView: boolean;
  setIsView: (value: boolean) => void;
  resetForm: () => void;
  setIsEditMode: (value: boolean) => void;
  handleSubmit: () => void;
  message?: string;
}

/**
 * Renders the form buttons component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.isView - Indicates if the form is in view mode.
 * @param {Function} props.setIsView - Callback function to set the view mode.
 * @param {Function} props.resetForm - Callback function to reset the form.
 * @param {Function} props.setIsEditMode - Callback function to set the edit mode.
 * @param {Function} props.handleSubmit - Callback function to handle form submission.
 * @param {string} props.message - The message to display in the button.
 * @returns {JSX.Element} The rendered form buttons component.
 */
export default function FormButtons({
  isView,
  setIsView,
  resetForm,
  setIsEditMode,
  handleSubmit,
  message,
}: Props) {
  const [t] = useTranslation("global");
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
        {t("examination-card-operations.forms.form-button.edit-button")} {message}
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
            {t("examination-card-operations.forms.form-button.cancel-button")}
          </Button>
          <Button
            variant="outlined"
            onClick={handleSubmit}
            color="secondary"
            endIcon={<Send />}
          >
            {t("examination-card-operations.forms.form-button.submit-button")}
          </Button>
        </Box>
      )}
    </Box>
  );
}
