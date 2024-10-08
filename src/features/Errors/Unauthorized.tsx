import { Box, Typography } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";
import { useTranslation } from "react-i18next";

/**
 * Renders the Unauthorized component.
 * 
 * This component displays an unauthorized error message along with an image.
 * It uses the translation hook to localize the error message.
 * 
 * @returns The Unauthorized component.
 */
export default function Unauthorized() {

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
          {t("errors.unauthorized.header")}
          </Typography>
          <br />
          <Typography variant="h5">
          {t("errors.unauthorized.message")}
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
