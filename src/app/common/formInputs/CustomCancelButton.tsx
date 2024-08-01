import { useTheme, Button } from "@mui/material";
import { colors } from "../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  handleCancel: () => void;
  buttonText?: string;
}

export default function CustomCancelButton({ handleCancel, buttonText="common.cancel-button" }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");
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
      {t(buttonText)}
    </Button>
  );
}
