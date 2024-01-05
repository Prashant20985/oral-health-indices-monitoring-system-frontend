import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../themeConfig";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Navbar from "../common/navbar/Navbar";
import { useStore } from "../stores/Store";
import * as React from "react";
import { observer } from "mobx-react-lite";
import SkeletonLoadingComponenet from "../common/loadingComponents/SkeletonLoadingComponent";
import SidebarComponent from "../common/sidebar/SidebarComponent";

function App() {
  const [theme, colorMode] = useMode();
  const { commonStore, userStore } = useStore();

  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  React.useEffect(() => {
    if (commonStore.token) {
      userStore.getCurrentUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        {commonStore.applocationLoaded ? (
          <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <Box display="flex">
              <SidebarComponent
                open={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
              <Container
                maxWidth="xl"
                component="main"
                sx={{ flexGrow: 1, p: 4, mt: 6 }}
              >
                <Outlet />
              </Container>
            </Box>
          </>
        ) : (
          <SkeletonLoadingComponenet />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default observer(App);
