import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../themeConfig";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import Navbar from "../common/navbar/Navbar";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="bottom-right"
          hideProgressBar
          theme="colored"
        />
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 10 }}>
          <Outlet />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
