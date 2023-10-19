import { Typography, Box } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";

export default function NotFound() {
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
            Ooops... <br /> Page not Found!
          </Typography>
          <br />
          <Typography variant="h5">
            The Page you are looking for doesn't exists, go back to home page
          </Typography>
          <GoToHomePageButton />
        </Box>
        <Box
          display="flex"
          justifyContent="space-evenly"
          alignItems="center"
          alignContent="center"
          position="relative"
        >
          <Typography
            sx={{
              fontSize: 200,
              opacity: "20%",
              fontFamily: "cursive",
              mr: "2.7rem",
            }}
          >
            4
          </Typography>
          <img
            src="/assets/dental-caries.svg"
            loading="lazy"
            height={150}
            alt="Page Not Found"
            style={{
              zIndex: 1,
              position: "absolute",
            }}
          />
          <Typography
            sx={{
              fontSize: 200,
              opacity: "20%",
              fontFamily: "cursive",
              ml: "2.7rem",
            }}
          >
            4
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
