import { Box, Button, IconButton, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { UserRequest } from "../../../app/models/UserRequest";
import { Edit, DeleteSweep } from "@mui/icons-material";
import * as React from "react";
import EditUserRequestForm from "../Forms/EditUserRequestForm";
import UserRequestDeleteConfirmation from "../Forms/UserRequestDeleteConfirmation";
import { useTranslation } from "react-i18next";

interface Props {
  userRequest: UserRequest;
}

/**
 * Renders the actions for the current user request card.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {UserRequest} props.userRequest - The user request object.
 * @returns {JSX.Element} The rendered component.
 */
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

  const [t] = useTranslation("global");

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
          onClick={() => setOpenEditForm(true)}
        >
          {t("user-request-operations.list.user-request-actions.edit-button")}
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
