import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Dialog,
  useTheme,
} from "@mui/material";
import { UserRequest } from "../../../app/models/UserRequest";
import { useStore } from "../../../app/stores/Store";
import { colors } from "../../../themeConfig";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { useTranslation } from "react-i18next";

interface Props {
  userRequest: UserRequest;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserRequestDeleteConfirmation({
  userRequest,
  isOpen,
  onClose,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userRequestStore: { deleteUserRequest },
  } = useStore();

  const handleDeleteClick = async () => {
    await deleteUserRequest(userRequest.id).then(() => onClose());
  };

  const [t] = useTranslation("global");
  
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={SlideUpTransition}
      onClose={onClose}
    >
      <Card sx={{ backgroundColor: color.primary[400], p: 2 }}>
        <CardHeader
          title={t("user-request-operations.form.delete-confirmation.header")+`${userRequest.requestTitle} ?`}
        />
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
              {t("user-request-operations.form.delete-confirmation.cancel-button")}
            </Button>
            <Button
              variant="contained"
              onClick={handleDeleteClick}
              size="small"
              sx={{
                backgroundColor: color.redAccent[500],
                "&:hover": {
                  backgroundColor: color.redAccent[400],
                },
              }}
            >
              {t("user-request-operations.form.delete-confirmation.delete-button")}
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Dialog>
  );
}
