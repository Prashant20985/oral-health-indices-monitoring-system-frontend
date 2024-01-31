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
import { useTranslation } from "react-i18next";

type Language = "en" | "pl";
const EnglishFlag = "/assets/english.svg";
const PolishFlag = "/assets/polish.svg";

export default function LanguageSelect() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t, i18next] = useTranslation("global");

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );

  const [selectedLang, setSelectedLang] = React.useState<Language>(() => {
    const storedLang = localStorage.getItem("selectedLang");
    return (storedLang as Language) || "en";
  });

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorElLang(null);
  };

  const handleLanguageChange = (language: Language) => {
    i18next.changeLanguage(language);
    setSelectedLang(language);
    localStorage.setItem("selectedLang", language);
    handleCloseLangMenu();
  };

  const renderLanguageImage = () => {
    if (selectedLang === "en") {
      return <img src={EnglishFlag} alt="English" height={24} width={24} />;
    } else if (selectedLang === "pl") {
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
          <ListItemText primary={t("topbar.language.header")} />
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
            <MenuItem
              disabled={selectedLang === "en"}
              onClick={() => handleLanguageChange("en")}
            >
              <ListItemIcon>
                <Typography
                  variant="subtitle1"
                  sx={{ color: color.grey[100], fontWeight: 300 }}
                >
                  <img src={EnglishFlag} alt="English" height={30} width={20} />
                </Typography>
              </ListItemIcon>
              <Typography variant="inherit">
                {t("topbar.language.en")}
              </Typography>
            </MenuItem>
            <MenuItem
              disabled={selectedLang === "pl"}
              onClick={() => handleLanguageChange("pl")}
            >
              <ListItemIcon>
                <Typography
                  variant="subtitle1"
                  sx={{ color: color.grey[100], fontWeight: 300 }}
                >
                  <img src={PolishFlag} alt="Polish" height={30} width={20} />
                </Typography>
              </ListItemIcon>
              <Typography variant="inherit">
                {t("topbar.language.pl")}
              </Typography>
            </MenuItem>
          </MenuList>
        </Popover>
      </ListItem>
    </>
  );
}
