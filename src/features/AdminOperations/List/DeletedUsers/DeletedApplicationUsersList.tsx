import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";

export default observer(function DeletedApplicationUsersList() {
  const { adminStore } = useStore();

  const {
    setDeletedApplicationUserSearchParam,
    deletedApplicationUsersSearchParams,
    clearDeletedApplicationUsersFilters,
    deletedApplicationUsers,
    loading,
  } = adminStore;

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.deletedApplicationUsers.users.length <= 0) {
        await adminStore.fetchDeletedApplicationUsers();
      }
    };
    fetchUsers();
  }, [adminStore]);

  const handlePagination = (page: number, pageSize: number) => {
    setDeletedApplicationUserSearchParam({
      ...deletedApplicationUsersSearchParams,
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  const handleSeachParamChange = (
    role: string,
    userType: string,
    searchTerm: string
  ) => {
    setDeletedApplicationUserSearchParam({
      ...deletedApplicationUsersSearchParams,
      role: role,
      userType: userType,
      searchTerm: searchTerm,
    });
  };

  return (
    <Box>
      <ApplicationUsersListFilter
        title="Deleted Users"
        subTitle="List of Deleted Users"
        initalValues={{
          userType: deletedApplicationUsersSearchParams.userType,
          role: deletedApplicationUsersSearchParams.role,
          searchTerm: deletedApplicationUsersSearchParams.searchTerm,
        }}
        handleSeachParamChange={handleSeachParamChange}
        clearFilters={clearDeletedApplicationUsersFilters}
      />
      <ApplicationUserList
        setPaginationParams={handlePagination}
        page={deletedApplicationUsersSearchParams.pageNumber}
        pageSize={deletedApplicationUsersSearchParams.pageSize}
        applicationUsers={deletedApplicationUsers}
        loading={loading.deletedApplicationUsers}
        deletedUsersList={true}
      />
    </Box>
  );
});
