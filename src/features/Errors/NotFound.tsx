import { Typography, Box } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";
import { useTranslation } from "react-i18next";

/**
 * Renders the NotFound component.
 *
 * This component displays a "Page Not Found" message along with an image and a button to go back to the home page.
 *
 * @returns The rendered NotFound component.
 */
export default function NotFound() {

  const [t] = useTranslation("global");
  
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
          {t("errors.not-found.ooops")} <br /> {t("errors.not-found.page-not-found")}
          </Typography>
          <br />
          <Typography variant="h5">
          {t("errors.not-found.message")}
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
