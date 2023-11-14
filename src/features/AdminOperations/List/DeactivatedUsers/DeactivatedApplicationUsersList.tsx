import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";

export default observer(function DeactivatedApplicationUsersList() {
  const { adminStore } = useStore();

  const {
    setDeactivatedApplicationUsersRole,
    setDeactivatedApplicationUsersSearchTerm,
    setDeactivatedApplicationUsersUserType,
    clearDeactivatedApplicationUsersFilters,
    deactivatedApplicationUsersSearchTerm,
    deactivatedApplicationUsersRole,
    deactivatedApplicationUsersUserType,
    deactivatedApplicationUsers,
    loading,
  } = adminStore;

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.deactivatedApplicationUsers.length <= 0) {
        await adminStore.fetchDeactivatedApplicationUsers();
      }
    };
    fetchUsers();
  }, [adminStore]);

  return (
    <Box>
      <ApplicationUsersListFilter
        title="Deactivated Users"
        subTitle="List Of Deactivated Users"
        onRoleChange={setDeactivatedApplicationUsersRole}
        setSearchTerm={setDeactivatedApplicationUsersSearchTerm}
        onUserTypeChange={setDeactivatedApplicationUsersUserType}
        userType={deactivatedApplicationUsersUserType}
        role={deactivatedApplicationUsersRole}
        clearFilters={clearDeactivatedApplicationUsersFilters}
        searchTerm={deactivatedApplicationUsersSearchTerm}
      />
      <ApplicationUserList
        applicationUsers={deactivatedApplicationUsers}
        loading={loading.deactivatdApplicationUsers}
      />
    </Box>
  );
});
