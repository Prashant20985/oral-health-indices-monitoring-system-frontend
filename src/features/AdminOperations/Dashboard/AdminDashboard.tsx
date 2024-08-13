import { Box, Grid } from "@mui/material";
import AddApplicationUserButton from "./AddApplicationUserButton";
import Header from "../../../app/common/header/Header";
import AddApplicationUserFromCsvButton from "./AddApplicationUserFromCsvButton";
import ActiveApplicationUsersListShortcut from "./ActiveApplicationUsersListShortcut";
import UserRequestForAdminShortcut from "./UserRequestForAdminShortcut";
import DeactivatedApplicationUserListShortcut from "./DeactivatedApplicationUserListShortcut";
import ActivePatientListShortcut from "../../Dashboard/CommonDashboardComponents/ActivePatientListShortcut";
import ArchivedPatientListShortcut from "../../Dashboard/CommonDashboardComponents/ArchivedPatientListShortcut";
import { useTranslation } from "react-i18next";

/**
 * Renders the admin dashboard component.
 * 
 * @returns The rendered admin dashboard component.
 */
export default function AdminDashboard() {

  const [t] = useTranslation("global");
  
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title={t("admin-operations.dashboard.header")} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AddApplicationUserButton />
          <AddApplicationUserFromCsvButton />
        </Box>
      </Box>
      <Grid container spacing={2}>
        <ActiveApplicationUsersListShortcut />
        <DeactivatedApplicationUserListShortcut />
        <ActivePatientListShortcut />
        <ArchivedPatientListShortcut />
        <UserRequestForAdminShortcut />
      </Grid>
    </Box>
  );
}
