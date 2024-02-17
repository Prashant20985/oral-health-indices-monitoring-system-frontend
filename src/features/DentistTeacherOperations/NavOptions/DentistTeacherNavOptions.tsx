import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { BiotechOutlined, SchoolOutlined } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import { router } from "../../../app/router/Routes";
import { blueGrey } from "@mui/material/colors";

interface Props {
  open: boolean;
}

export default observer(function DentistTeacherNavOptions({ open }: Props) {
  const location = useLocation();
  const currentPath = location.pathname;

  const theme = useTheme();

  const options = [
    {
      title: "Research Groups",
      path: "/research-groups",
      icon: <BiotechOutlined />,
    },
    {
      title: "Student Groups",
      path: "/student-groups",
      icon: <SchoolOutlined />,
    },
  ];

  return (
    <>
      {options.map((option) => (
        <ListItem key={option.path} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              backgroundColor:
                currentPath === option.path
                  ? theme.palette.mode === "dark"
                    ? blueGrey[700]
                    : blueGrey[200]
                  : "inherit",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[100],
              },
            }}
            onClick={() => router.navigate(option.path)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {option.icon}
            </ListItemIcon>
            <ListItemText
              primary={option.title}
              sx={{ opacity: open ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
});
