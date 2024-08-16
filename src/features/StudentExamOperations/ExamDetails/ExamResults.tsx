import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { Exam, StudentExamResult } from "../../../app/models/StudentExam";
import LinearProgressComponent from "../../../app/common/loadingComponents/LinearProgressComponent";
import NoRowsFound from "../../../app/common/NoRowsFound/NoRowsFound";
import { Download } from "@mui/icons-material";

/**
 * Exports the exam details and student exam results to a CSV file and triggers the download.
 *
 * @param examDetails - The details of the exam.
 * @param studentExamResults - The results of the students in the exam.
 */
function customExportCsv(
  examDetails: Exam,
  studentExamResults: StudentExamResult[]
) {
  let csvContent = "";

  csvContent += `Exam Title: ${examDetails.examTitle}\n`;
  csvContent += `Exam Date: ${new Date(
    examDetails.dateOfExamination
  ).toDateString()}\n`;
  csvContent += `Max Marks: ${examDetails.maxMark}\n`;
  csvContent += "\n";

  csvContent += "User Name,First Name,Last Name,Email,Score\n";

  studentExamResults.forEach((result) => {
    csvContent += `${result.userName},${result.firstName},${result.lastName},${result.email},${result.studentMark}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `${examDetails.examTitle}_${new Date(
      examDetails.dateOfExamination
    ).toDateString()}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * CustomToolbar component for displaying a custom toolbar in the ExamResults component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Exam} props.examDetails - The details of the exam.
 * @param {StudentExamResult[]} props.studentExamResults - The results of the student's exam.
 * @returns {JSX.Element} The rendered CustomToolbar component.
 */
function CustomToolbar({
  examDetails,
  studentExamResults,
}: {
  examDetails: Exam;
  studentExamResults: StudentExamResult[];
}) {
  return (
    <GridToolbarContainer
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        mb: 1,
      }}
    >
      <Button
        color="success"
        onClick={() => customExportCsv(examDetails, studentExamResults)}
        variant="contained"
        startIcon={<Download />}
        size="small"
        disabled={
          studentExamResults.length === 0 ||
          examDetails.examStatus === "Published"
        }
      >
        {examDetails.examStatus === "Published"
          ? "Exam Not Graded Yet"
          : "Export Results"}
      </Button>
    </GridToolbarContainer>
  );
}

interface Props {
  studentExamResults: StudentExamResult[];
  loading?: boolean;
  examDetails: Exam;
}

/**
 * Renders the exam results component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Array} props.studentExamResults - The array of student exam results.
 * @param {boolean} props.loading - Indicates if the component is in a loading state.
 * @param {Object} props.examDetails - The details of the exam.
 * @returns {JSX.Element} The rendered ExamResults component.
 */
export default observer(function ExamResults({
  studentExamResults,
  loading,
  examDetails,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const userNameColumn: GridColDef = {
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
  };

  const colums: GridColDef[] = [
    ...[userNameColumn],
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
    {
      field: "studentMark",
      headerName: "Score",
      cellClassName: "name-column--cell",
      flex: 1,
    },
  ];
  return (
    <Box
      height="50vh"
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
        columns={colums}
        rows={studentExamResults}
        loading={loading}
        getRowId={(row) => row.userName}
        autoPageSize
        slots={{
          toolbar: () => (
            <CustomToolbar
              examDetails={examDetails}
              studentExamResults={studentExamResults}
            />
          ),
          loadingOverlay: LinearProgressComponent,
          noRowsOverlay: NoRowsFound,
        }}
      />
    </Box>
  );
});
