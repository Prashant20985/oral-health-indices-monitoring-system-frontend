import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  message?: string;
}

/**
 * Renders a component to display a message when no rows are found.
 * @param {Props} props - The component props.
 * @param {string} props.message - The message to be displayed.
 * @returns {JSX.Element} The rendered component.
 */
export default function NoRowsFound({ message = "common.no-rows-found" }: Props) {
  const [t] = useTranslation("global");
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <img
        src="/assets/noRowsFound.webp"
        alt="No Rows Found"
        loading="lazy"
        height={200}
        width={200}
      />
      <Typography variant="h6" fontWeight={600} textTransform="uppercase">
        {t(message)}
      </Typography>
    </Box>
  );
}
