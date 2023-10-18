import { Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { router } from "../../../app/router/Routes";
import { colors } from "../../../themeConfig";
import {
  DeleteSweepOutlined,
  GppBadOutlined,
  GppGoodOutlined,
  GroupRounded,
} from "@mui/icons-material";
import { Menu, MenuItemStyles, SubMenu, MenuItem } from "react-pro-sidebar";

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
      icon: <GppGoodOutlined color="success" />,
    },
    {
      title: "Deactivated Users",
      path: "deactivated-users",
      icon: <GppBadOutlined color="warning" />,
    },
    {
      title: "Deleted Users",
      path: "deleted-users",
      icon: <DeleteSweepOutlined color="error" />,
    },
  ];

  const currentPath = location.pathname.split("/")[2];

  return (
    <Menu menuItemStyles={menuItemStyles}>
      <SubMenu
        label="Users"
        icon={
          <GroupRounded sx={{ fontSize: 30, color: color.redAccent[400] }} />
        }
      >
        {options.map((option) => (
          <>
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
          </>
        ))}
      </SubMenu>
    </Menu>
  );
});
