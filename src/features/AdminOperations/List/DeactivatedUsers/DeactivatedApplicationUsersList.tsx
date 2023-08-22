import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";

export default observer(function DeactivatedApplicationUsersList() {
  const { deactivatedUsersAxiosParamsStore, adminStore } = useStore();

  const {
    setUserType,
    setRole,
    setSearchTerm,
    clearFilters,
    searchTerm,
    role,
    userType,
  } = deactivatedUsersAxiosParamsStore;

  const handleUserTypeChange = (userType: string) => {
    setUserType(userType);
  };

  const handleRoleChange = (role: string) => {
    setRole(role);
  };

  const handleSetSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

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
        onRoleChange={handleRoleChange}
        setSearchTerm={handleSetSearchTerm}
        onUserTypeChange={handleUserTypeChange}
        userType={userType}
        role={role}
        clearFilters={clearFilters}
        searchTerm={searchTerm}
      />
      <ApplicationUserList
        applicationUsers={adminStore.deactivatedApplicationUsers}
        loading={adminStore.loading.deactivatdApplicationUsers}
      />
    </Box>
  );
});
