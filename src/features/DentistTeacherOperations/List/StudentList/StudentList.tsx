import { observer } from "mobx-react-lite";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { colors } from "../../../../themeConfig";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import { Student } from "../../../../app/models/Group";
import { DeleteForever, PersonAdd } from "@mui/icons-material";
import { useStore } from "../../../../app/stores/Store";

interface Props {
  students: Student[];
  loading?: boolean;
  studentsInGroupList?: boolean;
  groupId: string;
}

export default observer(function StudentList({
  students,
  loading = false,
  studentsInGroupList = true,
  groupId,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { dentistTeacherStore } = useStore();

  const [studentsList, setStudentsList] = React.useState<Student[]>([]);

  React.useEffect(() => {
    setStudentsList(students);
  }, [students]);

  const handleRemoveStudentFromGroupClick = async (studentId: string) => {
    await dentistTeacherStore
      .removeStudentFromGroup(groupId, studentId)
      .then(() => {
        const updatedStudents = studentsList.filter((s) => s.id !== studentId);
        setStudentsList(updatedStudents);
      });
  };

  const handleAddStudentsToGroupClick = async (student: Student) => {
    await dentistTeacherStore.addStudentToGroup(groupId, student).then(() => {
      const updatedStudents = studentsList.filter((s) => s.id !== student.id);
      setStudentsList(updatedStudents);
    });
  };

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: "User Name",
      cellClassName: "name-column--cell",
      flex: 1,
      renderCell: ({ row }) => {
        const { userName } = row || {};
        return (
          <Box display="flex" alignItems="center" alignContent="center" gap={1}>
            <Avatar
              alt={userName}
              variant="rounded"
              sx={{
                width: 30,
                height: 30,
                backgroundColor: color.greenAccent[600],
              }}
            />
            <Typography className="name-column--cell">{userName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "firstName",
      headerName: "First Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    ...(!studentsInGroupList
      ? []
      : [
          {
            field: "groupName",
            headerName: "Group Name",
            cellClassName: "name-column--cell",
            flex: 1.5,
          },
        ]),
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        const { id } = row || {};
        return (
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            sx={{
              backgroundColor: studentsInGroupList
                ? color.redAccent[600]
                : color.greenAccent[600],
              borderRadius: "4px",
            }}
          >
            {studentsInGroupList ? (
              <Tooltip title="Remove From Group">
                <IconButton
                  onClick={() => handleRemoveStudentFromGroupClick(id)}
                >
                  <DeleteForever color="primary" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Add To Group">
                <IconButton onClick={() => handleAddStudentsToGroupClick(row)}>
                  <PersonAdd color="primary" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <Box
      height="65vh"
      width="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: color.primary[400],
          borderBottom: "solid 1px",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: color.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderBottom: "none",
          backgroundColor: color.primary[400],
        },
        "& .name-column--cell": {
          color: color.grey[100],
          fontSize: 14,
        },
        overflow: "auto",
      }}
    >
      <DataGrid
        columns={columns}
        rows={studentsList.map((item, index) => ({ Id: index + 1, ...item }))}
        autoPageSize
        loading={loading}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
        slots={{
          loadingOverlay: LinearProgressComponent,
        }}
      />
    </Box>
  );
});
