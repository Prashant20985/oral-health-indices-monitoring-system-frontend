import {
  Box,
  Button,
  Grid,
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
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";

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
      <Box display="flex" mt={2} mb={2} width="40%">
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
      <Paper
        sx={{
          overflow: "auto",
          backgroundColor: color.primary[400],
          maxHeight: "75vh",
          minHeight: "50vh",
        }}
      >
        <Grid container spacing={1} sx={{ p: 1 }}>
          {filteredGroups.length > 0 ? (
            <>
              {filteredGroups.map((group) => (
                <Grid item md={6} lg={3} key={group.id}>
                  <StudentGroupCard group={group} />
                </Grid>
              ))}
            </>
          ) : (
            <Box margin="auto">
              <NoRowsFound />
            </Box>
          )}
        </Grid>
      </Paper>
      <AddStudentGroupForm
        isOpen={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </Box>
  );
});
