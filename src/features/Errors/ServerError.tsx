import { Typography, Box } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";

export default function ServerError() {
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
            Ooops... <br /> Internal Server Error
          </Typography>
          <br />
          <Typography variant="h5">
            We are experiencing internal server error please try again later
          </Typography>
          <GoToHomePageButton />
        </Box>
        <Box>
          <img
            src="/assets/security-system.svg"
            loading="lazy"
            height={350}
            alt="Server Error"
          />
        </Box>
      </Box>
    </Box>
  );
}
