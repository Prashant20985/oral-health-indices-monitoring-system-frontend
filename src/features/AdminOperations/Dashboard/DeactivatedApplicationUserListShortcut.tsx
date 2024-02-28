import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import ApplicationUserList from "../List/DataGrid/ApplicationUserList";
import { router } from "../../../app/router/Routes";

export default observer(function DeactivatedApplicationUserListShortcut() {
  const { adminStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.deactivatedApplicationUsers.length <= 0) {
        await adminStore.fetchDeactivatedApplicationUsers();
      }
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
          applicationUsers={adminStore.deactivatedApplicationUsers}
          loading={adminStore.loading.deactivatdApplicationUsers}
          isDashboard={true}
          height="30vh"
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
