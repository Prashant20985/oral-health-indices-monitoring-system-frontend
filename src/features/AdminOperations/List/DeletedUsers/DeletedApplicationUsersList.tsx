import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of deleted application users.
 *
 * @returns The JSX element representing the deleted application users list.
 */
export default observer(function DeletedApplicationUsersList() {
  const { adminStore } = useStore();

  const [t] = useTranslation("global");

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
        title={t("admin-operations.list.deleted-users.header")}
        subTitle={t("admin-operations.list.deleted-users.sub-header")}
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
