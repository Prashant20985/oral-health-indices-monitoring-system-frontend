import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../themeConfig";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Navbar from "../common/navbar/Navbar";
import { useStore } from "../stores/Store";
import * as React from "react";
import { observer } from "mobx-react-lite";
import SkeletonLoadingComponenet from "../common/loadingComponents/SkeletonLoadingComponent";

function App() {
  const [theme, colorMode] = useMode();
  const { commonStore, userStore } = useStore();

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
            <Navbar />
            <Container maxWidth="xl" sx={{ mt: 10 }}>
              <Outlet />
            </Container>
          </>
        ) : (
          <SkeletonLoadingComponenet />
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default observer(App);
