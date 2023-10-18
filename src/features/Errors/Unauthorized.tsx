import { Box, Typography } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";

export default function Unauthorized() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="90%"
      >
        <Box>
          <Typography fontSize={35} fontFamily="cursive">
            Unauthorized Area
          </Typography>
          <br />
          <Typography variant="h5">
            You are not authorized to access this page. Please check your login
            credentials or contact administrator for access.
          </Typography>
          <GoToHomePageButton />
        </Box>
        <Box>
          <img
            src="/assets/unauthorized.svg"
            loading="lazy"
            height={350}
            alt="Server Error"
          />
        </Box>
      </Box>
    </Box>
  );
}
