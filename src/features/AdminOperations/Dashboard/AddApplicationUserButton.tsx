import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { Box, Button, Tooltip, useTheme } from "@mui/material";
import { useState } from "react";
import { colors } from "../../../themeConfig";
import AddApplicationUserForm from "../Forms/AddApplicationUserForm";
import { useTranslation } from "react-i18next";

export default function AddApplicationUserButton() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const [t] = useTranslation("global");

  return (
    <Box>
      <Tooltip title={t("admin-operations.dashboard.add-user-tooltip")}>
        <Button
          startIcon={<PersonAddAlt1Rounded />}
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: color.orangeAccent[600],
            color: "white",
            "&:hover": { backgroundColor: color.blueAccent[300] },
          }}
        >
          {t("admin-operations.dashboard.add-user-button")}
        </Button>
      </Tooltip>
      <AddApplicationUserForm isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
}
