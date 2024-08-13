import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  content?: string;
}

/**
 * Renders a loading component with a circular progress indicator and a text content.
 * @param {Props} props - The component props.
 * @param {string} props.content - The content to be displayed.
 * @returns {JSX.Element} The rendered loading component.
 */
export default function LoadingComponent({
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
