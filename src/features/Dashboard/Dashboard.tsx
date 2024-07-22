import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/Store";
import { Box } from "@mui/material";
import AdminDashboard from "../AdminOperations/Dashboard/AdminDashboard";
import DentistTeacherDashboard from "../DentistTeacherOperations/Dashboard/DentistTeacherDashboard";
import StudentDashboard from "../StudentOperations/Dashboard/StudentDashboard";

export default observer(function Dashboard() {
  const {
    userStore: { user },
  } = useStore();

  return (
    <Box>
      {user?.role === "Admin" ? (
        <AdminDashboard />
      ) : user?.role === "Dentist_Teacher_Researcher" ||
        user?.role === "Dentist_Teacher_Examiner" ? (
        <DentistTeacherDashboard />
      ) : user?.role === "Student" ? (
        <StudentDashboard />
      ) : null}
    </Box>
  );
});
