import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import { useParams } from "react-router-dom";
import * as React from "react";
import { Add, ArrowBackIos, Biotech, Edit } from "@mui/icons-material";
import { colors } from "../../../../themeConfig";
import ResearchGroupPatientList from "../ResearchGroupPatientList/ResearchGroupPatientList";
import Header from "../../../../app/common/header/Header";
import ResearchGroupForm from "../../Forms/ResearchGroupForm";
import { router } from "../../../../app/router/Routes";

export default observer(function ResearchGroupDetails() {
  const { dentistTeacherStore } = useStore();
  const { selectedResearchGroup } = dentistTeacherStore;
  const { id } = useParams<string>();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openEdit, setOpenEdit] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      dentistTeacherStore.getResearchGroup(id);
    }
  }, [id, dentistTeacherStore]);

  return (
    <>
      <Button
        startIcon={<ArrowBackIos />}
        size="small"
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        onClick={() => router.navigate("/research-groups")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box>
          <Card
            sx={{
              background: `linear-gradient(248.6deg, ${color.greenAccent[800]} 0%, ${color.primary[400]} 99.8%)`,
            }}
          >
            <CardHeader
              avatar={
                <Avatar variant="square" sx={{ height: 100, width: 100 }}>
                  <Biotech sx={{ fontSize: 80, color: "whitesmoke" }} />
                </Avatar>
              }
              title={
                <Typography variant="h2" fontFamily="monospace">
                  {selectedResearchGroup?.groupName}
                </Typography>
              }
              subheader={
                <Typography variant="h6">
                  Created By: {selectedResearchGroup?.createdBy}
                </Typography>
              }
            />
            <CardContent>
              <Box width="60%">
                <Typography variant="body1">
                  {selectedResearchGroup?.description}
                </Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Tooltip title="Edit Research Group">
                <IconButton onClick={() => setOpenEdit(true)}>
                  <Edit color="warning" />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Box>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="Patients" />
            <Button
              color="success"
              startIcon={<Add />}
              variant="contained"
              onClick={() =>
                router.navigate(`/research-groups/${id}/add-patients`)
              }
            >
              Add Patient
            </Button>
          </Box>
          {selectedResearchGroup?.patients && (
            <ResearchGroupPatientList
              patients={selectedResearchGroup?.patients}
              researchGroupId={selectedResearchGroup.id}
            />
          )}
        </Box>
      </Box>
      <ResearchGroupForm
        isOpen={openEdit}
        isEdit={true}
        onClose={() => setOpenEdit(false)}
        researchGroupId={selectedResearchGroup?.id}
        groupName={selectedResearchGroup?.groupName}
        description={selectedResearchGroup?.description}
      />
    </>
  );
});
