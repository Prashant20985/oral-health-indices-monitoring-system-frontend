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
import Header from "../../../../app/common/header/Header";
import { Add, SearchRounded } from "@mui/icons-material";
import { useStore } from "../../../../app/stores/Store";
import * as React from "react";
import ResearchGroupCard from "./ResearchGroupCard";
import { colors } from "../../../../themeConfig";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import ResearchGroupForm from "../../Forms/ResearchGroupForm";

export default observer(function ResearchGroupList() {
  const { dentistTeacherStore } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [addFormOpen, setAddFormOpen] = React.useState(false);

  React.useEffect(() => {
    const fetchResearchGroups = async () => {
      await dentistTeacherStore.getResearchGroups();
    };
    fetchResearchGroups();
  }, [dentistTeacherStore]);

  return (
    <Box>
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title="Research Groups" />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setAddFormOpen(true)}
        >
          Add New Research Group
        </Button>
      </Box>
      <Box display="flex" mt={2} mb={2} width="40%">
        <TextField
          color="info"
          label="Search"
          variant="outlined"
          type="text"
          fullWidth
          size="small"
          value={dentistTeacherStore.researchGroupName}
          onChange={(e) =>
            dentistTeacherStore.setResearchGroupName(e.target.value)
          }
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
          {dentistTeacherStore.researchGroups.length > 0 ? (
            <>
              {dentistTeacherStore.researchGroups.map((researchGroup) => (
                <Grid item lg={3} md={6} sm={12} xs={18} key={researchGroup.id}>
                  <ResearchGroupCard researchGroup={researchGroup} />
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
      <ResearchGroupForm
        isOpen={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </Box>
  );
});
