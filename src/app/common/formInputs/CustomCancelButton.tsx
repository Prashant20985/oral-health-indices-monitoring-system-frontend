import { useTheme, Button } from "@mui/material";
import { colors } from "../../../themeConfig";

interface Props {
  handleCancel: () => void;
  buttonText?: string;
}

export default function CustomCancelButton({ handleCancel, buttonText="Cancel" }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Button
      onClick={handleCancel}
      variant="contained"
      sx={{
        height: "40px",
        width: "25%",
        backgroundColor: color.redAccent[500],
        "&:hover": {
          backgroundColor: color.redAccent[400],
        },
      }}
    >
      {buttonText}
    </Button>
  );
}
