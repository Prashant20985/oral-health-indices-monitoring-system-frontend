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
  IconButton,
  Tooltip,
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

export default observer(function StudentGroupDetails() {
  const {
    dentistTeacherStore: { selectedStudentGroup, getStudentGroup },
  } = useStore();
  const { id } = useParams<string>();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openEdit, setOpenEdit] = React.useState(false);

  const [value, setValue] = React.useState("1");

  React.useEffect(() => {
    if (id) {
      getStudentGroup(id);
    }
  }, [id, getStudentGroup]);

  return (
    <>
      <Button
        startIcon={<ArrowBackIos />}
        size="small"
        color={theme.palette.mode === "dark" ? "secondary" : "info"}
        onClick={() => router.navigate("/student-groups")}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Box display="flex" flexDirection="column" gap={4}>
        <Card
          elevation={3}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? color.primary[400]
                : blueGrey[200],
            padding: 1,
            display: "flex",
          }}
        >
          <CardHeader
            sx={{ width: "100%" }}
            avatar={
              <Avatar
                variant="rounded"
                sx={{
                  height: 100,
                  width: 100,
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? blueGrey[500]
                      : blueGrey[600],
                }}
              >
                <SchoolOutlined sx={{ fontSize: 80, color: "whitesmoke" }} />
              </Avatar>
            }
            title={
              <Typography variant="h2" fontFamily="monospace">
                {selectedStudentGroup?.groupName}
              </Typography>
            }
            subheader={
              <Typography variant="h6">
                Number of Students: {selectedStudentGroup?.students.length}
              </Typography>
            }
          />
          <CardActions
            sx={{
              width: "100%",
              height: "2rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Edit Research Group">
              <IconButton onClick={() => setOpenEdit(true)}>
                <Edit
                  color={theme.palette.mode === "dark" ? "secondary" : "info"}
                />
              </IconButton>
            </Tooltip>
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
                  <Typography color={color.grey[100]}>Students</Typography>
                }
                value="1"
              />
              <Tab
                label={<Typography color={color.grey[100]}>Exams</Typography>}
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
                    Add Students
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
              <ExamsList />
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
    </>
  );
});
