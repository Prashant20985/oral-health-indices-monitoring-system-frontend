import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { router } from "../../router/Routes";
import { useLocation } from "react-router-dom";

interface Props {
  open: boolean;
  path: string;
  icon: React.ReactNode;
  text: string;
}

/**
 * Renders a sidebar list item.
 *
 * @param {Props} props - The component props.
 * @param {boolean} props.open - Indicates if the sidebar item is open.
 * @param {string} props.path - The path of the sidebar item.
 * @param {ReactNode} props.icon - The icon of the sidebar item.
 * @param {string} props.text - The text of the sidebar item.
 * @returns {JSX.Element} The rendered sidebar list item.
 */
export default function SidebarListItem({ open, path, icon, text }: Props) {
  const theme = useTheme();

  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? "initial" : "center",
          px: 2.5,
          m: 0.5,
          borderRadius: 1.5,
          backgroundColor:
            currentPath === path
              ? theme.palette.mode === "dark"
                ? blueGrey[700]
                : blueGrey[200]
              : "inherit",
          "&:hover": {
            backgroundColor:
              theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[100],
          },
        }}
        onClick={() => router.navigate(path)}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
}
