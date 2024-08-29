import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of active application users.
 *
 * @returns The ActiveApplicationUsersList component.
 */
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

  const [t] = useTranslation("global");

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
        title={t("admin-operations.list.active-users.header")}
        subTitle={t("admin-operations.list.active-users.sub-header")}
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
