import { observer } from "mobx-react-lite";
import { UserRequest } from "../../../app/models/UserRequest";
import { Box, Button, useTheme } from "@mui/material";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  userRequest: UserRequest;
  openMarkAsComplete: () => void;
}

export default observer(function UserRequestListForAdmin({
  userRequest,
  openMarkAsComplete,
}: Props) {
  const theme = useTheme();

  const {
    userRequestStore: { updateUserRequestToInProgress },
  } = useStore();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleMarkInProgressClick = async () => {
    await updateUserRequestToInProgress(userRequest.id).then(() =>
      setOpenSnackbar(true)
    );
  };

  const [t] = useTranslation("global");

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      height="1.5rem"
    >
      {userRequest.requestStatus === "Submitted" ? (
        <Button
          variant="outlined"
          color={theme.palette.mode === "dark" ? "secondary" : "info"}
          onClick={handleMarkInProgressClick}
        >
          {t("user-request-operations.list.user-request-actions.mark-in-progress")}
        </Button>
      ) : userRequest.requestStatus === "In_Progress" ? (
        <Button
          variant="outlined"
          color={theme.palette.mode === "dark" ? "secondary" : "info"}
          onClick={openMarkAsComplete}
        >
          {t("user-request-operations.list.user-request-actions.mark-as-completed")}
        </Button>
      ) : (
        <></>
      )}
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message={t("user-request-operations.list.user-request-actions.message")}
      />
    </Box>
  );
});
