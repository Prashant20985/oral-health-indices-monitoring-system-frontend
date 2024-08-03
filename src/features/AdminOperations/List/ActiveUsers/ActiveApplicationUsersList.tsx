import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";

export default observer(function ActiveApplicationUsersList() {
  const { adminStore } = useStore();

  const {
    clearActiveApplicationUsersFilters,
    activeApplicationUsers,
    loading,
    setActiveApplicationUserSearchParam,
    activeApplicationUsersSearchParams,
  } = adminStore;

  React.useEffect(() => {
    const fetchUsers = async () => {
      await adminStore.fetchActiveApplicationUsers();
    };
    fetchUsers();
  }, [adminStore]);

  const handlePagination = (page: number, pageSize: number) => {
    setActiveApplicationUserSearchParam({
      ...activeApplicationUsersSearchParams,
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  const handleSeachParamChange = (
    role: string,
    userType: string,
    searchTerm: string
  ) => {
    setActiveApplicationUserSearchParam({
      ...activeApplicationUsersSearchParams,
      role: role,
      userType: userType,
      searchTerm: searchTerm,
    });
  };

  return (
    <Box>
      <ApplicationUsersListFilter
        title="Active Users"
        subTitle="List Of Active Users"
        initalValues={{
          userType: activeApplicationUsersSearchParams.userType,
          role: activeApplicationUsersSearchParams.role,
          searchTerm: activeApplicationUsersSearchParams.searchTerm,
        }}
        handleSeachParamChange={handleSeachParamChange}
        clearFilters={clearActiveApplicationUsersFilters}
      />
      <ApplicationUserList
        setPaginationParams={handlePagination}
        page={activeApplicationUsersSearchParams.pageNumber}
        pageSize={activeApplicationUsersSearchParams.pageSize}
        applicationUsers={activeApplicationUsers}
        loading={loading.activeApplicationUsers}
      />
    </Box>
  );
});
