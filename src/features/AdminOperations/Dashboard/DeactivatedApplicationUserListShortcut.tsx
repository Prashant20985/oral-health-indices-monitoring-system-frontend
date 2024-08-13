import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import ApplicationUserList from "../List/DataGrid/ApplicationUserList";
import { router } from "../../../app/router/Routes";

/**
 * Renders a shortcut component for displaying a list of deactivated application users in the admin dashboard.
 * Fetches the deactivated application users from the admin store and displays them in a paginated list.
 * Provides a button to navigate to the full list of deactivated users.
 */
export default observer(function DeactivatedApplicationUserListShortcut() {
  const { adminStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUsers = async () => {
      await adminStore.fetchDeactivatedApplicationUsers();
    };
    fetchUsers();
  }, [adminStore]);

  return (
    <Grid item xs={12} md={6} lg={6}>
      <Paper
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? color.primary[400]
              : color.primary[900],
        }}
      >
        <Typography
          variant="h6"
          p={1}
          textTransform="uppercase"
          fontWeight={600}
        >
          Deactivated Users
        </Typography>
        <ApplicationUserList
          page={adminStore.deactivatedApplicationUsersSearchParams.pageNumber}
          pageSize={adminStore.deactivatedApplicationUsersSearchParams.pageSize}
          setPaginationParams={(page: number, pageSize: number) => {
            adminStore.setDeactivatedApplicationUserSearchParam({
              ...adminStore.deactivatedApplicationUsersSearchParams,
              pageNumber: page,
              pageSize: pageSize,
            });
          }}
          applicationUsers={adminStore.deactivatedApplicationUsers}
          loading={adminStore.loading.deactivatdApplicationUsers}
          isDashboard={true}
          height="45vh"
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/admin/deactivated-users")}
            size="small"
          >
            View All
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
