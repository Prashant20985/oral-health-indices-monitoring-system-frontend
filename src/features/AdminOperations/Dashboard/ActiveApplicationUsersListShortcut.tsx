import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import { router } from "../../../app/router/Routes";
import ApplicationUserList from "../List/DataGrid/ApplicationUserList";

export default observer(function ActiveApplicationUserListShortcut() {
  const { adminStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.activeApplicationUsers.length <= 0) {
        await adminStore.fetchActiveApplicationUsers();
      }
    };
    fetchUsers();
  }, [adminStore]);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper sx={{ backgroundColor: color.primary[400] }}>
        <Typography
          variant="h6"
          p={0.5}
          textTransform="uppercase"
          fontWeight={600}
        >
          Active Users
        </Typography>
        <ApplicationUserList
          applicationUsers={adminStore.activeApplicationUsers}
          loading={adminStore.loading.activeApplicationUsers}
          isDashboard={true}
          height="30vh"
        />
        <Box display="flex" justifyContent="flex-end">
          <Button
            color={theme.palette.mode === "dark" ? "secondary" : "info"}
            onClick={() => router.navigate("/admin/active-users")}
            size="small"
          >
            View All
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
