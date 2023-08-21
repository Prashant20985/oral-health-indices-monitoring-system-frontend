import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/Store";
import { Box } from "@mui/material";
import AdminDashboard from "../AdminOperations/Dashboard/AdminDashboard";

export default observer(function Dashboard() {
  const {
    userStore: { user },
  } = useStore();

  return <Box>{user?.role === "Admin" ? <AdminDashboard /> : <Box></Box>}</Box>;
});
