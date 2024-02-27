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

interface Props {
  patientId: string;
  isOpen: boolean;
  onClose: () => void;
}

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

  return (
    <>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <Card sx={{ backgroundColor: color.primary[400], p: 2 }}>
          <CardHeader title="Are you sure you want to delete this patient?" />
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
                Cancel
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
                Delete
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Dialog>
      <CustomSanckbar
        snackbarOpen={snakbarOpen}
        message="Patient Deleted Successfully!!"
        snackbarClose={() => setSnackbarOpen(false)}
      />
    </>
  );
});
