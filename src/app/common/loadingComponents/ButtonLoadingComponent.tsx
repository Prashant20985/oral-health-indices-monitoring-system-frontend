import { CircularProgress, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  content?: string;
}

export default function ButtonLoadingComponent({
  content = "common.loading-text",
}: Props) {
  const [t] = useTranslation("global");
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <CircularProgress
        color="info"
        size={20}
        thickness={4}
        sx={{ mr: "4px" }}
      />
      <span>{t(content)}</span>
    </Box>
  );
}
