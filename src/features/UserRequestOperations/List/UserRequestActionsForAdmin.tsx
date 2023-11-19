import { observer } from "mobx-react-lite";
import { UserRequest } from "../../../app/models/UserRequest";
import { Box, Button, useTheme } from "@mui/material";

interface Props {
  userRequest: UserRequest;
  openMarkAsComplete: () => void;
}

export default observer(function UserRequestListForAdmin({
  userRequest,
  openMarkAsComplete,
}: Props) {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      height="1.5rem"
    >
      {userRequest.requestStatus === "Submitted" ? (
        <Button variant="outlined" size="small" color="warning">
          Mark as In Progress
        </Button>
      ) : userRequest.requestStatus === "In_Progress" ? (
        <Button
          variant="outlined"
          size="small"
          color={theme.palette.mode === "dark" ? "secondary" : "info"}
          onClick={openMarkAsComplete}
        >
          Mark as Completed
        </Button>
      ) : (
        <></>
      )}
    </Box>
  );
});
