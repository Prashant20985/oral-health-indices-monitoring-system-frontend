import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";

export default observer(function DeletedApplicationUsersList() {
  const { adminStore } = useStore();

  const {
    setDeletedApplicationUsersRole,
    setDeletedApplicationUsersSearchTerm,
    setDeletedApplicationUsersUserType,
    clearDeletedApplicationUsersFilters,
    deletedApplicationUsersSearchTerm,
    deletedApplicationUsersRole,
    deletedApplicationUsersUserType,
    deletedApplicationUsers,
    loading,
  } = adminStore;

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
        onRoleChange={setDeletedApplicationUsersRole}
        setSearchTerm={setDeletedApplicationUsersSearchTerm}
        onUserTypeChange={setDeletedApplicationUsersUserType}
        userType={deletedApplicationUsersUserType}
        role={deletedApplicationUsersRole}
        clearFilters={clearDeletedApplicationUsersFilters}
        searchTerm={deletedApplicationUsersSearchTerm}
      />
      <ApplicationUserList
        applicationUsers={deletedApplicationUsers}
        loading={loading.deletedApplicationUsers}
        deletedUsersList={true}
      />
    </Box>
  );
});
