import { useTheme, Button } from "@mui/material";
import { colors } from "../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  handleCancel: () => void;
  buttonText?: string;
}

/**
 * CustomCancelButton component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.handleCancel - The handleCancel function.
 * @param {string} [props.buttonText="common.cancel-button"] - The button text.
 * @returns {JSX.Element} The rendered CustomCancelButton component.
 */
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
