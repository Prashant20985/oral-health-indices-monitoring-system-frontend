import { Box } from "@mui/material";
import AddApplicationUserButton from "./AddApplicationUserButton";
import Header from "../../../app/common/header/Header";
import AddApplicationUserFromCsvButton from "./AddApplicationUserFromCsvButton";

export default function AdminDashboard() {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Header title="Admin Dashboard" />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <AddApplicationUserButton />
          <AddApplicationUserFromCsvButton />
        </Box>
      </Box>
    </Box>
  );
}
