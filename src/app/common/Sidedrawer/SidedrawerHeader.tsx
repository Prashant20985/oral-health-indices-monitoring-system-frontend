import { Box, Typography, useTheme } from "@mui/material";
import { ViewSidebarRounded } from "@mui/icons-material";
import { colors } from "../../../themeConfig";
interface Props {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}
export default function SidedrawerHeader({
  isCollapsed,
  setIsCollapsed,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mb="2rem">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          width: "80%",
          height: "3rem",
          borderRadius: "5px",
          padding: 1,
          background: color.blueAccent[700],
          cursor: "pointer",
        }}
      >
        {isCollapsed ? (
          <ViewSidebarRounded sx={{ fontSize: 25 }} />
        ) : (
          <Typography
            variant="h4"
            noWrap
            color="inherit"
            sx={{
              fontFamily: "monospace",
              fontWeight: 600,
            }}
          >
            Oral EHR System
          </Typography>
        )}
      </Box>
    </Box>
  );
}
