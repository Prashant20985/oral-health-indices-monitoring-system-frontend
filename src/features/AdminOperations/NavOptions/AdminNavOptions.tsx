import { Box, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { router } from "../../../app/router/Routes";
import { colors } from "../../../themeConfig";
import {
  DeleteForeverSharp,
  GppBadSharp,
  GppGoodSharp,
  QuestionAnswer,
} from "@mui/icons-material";
import { Menu, MenuItemStyles, MenuItem } from "react-pro-sidebar";

interface Props {
  menuItemStyles: MenuItemStyles;
}

export default observer(function AdminNavOptions({ menuItemStyles }: Props) {
  const location = useLocation();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const options = [
    {
      title: "Active Users",
      path: "active-users",
      icon: <GppGoodSharp />,
    },
    {
      title: "Deactivated Users",
      path: "deactivated-users",
      icon: <GppBadSharp />,
    },
    {
      title: "Deleted Users",
      path: "deleted-users",
      icon: <DeleteForeverSharp />,
    },
    {
      title: "User Requests",
      path: "requests",
      icon: <QuestionAnswer />,
    },
  ];

  const currentPath = location.pathname.split("/")[2];

  return (
    <Box mt="1.5rem">
      <Menu menuItemStyles={menuItemStyles}>
        {options.map((option) => (
          <MenuItem
            key={option.path}
            icon={option.icon}
            onClick={() => router.navigate(`/admin/${option.path}`)}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: currentPath === option.path ? 700 : 500,
                color: color.grey[100],
              }}
            >
              {option.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
});
