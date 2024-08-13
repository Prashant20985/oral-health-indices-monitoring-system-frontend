import { Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";

interface props {
  title: string;
  subTitle?: string;
}

/**
 * Renders a header component with a title and optional subtitle.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {string} [props.subTitle=""] - The optional subtitle to be displayed in the header.
 * @returns {JSX.Element} The rendered header component.
 */
export default function Header({ title, subTitle = "" }: props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <>
      <Typography
        variant="h4"
        color={color.grey[100]}
        fontWeight="bold"
        align="left"
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color={color.greenAccent[400]}
        sx={{
          fontWeight: 700,
        }}
      >
        {subTitle}
      </Typography>
    </>
  );
}
