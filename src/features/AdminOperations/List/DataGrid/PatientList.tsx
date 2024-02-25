import { observer } from "mobx-react-lite";
import { Patient } from "../../../../app/models/Patient";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { colors } from "../../../../themeConfig";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import { AccountCircle, Delete } from "@mui/icons-material";
import * as React from "react";
import DeletePatientConfirmation from "../../Forms/DeletePatientConfirmation";

interface Props {
  patients: Patient[];
  loading?: boolean;
}

export default observer(function PatientList({
  patients,
  loading = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [selectedPatientId, setSelectedPatientId] = React.useState("");

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
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      headerAlign: "center",
      renderCell: ({ row }) => {
        const patient = row as Patient || {};
        return (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            gap={2}
            borderRadius="4px"
            sx={{
              backgroundColor: color.blueAccent[600],
            }}
          >
            <Tooltip title="View details">
              <IconButton>
                <AccountCircle color="primary" />
              </IconButton>
            </Tooltip>
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
          </Box>
        );
      },
    },
  ];
  return (
    <Box
      height="75vh"
      minWidth="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: color.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: color.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: color.blueAccent[700],
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
    </Box>
  );
});
