import { Box, Grid } from "@mui/material";
import AddApplicationUserButton from "./AddApplicationUserButton";
import Header from "../../../app/common/header/Header";
import AddApplicationUserFromCsvButton from "./AddApplicationUserFromCsvButton";
import ActiveApplicationUsersListShortcut from "./ActiveApplicationUsersListShortcut";
import UserRequestForAdminShortcut from "./UserRequestForAdminShortcut";

export default function AdminDashboard() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="Admin Dashboard" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AddApplicationUserButton />
          <AddApplicationUserFromCsvButton />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <ActiveApplicationUsersListShortcut />
        <UserRequestForAdminShortcut />
      </Grid>
    </Box>
  );
}
