import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import { Box } from "@mui/material";
import ApplicationUsersListFilter from "../Filter/ApplicationUsersListFilter";
import ApplicationUserList from "../DataGrid/ApplicationUserList";
import { useTranslation } from "react-i18next";

/**
 * Renders a list of deactivated application users.
 *
 * @returns The DeactivatedApplicationUsersList component.
 */
export default observer(function DeactivatedApplicationUsersList() {
  const { adminStore } = useStore();

  const [t] = useTranslation("global");

  const {
    clearDeactivatedApplicationUsersFilters,
    deactivatedApplicationUsers,
    loading,
    setDeactivatedApplicationUserSearchParam,
    deactivatedApplicationUsersSearchParams,
  } = adminStore;

  React.useEffect(() => {
    const fetchUsers = async () => {
      await adminStore.fetchDeactivatedApplicationUsers();
    };
    fetchUsers();
  }, [adminStore]);

  const handlePagination = (page: number, pageSize: number) => {
    setDeactivatedApplicationUserSearchParam({
      ...deactivatedApplicationUsersSearchParams,
      pageNumber: page,
      pageSize: pageSize,
    });
  };

  const handleSeachParamChange = (
    role: string,
    userType: string,
    searchTerm: string
  ) => {
    setDeactivatedApplicationUserSearchParam({
      ...deactivatedApplicationUsersSearchParams,
      role: role,
      userType: userType,
      searchTerm: searchTerm,
    });
  };

  return (
    <Box>
      <ApplicationUsersListFilter
        title={t("admin-operations.list.deactivated-users.header")}
        subTitle={t("admin-operations.list.deactivated-users.sub-header")}
        initalValues={{
          userType: deactivatedApplicationUsersSearchParams.userType,
          role: deactivatedApplicationUsersSearchParams.role,
          searchTerm: deactivatedApplicationUsersSearchParams.searchTerm,
        }}
        handleSeachParamChange={handleSeachParamChange}
        clearFilters={clearDeactivatedApplicationUsersFilters}
      />
      <ApplicationUserList
        setPaginationParams={handlePagination}
        page={deactivatedApplicationUsersSearchParams.pageNumber}
        pageSize={deactivatedApplicationUsersSearchParams.pageSize}
        applicationUsers={deactivatedApplicationUsers}
        loading={loading.deactivatdApplicationUsers}
      />
    </Box>
  );
});
