import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import Header from "../../../app/common/header/Header";
import AddPatientButton from "./AddPatientButton";

export default observer(function DentistTeacherDashboard() {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dentist Teacher Dashboard" />
        <AddPatientButton />
      </Box>
    </Box>
  );
});
