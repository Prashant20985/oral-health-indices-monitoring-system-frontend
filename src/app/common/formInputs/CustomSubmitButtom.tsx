import { useTheme, Button } from "@mui/material";
import { colors } from "../../../themeConfig";
import ButtonLoadingComponent from "../loadingComponents/ButtonLoadingComponent";

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
  loadingText = "Saving...",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

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
        <ButtonLoadingComponent content={loadingText} />
      ) : (
        <p>{buttonText}</p>
      )}
    </Button>
  );
}
