import { observer } from "mobx-react-lite";
import { Patient } from "../../../../app/models/Patient";
import { Box, Button, IconButton, Tooltip, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colors } from "../../../../themeConfig";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import {
  AccountCircle,
  Archive,
  Delete,
  Edit,
  Unarchive,
} from "@mui/icons-material";
import * as React from "react";
import DeletePatientConfirmation from "../../Forms/DeletePatientConfirmation";
import PatientDetailsDialog from "../../Forms/PatientDetailsDialog";

interface Props {
  patients: Patient[];
  loading?: boolean;
  height?: string;
  isDashboard?: boolean;
  isListForDoctor?: boolean;
}

export default observer(function PatientList({
  patients,
  loading = false,
  height = "75vh",
  isDashboard = false,
  isListForDoctor = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [patientDetailsOpen, setPatientDetailsOpen] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [selectedPatientId, setSelectedPatientId] = React.useState("");

  const statusColumn: GridColDef = {
    field: "isArchived",
    headerName: "Status",
    headerAlign: "center",
    flex: 1,
    minWidth: 100,
    renderCell: ({ row }) => {
      const patient = (row as Patient) || {};
      return (
        <Tooltip
          title={patient.isArchived ? "Click to unarchive" : "Click to archive"}
        >
          <Button
            sx={{
              width: "100%",
              backgroundColor: patient.isArchived
                ? color.pinkAccent[600]
                : color.greenAccent[600],
              "&:hover": {
                backgroundColor: patient.isArchived
                  ? color.pinkAccent[500]
                  : color.greenAccent[500],
              },
            }}
          >
            {patient.isArchived ? (
              <Unarchive color="primary" />
            ) : (
              <Archive color="primary" />
            )}
          </Button>
        </Tooltip>
      );
    },
  };

  const columns: GridColDef[] = [
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
      field: "gender",
      headerName: "Gender",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "ethnicGroup",
            headerName: "Ethnic Group",
            cellClassName: "name-column--cell",
            flex: 1,
          },
          {
            field: "location",
            headerName: "Location",
            cellClassName: "name-column--cell",
            flex: 1,
          },
          {
            field: "age",
            headerName: "Age",
            cellClassName: "name-column--cell",
            flex: 1,
          },
        ]),
    ...(!isDashboard && isListForDoctor ? [statusColumn] : []),
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row }) => {
        const patient = (row as Patient) || {};
        return (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            gap={1}
            borderRadius="4px"
            sx={{
              backgroundColor: color.blueAccent[600],
            }}
          >
            <Tooltip title="View details">
              <IconButton
                onClick={() => {
                  setSelectedPatientId(patient.id);
                  setPatientDetailsOpen(true);
                }}
              >
                <AccountCircle color="primary" />
              </IconButton>
            </Tooltip>
            {isListForDoctor && (
              <Tooltip title="Edit">
                <IconButton>
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {!isListForDoctor && (
              <Tooltip
                title="Delete"
                onClick={() => {
                  setDeleteConfirmationOpen(true);
                  setSelectedPatientId(patient.id);
                }}
              >
                <IconButton>
                  <Delete color="primary" />
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
      height={height}
      minWidth="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: isDashboard
            ? color.primary[400]
            : color.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: color.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: isDashboard
            ? color.primary[400]
            : color.blueAccent[700],
        },
        "& .name-column--cell": {
          color: color.grey[100],
          fontSize: 14,
        },
      }}
      overflow="auto"
    >
      <>
        <DataGrid
          rows={patients}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          autoPageSize
          disableColumnMenu
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          slots={{
            loadingOverlay: LinearProgressComponent,
            noRowsOverlay: NoRowsFound,
          }}
        />
      </>
      <DeletePatientConfirmation
        isOpen={deleteConfirmationOpen}
        onClose={() => {
          setDeleteConfirmationOpen(false);
          setSelectedPatientId("");
        }}
        patientId={selectedPatientId}
      />
      <PatientDetailsDialog
        patientId={selectedPatientId}
        isOpen={patientDetailsOpen}
        onClose={() => {
          setPatientDetailsOpen(false);
          setSelectedPatientId("");
        }}
      />
    </Box>
  );
});
