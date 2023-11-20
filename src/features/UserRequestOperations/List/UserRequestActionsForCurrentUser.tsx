import { Box, Button, IconButton, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserRequest } from "../../../app/models/UserRequest";
import { Edit, DeleteSweep } from "@mui/icons-material";
import * as React from "react";
import EditUserRequestForm from "../Forms/EditUserRequestForm";
import UserRequestDeleteConfirmation from "../Forms/UserRequestDeleteConfirmation";

interface Props {
  userRequest: UserRequest;
}

export default observer(function UserRequestCardActionsForCurrentUser({
  userRequest,
}: Props) {
  const theme = useTheme();

  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false);

  const isDisabled =
    userRequest.requestStatus === "Completed" ||
    userRequest.requestStatus === "In_Progress";

  const [openEditForm, setOpenEditForm] = React.useState(false);

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        height="1.5rem"
      >
        <Button
          variant="outlined"
          color={theme.palette.mode === "dark" ? "secondary" : "info"}
          startIcon={<Edit />}
          disabled={isDisabled}
          size="small"
          onClick={() => setOpenEditForm(true)}
        >
          Edit
        </Button>
        <IconButton
          disabled={isDisabled}
          onClick={() => setOpenDeleteConfirmation(true)}
        >
          <DeleteSweep color={isDisabled ? "disabled" : "error"} />
        </IconButton>
      </Box>
      <EditUserRequestForm
        isOpen={openEditForm}
        onClose={() => setOpenEditForm(false)}
        userRequestId={userRequest.id}
        requestTitle={userRequest.requestTitle}
        description={userRequest.description}
      />
      <UserRequestDeleteConfirmation
        isOpen={openDeleteConfirmation}
        userRequest={userRequest}
        onClose={() => setOpenDeleteConfirmation(false)}
      />
    </>
  );
});
