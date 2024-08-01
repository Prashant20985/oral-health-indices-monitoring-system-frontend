import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import { router } from "../../../app/router/Routes";
import ApplicationUserList from "../List/DataGrid/ApplicationUserList";
import { useTranslation } from "react-i18next";

export default observer(function ActiveApplicationUserListShortcut() {
  const { adminStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (adminStore.activeApplicationUsers.length <= 0) {
        await adminStore.fetchActiveApplicationUsers();
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
          {t("admin-operations.dashboard.active-users.header")}
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
            {t("admin-operations.dashboard.active-users.button")}
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
});
