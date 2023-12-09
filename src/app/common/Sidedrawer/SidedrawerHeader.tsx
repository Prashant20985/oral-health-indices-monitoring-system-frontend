import { Box, Button, Typography } from "@mui/material";
import {
  KeyboardDoubleArrowLeftSharp,
  ViewSidebarRounded,
} from "@mui/icons-material";
interface Props {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}
export default function SidedrawerHeader({
  isCollapsed,
  setIsCollapsed,
}: Props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" ml={1}>
      <Button onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? (
          <ViewSidebarRounded sx={{ fontSize: 25, color: "white" }} />
        ) : (
          <Box display="flex" gap={1}>
            <Typography
              variant="h4"
              noWrap
              color="inherit"
              sx={{
                fontFamily: "monospace",
                fontWeight: 600,
                color: "white",
              }}
            >
              ORAL EHR SYSTEM
            </Typography>
            <KeyboardDoubleArrowLeftSharp
              sx={{ fontSize: 25, color: "secondary.main" }}
            />
          </Box>
        )}
      </Button>
    </Box>
  );
}
