import {
  AppBar,
  Box,
  Container,
  Divider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import ColorModeToggle from "./ColorModeToggle";
import LanguageSelect from "./LanguageSelect";
import UserOptions from "./UserOptions";
import { useStore } from "../../stores/Store";
import { observer } from "mobx-react-lite";
import SidedrawerHeader from "../Sidedrawer/SidedrawerHeader";

interface Props {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

export default observer(function Navbar({
  isCollapsed,
  setIsCollapsed,
}: Props) {
  const theme = useTheme();
  const backgroundColor =
    theme.palette.mode === "dark" ? blueGrey[900] : "#455a64";

  const {
    userStore: { isUserLoggedIn },
  } = useStore();

  return (
    <Box display="flex">
      <AppBar
        position="relative"
        sx={{
          backgroundColor: backgroundColor,
        }}
      >
        <Box display="flex">
          {isUserLoggedIn ? (
            <SidedrawerHeader
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          ) : (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              ml={2}
            >
              <Typography
                variant="h4"
                noWrap
                color="inherit"
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 600,
                }}
              >
                ORAL EHR SYSTEM
              </Typography>
            </Box>
          )}
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box display="flex" flexGrow={0}>
                {isUserLoggedIn && (
                  <>
                    <UserOptions />
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        backgroundColor: "#fff",
                        ml: 2,
                        mr: 2,
                        mt: 1,
                        mb: 1,
                      }}
                    />
                  </>
                )}
                <LanguageSelect />
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "#fff", ml: 2, mr: 2, mt: 1, mb: 1 }}
                />
                <ColorModeToggle />
              </Box>
            </Toolbar>
          </Container>
        </Box>
      </AppBar>
    </Box>
  );
});
