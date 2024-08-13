import { useTheme, Button } from "@mui/material";
import { colors } from "../../../themeConfig";
import LoadingComponent from "../loadingComponents/LoadingComponent";
import { useTranslation } from "react-i18next";

interface Props {
  isSubmitting: boolean;
  buttonText: string;
  width?: string;
  loadingText?: string;
  fullwidth?: boolean;
}

export default function CustomSubmitButton({
  isSubmitting,
  buttonText,
  fullwidth = false,
  width = "25%",
  loadingText = "common.submit-button-loading-text",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");

  return (
    <Button
      variant="contained"
      type="submit"
      fullWidth={fullwidth}
      disabled={isSubmitting}
      sx={{
        alignItems: "left",
        height: "40px",
        width: { width },
        backgroundColor: color.blueAccent[500],
        "&:hover": {
          backgroundColor: color.blueAccent[600],
        },
      }}
    >
      {isSubmitting ? (
        <LoadingComponent content={t(loadingText)} />
      ) : (
        <p>{buttonText}</p>
      )}
    </Button>
  );
}
