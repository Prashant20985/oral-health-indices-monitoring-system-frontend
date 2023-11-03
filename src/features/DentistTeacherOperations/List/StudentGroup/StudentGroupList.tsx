import {
  Box,
  Button,
  InputAdornment,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import { colors } from "../../../../themeConfig";
import * as React from "react";
import Header from "../../../../app/common/header/Header";
import { Add, SearchRounded } from "@mui/icons-material";
import StudentGroupCard from "./StudentGroupCard";
import AddStudentGroupForm from "../../Forms/AddStudentGroupForm";

export default observer(function StudentGroupList() {
  const { dentistTeacherStore } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [groupSearchQuery, setGroupSearchQuery] = React.useState("");
  const [addFormOpen, setAddFormOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchGroups = async () => {
      await dentistTeacherStore.getGroups();
    };
    fetchGroups();
  }, [dentistTeacherStore]);

  const filteredGroups = dentistTeacherStore.groups.filter((group) =>
    group.groupName.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Header title="Student Groups" />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setAddFormOpen(true)}
        >
          Add New Group
        </Button>
      </Box>
      <Box
        display="flex"
        width="80%"
        alignSelf="center"
        flexDirection="column"
        mt="2rem"
      >
        <Box display="flex" justifyContent="flex-end">
          <Box width="30%">
            <TextField
              color="info"
              label="Search"
              variant="outlined"
              type="text"
              fullWidth
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRounded color="info" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
        <Paper
          style={{
            overflow: "auto",
            marginTop: "10px",
            backgroundColor: color.primary[400],
            width: "100%",
            height: "75vh",
          }}
        >
          {filteredGroups.map((group) => (
            <StudentGroupCard group={group} />
          ))}
        </Paper>
      </Box>
      <AddStudentGroupForm
        isOpen={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </Box>
  );
});
