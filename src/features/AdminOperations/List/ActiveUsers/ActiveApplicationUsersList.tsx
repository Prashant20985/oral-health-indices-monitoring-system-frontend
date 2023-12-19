import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";

export default observer(function ActiveApplicationUsersList() {
  const { adminStore } = useStore();

  const {
    setActiveApplicationUsersUserType,
    setActiveApplicationUsersRole,
    setActiveApplicationUsersSearchTerm,
    clearActiveApplicationUsersFilters,
    activeApplicationUsersSearchTerm,
    activeApplicationUsersRole,
    activeApplicationUsersUserType,
    activeApplicationUsers,
    loading,
  } = adminStore;

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.activeApplicationUsers.length <= 0) {
        await adminStore.fetchActiveApplicationUsers();
      }
    };
    fetchUsers();
  }, [adminStore]);

  return (
    <Box>
      <ApplicationUsersListFilter
        title="Active Users"
        subTitle="List Of Active Users"
        onRoleChange={setActiveApplicationUsersRole}
        setSearchTerm={setActiveApplicationUsersSearchTerm}
        onUserTypeChange={setActiveApplicationUsersUserType}
        userType={activeApplicationUsersUserType}
        role={activeApplicationUsersRole}
        clearFilters={clearActiveApplicationUsersFilters}
        searchTerm={activeApplicationUsersSearchTerm}
      />
      <ApplicationUserList
        applicationUsers={activeApplicationUsers}
        loading={loading.activeApplicationUsers}
      />
    </Box>
  );
});
