import { Box, Typography, useTheme } from "@mui/material";
import { RequestStatus } from "../../../app/models/UserRequest";
import { colors } from "../../../themeConfig";

interface Props {
  status: RequestStatus;
}

/**
 * Renders the status component.
 *
 * @param {Props} props - The component props.
 * @param {string} props.status - The status value.
 * @returns {JSX.Element} The rendered status component.
 */
export default function Status({ status }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <Box
      p={0.8}
      borderRadius={1}
      sx={{ backgroundColor: color.blueAccent[600] }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: 600,
          color: "white",
        }}
      >
        {status === "In_Progress" ? "In Progress" : status}
      </Typography>
    </Box>
  );
}
