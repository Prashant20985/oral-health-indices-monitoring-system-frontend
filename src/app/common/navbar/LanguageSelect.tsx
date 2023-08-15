import {
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";

type Language = "english" | "polish";
const EnglishFlag = "/assets/english.svg";
const PolishFlag = "/assets/polish.svg";

export default function LanguageSelect() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );
  const [selectedLang, setSelectedLang] = React.useState<Language>("english");

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLang(language);
    handleCloseLangMenu();
  };

  const renderLanguageImage = () => {
    if (selectedLang === "english") {
      return <img src={EnglishFlag} alt="English" height={24} width={24} />;
    } else if (selectedLang === "polish") {
      return <img src={PolishFlag} alt="Polish" height={24} width={24} />;
    }
    return null;
  };

  return (
    <>
      <Tooltip title="Change Language">
        <IconButton aria-label="language" onClick={handleOpenLangMenu}>
          {renderLanguageImage()}
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchorElLang}
        open={Boolean(anchorElLang)}
        onClose={handleCloseLangMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: color.primary[400],
            borderRadius: 0.5,
            width: "8rem",
          },
        }}
      >
        <MenuList>
          <MenuItem onClick={() => handleLanguageChange("english")}>
            <ListItemIcon>
              <Typography
                variant="subtitle1"
                sx={{ color: color.grey[100], fontWeight: 300 }}
              >
                <img src={EnglishFlag} alt="English" height={30} width={20} />
              </Typography>
            </ListItemIcon>
            <Typography variant="inherit">English</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleLanguageChange("polish")}>
            <ListItemIcon>
              <Typography
                variant="subtitle1"
                sx={{ color: color.grey[100], fontWeight: 300 }}
              >
                <img src={PolishFlag} alt="Polish" height={30} width={20} />
              </Typography>
            </ListItemIcon>
            <Typography variant="inherit">Polish</Typography>
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
