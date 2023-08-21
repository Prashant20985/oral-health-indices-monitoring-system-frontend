import { Box } from "@mui/material";
import AddApplicationUserButton from "./AddApplicationUserButton";
import Header from "../../../app/common/header/Header";

export default function AdminDashboard() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="Admin Dashboard" />
          <AddApplicationUserButton />
      </Box>
    </Box>
  );
}