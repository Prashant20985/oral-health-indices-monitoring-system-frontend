import { observer } from "mobx-react-lite";
import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import * as React from "react";
import { colors } from "../../../../themeConfig";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import { Student } from "../../../../app/models/Group";
import { DeleteForever, PersonAdd } from "@mui/icons-material";
import { useStore } from "../../../../app/stores/Store";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import { useTranslation } from "react-i18next";

interface Props {
  students: Student[];
  loading?: boolean;
  studentsInGroupList?: boolean;
  groupId?: string;
  isSupervisedStudents?: boolean;
  isUnsupervisedStudents?: boolean;
  page?: number;
  pageSize?: number;
  setPaginationParams?: (page: number, pageSize: number) => void;
  rowCount?: number;
}

export default observer(function StudentList({
  students,
  loading = false,
  studentsInGroupList = true,
  groupId,
  isSupervisedStudents,
  isUnsupervisedStudents,
  page,
  setPaginationParams,
  pageSize,
  rowCount,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const { dentistTeacherStore } = useStore();

  const [studentsList, setStudentsList] = React.useState<Student[]>([]);
  const [pageModel, setPageModel] = React.useState({
    page: page || 0,
    pageSize: pageSize || 20,
  });

  const handlePageModelChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    if (setPaginationParams) {
      setPaginationParams(page, pageSize);
    }
    setPageModel({ page, pageSize });
  };

  const [t] = useTranslation("global");

  React.useEffect(() => {
    setStudentsList(students);
  }, [students]);

  const handleRemoveStudentFromGroupClick = async (studentId: string) => {
    await dentistTeacherStore
      .removeStudentFromStudentGroup(groupId!, studentId)
      .then(() => {
        const updatedStudents = studentsList.filter((s) => s.id !== studentId);
        setStudentsList(updatedStudents);
      });
  };

  const handleAddStudentsToGroupClick = async (student: Student) => {
    await dentistTeacherStore
      .addStudentToStudentGroup(groupId!, student)
      .then(() => {
        const updatedStudents = studentsList.filter((s) => s.id !== student.id);
        setStudentsList(updatedStudents);
      });
  };

  const handleSuperviseStudentClick = async (studentId: string) => {
    await dentistTeacherStore.superviseStudent(studentId).then(() => {
      const updatedStudents = studentsList.filter((s) => s.id !== studentId);
      setStudentsList(updatedStudents);
    });
  };

  const handleUnSpuerviseStudentClick = async (studentId: string) => {
    await dentistTeacherStore.unsuperviseStudent(studentId).then(() => {
      const updatedStudents = studentsList.filter((s) => s.id !== studentId);
      setStudentsList(updatedStudents);
    });
  };

  const columns: GridColDef[] = [
    {
      field: "userName",
      headerName: t("dentist-teacher-operations.list.student-group.user-name"),
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
      headerName: t("dentist-teacher-operations.list.student-group.first-name"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("dentist-teacher-operations.list.student-group.last-name"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: t("dentist-teacher-operations.list.student-group.email"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "actions",
      headerName: t("dentist-teacher-operations.list.student-group.actions"),
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        const { id } = row || {};
        return (
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor:
                studentsInGroupList || isSupervisedStudents
                  ? color.pinkAccent[600]
                  : color.greenAccent[600],
              "&:hover": {
                backgroundColor:
                  studentsInGroupList || isSupervisedStudents
                    ? color.pinkAccent[700]
                    : color.greenAccent[700],
              },
            }}
            onClick={() => {
              if (isSupervisedStudents) {
                handleUnSpuerviseStudentClick(id);
              } else if (isUnsupervisedStudents) {
                handleSuperviseStudentClick(id);
              } else if (studentsInGroupList) {
                handleRemoveStudentFromGroupClick(id);
              } else {
                handleAddStudentsToGroupClick(row as Student);
              }
            }}
            startIcon={
              <>
                {studentsInGroupList || isSupervisedStudents ? (
                  <DeleteForever />
                ) : !studentsInGroupList || isUnsupervisedStudents ? (
                  <PersonAdd />
                ) : null}
              </>
            }
          >
            {studentsInGroupList || isSupervisedStudents
              ? isSupervisedStudents
                ? t(
                    "dentist-teacher-operations.list.student-group.unsupervise-student-button"
                  )
                : t(
                    "dentist-teacher-operations.list.student-group.remove-from-group-button"
                  )
              : !studentsInGroupList || isUnsupervisedStudents
              ? isUnsupervisedStudents
                ? t(
                    "dentist-teacher-operations.list.student-group.supervise-student-button"
                  )
                : t(
                    "dentist-teacher-operations.list.student-group.add-to-group-button"
                  )
              : null}
          </Button>
        );
      },
    },
  ];

  return (
    <Box
      height="80vh"
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
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${color.grey[200]} !important`,
        },
        overflow: "auto",
      }}
    >
      <DataGrid
        columns={columns}
        rows={studentsList.map((item, index) => ({ Id: index + 1, ...item }))}
        rowCount={rowCount}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        paginationModel={pageModel ? pageModel : { page: 0, pageSize: 20 }}
        loading={loading}
        paginationMode={rowCount ? "server" : "client"}
        onPaginationModelChange={(newModel) => handlePageModelChange(newModel)}
        slots={{
          toolbar: GridToolbar,
          loadingOverlay: LinearProgressComponent,
          noRowsOverlay: NoRowsFound,
          noResultsOverlay: NoRowsFound,
        }}
      />
    </Box>
  );
});
