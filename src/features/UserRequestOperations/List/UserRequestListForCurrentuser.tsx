import { Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import Header from "../../../app/common/header/Header";
import { Add } from "@mui/icons-material";
import * as React from "react";
import AddUserRequestForm from "../Forms/AddUserRequestForm";

export default observer(function UserRequestListForCurrentuser() {
  const [openAddRequestForm, setOpenAddRequestForm] = React.useState(false);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Header title="My Requests" />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setOpenAddRequestForm(true)}
        >
          New Request
        </Button>
      </Box>
      <AddUserRequestForm
        isOpen={openAddRequestForm}
        onClose={() => setOpenAddRequestForm(false)}
      />
    </Box>
  );
});
