import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Renders a confirmation dialog for deleting a patient.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.patientId - The ID of the patient to be deleted.
 * @param {boolean} props.isOpen - Indicates whether the dialog is open or not.
 * @param {() => void} props.onClose - Callback function to close the dialog.
 * @returns {JSX.Element} The rendered DeletePatientConfirmation component.
 */
export default observer(function DeletePatientConfirmation({
  patientId,
  isOpen,
  onClose,
}: Props) {
  const {
    patientStore: { deletePatient },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [snakbarOpen, setSnackbarOpen] = React.useState(false);

  const handleDelete = async () => {
    await deletePatient(patientId);
    console.log(patientId);
    setSnackbarOpen(true);
    onClose();
  };

  const [t] = useTranslation("global");

  return (
    <>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <Card sx={{ backgroundColor: color.primary[400], p: 2 }}>
          <CardHeader title={t("patient-operations.delete-confirmation.header")} />
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%" gap={2}>
              <Button
                onClick={onClose}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: color.blueAccent[500],
                  "&:hover": {
                    backgroundColor: color.blueAccent[600],
                  },
                }}
              >
                {t("patient-operations.delete-confirmation.cancel-button")}
              </Button>
              <Button
                onClick={handleDelete}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: color.redAccent[500],
                  "&:hover": {
                    backgroundColor: color.redAccent[600],
                  },
                }}
              >
                {t("patient-operations.delete-confirmation.delete-button")}
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Dialog>
      <CustomSanckbar
        snackbarOpen={snakbarOpen}
        message={t("patient-operations.delete-confirmation.snackbar-message")}
        snackbarClose={() => setSnackbarOpen(false)}
      />
    </>
  );
});
