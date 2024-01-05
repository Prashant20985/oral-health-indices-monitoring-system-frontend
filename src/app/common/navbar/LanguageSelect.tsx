import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import { blueGrey } from "@mui/material/colors";

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
      <ListItem
        disablePadding
        sx={{ display: "block", justifyContent: "center" }}
      >
        <ListItemButton
          onClick={handleOpenLangMenu}
          sx={{
            px: 2.5,
            m: 0.5,
            borderRadius: 1.5,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[800] : blueGrey[100],
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: 3 }}>
            {renderLanguageImage()}
          </ListItemIcon>
          <ListItemText primary="Language" />
        </ListItemButton>
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
      </ListItem>
    </>
  );
}
