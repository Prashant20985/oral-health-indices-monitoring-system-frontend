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
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

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

  const [t] = useTranslation("global");

  return (
    <Box>
      <Box display="flex" alignContent="center" justifyContent="space-between">
        <Header title={t("dentist-teacher-operations.list.research-group.header")} />
        <Button
          variant="contained"
          color="success"
          startIcon={<Add />}
          onClick={() => setAddFormOpen(true)}
        >
          {t("dentist-teacher-operations.list.research-group.add-button")}
        </Button>
      </Box>
      <Box display="flex" mt={2} mb={2} width="40%">
        <TextField
          color="info"
          label={t("dentist-teacher-operations.list.research-group.search")}
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
        elevation={3}
        sx={{
          overflow: "auto",
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[500] : blueGrey[50],
          p: 1.5,
          borderRadius: 2,
          height: "75vh",
        }}
      >
        {dentistTeacherStore.researchGroups.length > 0 ? (
          <Grid container spacing={1} sx={{ p: 1 }}>
            {dentistTeacherStore.researchGroups.map((researchGroup) => (
              <Grid item lg={3} md={6} sm={12} xs={18} key={researchGroup.id}>
                <ResearchGroupCard researchGroup={researchGroup} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <NoRowsFound />
        )}
      </Paper>
      <ResearchGroupForm
        isOpen={addFormOpen}
        onClose={() => setAddFormOpen(false)}
      />
    </Box>
  );
});
