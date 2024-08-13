import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Typography,
  Tab,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import * as React from "react";
import { Add, ArrowBackIos, Edit, SchoolOutlined } from "@mui/icons-material";
import { router } from "../../../../app/router/Routes";
import { blueGrey } from "@mui/material/colors";
import EditStudentGroupForm from "../../Forms/EditStudentGroupForm";
import StudentList from "../StudentList/StudentList";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ExamsList from "../../../StudentExamOperations/ExamsList/ExamsList";
import PublishExamForm from "../../../StudentExamOperations/Forms/PublishExamForm";
import { useTranslation } from "react-i18next";

/**
 * Renders the details of a student group.
 * 
 * @returns The JSX element representing the student group details.
 */
export default observer(function StudentGroupDetails() {
  const {
    dentistTeacherStore: { selectedStudentGroup, getStudentGroup },
  } = useStore();
  const { id } = useParams<string>();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);

  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    if (id) {
      getStudentGroup(id);
    }
  }, [id, getStudentGroup]);

  const [t] = useTranslation("global");

  return (
    <>
      <Button
        startIcon={<ArrowBackIos />}
        size="small"
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        onClick={() => router.navigate("/student-groups")}
        sx={{ mb: 2 }}
      >
        {t(
          "dentist-teacher-operations.list.student-group.student-group-card.back-button"
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
            sx={{ width: "100%" }}
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
                <SchoolOutlined sx={{ fontSize: 50, color: "whitesmoke" }} />
              </Avatar>
            }
            title={
              <Typography variant="h2" fontFamily="monospace">
                {selectedStudentGroup?.groupName}
              </Typography>
            }
            subheader={
              <Typography variant="h6">
                {t(
                  "dentist-teacher-operations.list.student-group.student-group-card.sub-header"
                ) + selectedStudentGroup?.students.length}
              </Typography>
            }
          />
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button
                variant="outlined"
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                startIcon={<Edit />}
                onClick={() => setOpenEdit(true)}
              >
                {t(
                  "dentist-teacher-operations.list.student-group.student-group-card.edit-group-button"
                )}
              </Button>
            </Box>
          </CardActions>
        </Card>

        <TabContext value={value}>
          <Box>
            <TabList
              onChange={(_event, newValue) => setValue(newValue)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: color.greenAccent[600],
                },
              }}
            >
              <Tab
                label={
                  <Typography color={color.grey[100]}>
                    {t(
                      "dentist-teacher-operations.list.student-group.student-group-card.students-label"
                    )}
                  </Typography>
                }
                value="1"
              />
              <Tab
                label={
                  <Typography color={color.grey[100]}>
                    {t(
                      "dentist-teacher-operations.list.student-group.student-group-card.exams-label"
                    )}
                  </Typography>
                }
                value="2"
              />
            </TabList>
            <TabPanel value="1">
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    color="success"
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() =>
                      router.navigate(`/student-groups/${id}/add-students`)
                    }
                  >
                    {t(
                      "dentist-teacher-operations.list.student-group.student-group-card.add-student-button"
                    )}
                  </Button>
                </Box>
                {selectedStudentGroup?.students && (
                  <StudentList
                    students={selectedStudentGroup.students}
                    groupId={selectedStudentGroup.id}
                  />
                )}
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box display="flex" flexDirection="column" gap={1}>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="small"
                    color="success"
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => setOpenAdd(true)}
                  >
                    {t(
                      "dentist-teacher-operations.list.student-group.student-group-card.publish-new-exam-button"
                    )}
                  </Button>
                </Box>
                <ExamsList />
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
      <EditStudentGroupForm
        isOpen={openEdit}
        groupId={selectedStudentGroup?.id}
        name={selectedStudentGroup?.groupName}
        onClose={() => setOpenEdit(false)}
      />
      <PublishExamForm
        isOpen={openAdd}
        onClose={() => setOpenAdd(false)}
        groupId={id!}
      />
    </>
  );
});
