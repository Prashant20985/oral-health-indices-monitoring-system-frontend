import { Box, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Biotech, School } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { router } from "../../../app/router/Routes";
import { colors } from "../../../themeConfig";

interface Props {
  menuItemStyles: MenuItemStyles;
}

export default observer(function DentistTeacherNavOptions({
  menuItemStyles,
}: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const options = [
    {
      title: "Research Groups",
      path: "/research-groups",
      icon: <Biotech sx={{ fontSize: 25 }} />,
    },
    {
      title: "Student Groups",
      path: "/student-groups",
      icon: <School />,
    },
  ];

  return (
    <Box mt="1.5rem">
      <Menu menuItemStyles={menuItemStyles}>
        {options.map((option) => (
          <MenuItem
            key={option.path}
            icon={option.icon}
            onClick={() => router.navigate(option.path)}
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
