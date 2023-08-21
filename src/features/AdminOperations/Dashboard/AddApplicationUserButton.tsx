import { PersonAddAlt1Rounded } from "@mui/icons-material";
import { Box, Button, Tooltip, useTheme } from "@mui/material";
import { useState } from "react";
import { colors } from "../../../themeConfig";
import AddApplicationUserForm from "../Forms/AddApplicationUserForm";

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

  return (
    <Box>
      <Tooltip title="Add User">
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
          Add User
        </Button>
      </Tooltip>
      <AddApplicationUserForm isOpen={isOpen} onClose={handleClose} />
    </Box>
  );
}
