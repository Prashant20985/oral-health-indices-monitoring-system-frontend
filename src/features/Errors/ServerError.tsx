import { Typography, Box } from "@mui/material";
import GoToHomePageButton from "./GoToHomePageButton";
import { useTranslation } from "react-i18next";

export default function ServerError() {
  
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
          {t("errors.server-error.ooops")} <br /> {t("errors.server-error.server-error")}
          </Typography>
          <br />
          <Typography variant="h5">
            {t("errors.server-error.message")}
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
