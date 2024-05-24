import { Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";

interface props {
  title: string;
  subTitle?: string;
}

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
