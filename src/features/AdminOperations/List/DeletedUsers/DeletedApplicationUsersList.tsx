import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";

export default observer(function DeletedApplicationUsersList() {
  const { deletedUsersAxiosParamsStore, adminStore } = useStore();

  const {
    setUserType,
    setRole,
    setSearchTerm,
    clearFilters,
    searchTerm,
    role,
    userType,
  } = deletedUsersAxiosParamsStore;

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
      if (adminStore.deletedApplicationUsers.length <= 0) {
        await adminStore.fetchDeletedApplicationUsers();
      }
    };
    fetchUsers();
  }, [adminStore]);
  return (
    <Box>
      <ApplicationUsersListFilter
        title="Deleted Users"
        subTitle="List of Deleted Users"
        onRoleChange={handleRoleChange}
        setSearchTerm={handleSetSearchTerm}
        onUserTypeChange={handleUserTypeChange}
        userType={userType}
        role={role}
        clearFilters={clearFilters}
        searchTerm={searchTerm}
      />
      <ApplicationUserList
        applicationUsers={adminStore.deletedApplicationUsers}
        loading={adminStore.loading.deletedApplicationUsers}
        deletedUsersList={true}
      />
    </Box>
  );
});
