import {
  Box,
  IconButton,
  Button,
  MenuItem,
  useMediaQuery,
  Typography,
  MenuList,
  Popover,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import { router } from "../../../app/router/Routes";

export default observer(function AdminNavOptions() {
  const location = useLocation();

  const options = [
    {
      title: "Active Users",
      path: "active-users",
    },
    {
      title: "Deactivated Users",
      path: "deactivated-users",
    },
    {
      title: "Deleted Users",
      path: "deleted-users",
    },
  ];

  const currentPath = location.pathname.split("/")[2];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const isPortrait = useMediaQuery("(orientation: portrait)");
  const isScreenSizeReduced = useMediaQuery("(max-width: 960px)");

  return (
    <>
      {isPortrait || isScreenSizeReduced ? (
        <Box sx={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Popover
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={() => setAnchorElNav(null)}
            sx={{
              "& .MuiPopover-paper": {
                borderRadius: 0.5,
                width: "12rem",
              },
            }}
          >
            <MenuList>
              {options.map((option) => (
                <>
                  <MenuItem
                    key={option.title}
                    sx={{
                      fontWeight: currentPath === option.path ? "bold" : "none",
                    }}
                    onClick={() => {
                      router.navigate(`/admin/${option.path}`);
                      setAnchorElNav(null);
                    }}
                  >
                    {option.title}
                  </MenuItem>
                </>
              ))}
            </MenuList>
          </Popover>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {options.map((option) => (
            <Button
              key={option.title}
              variant="text"
              size="small"
              disableFocusRipple
              sx={{
                m: 0.7,
                color: currentPath === option.path ? "#40E0D0" : "white",
                transform: currentPath === option.path ? "scale(1.1)" : "none",
                transition: "transform 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => {
                router.navigate(`/admin/${option.path}`);
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                {option.title}
              </Typography>
            </Button>
          ))}
        </Box>
      )}
    </>
  );
});
