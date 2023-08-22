import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";

export default observer(function ActiveApplicationUsersList() {
  const { activeUsersAxiosParamsStore, adminStore } = useStore();

  const {
    setUserType,
    setRole,
    setSearchTerm,
    clearFilters,
    searchTerm,
    role,
    userType,
  } = activeUsersAxiosParamsStore;

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
        onRoleChange={handleRoleChange}
        setSearchTerm={handleSetSearchTerm}
        onUserTypeChange={handleUserTypeChange}
        userType={userType}
        role={role}
        clearFilters={clearFilters}
        searchTerm={searchTerm}
      />
      <ApplicationUserList
        applicationUsers={adminStore.activeApplicationUsers}
        loading={adminStore.loading.activeApplicationUsers}
      />
    </Box>
  );
});
