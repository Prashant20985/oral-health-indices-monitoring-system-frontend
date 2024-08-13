import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
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
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

/**
 * Renders the details of a research group.
 *
 * @returns The JSX element representing the research group details.
 */
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

  const [t] = useTranslation("global");

  return (
    <>
      <Button
        startIcon={<ArrowBackIos />}
        size="small"
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        onClick={() => router.navigate("/research-groups")}
        sx={{ mb: 2 }}
      >
        {t(
          "dentist-teacher-operations.list.research-group.research-group-details.back-button"
        )}
      </Button>
      <Box display="flex" flexDirection="column" gap={4}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: color.primary[400],
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                variant="rounded"
                sx={{
                  height: 70,
                  width: 70,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? blueGrey[500]
                      : blueGrey[600],
                }}
              >
                <Biotech sx={{ fontSize: 50, color: "whitesmoke" }} />
              </Avatar>
            }
            title={
              <Typography variant="h2" fontFamily="monospace">
                {selectedResearchGroup?.groupName}
              </Typography>
            }
            subheader={
              <Typography variant="h6">
                {t(
                  "dentist-teacher-operations.list.research-group.research-group-details.created-by"
                )}
                {selectedResearchGroup?.createdBy}
              </Typography>
            }
          />
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={4}
              color="secondary"
              value={selectedResearchGroup?.description}
              label={t(
                "dentist-teacher-operations.list.research-group.research-group-details.description"
              )}
              InputProps={{
                readOnly: true,
              }}
            />
          </CardContent>
          <CardActions>
            <Button
              startIcon={<Edit />}
              color={theme.palette.mode === "dark" ? "secondary" : "info"}
              variant="outlined"
              onClick={() => setOpenEdit(true)}
            >
              {t(
                "dentist-teacher-operations.list.research-group.research-group-details.edit-button"
              )}
            </Button>
          </CardActions>
        </Card>
        <Box display="flex" flexDirection="column" gap={1}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title={t(
                "dentist-teacher-operations.list.research-group.research-group-details.title"
              )}
            />
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
