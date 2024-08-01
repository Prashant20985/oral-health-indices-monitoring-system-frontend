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
import ArchivePatientForm from "../../Forms/ArchivePatientForm";
import { useStore } from "../../../../app/stores/Store";
import CreateEditPatientForm from "../../Forms/CreateEditPatientForm";
import { router } from "../../../../app/router/Routes";
import { useTranslation } from "react-i18next";

interface Props {
  patients: Patient[];
  loading?: boolean;
  height?: string;
  isDashboard?: boolean;
}

export default observer(function PatientList({
  patients,
  loading = false,
  height = "75vh",
  isDashboard = false,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    patientStore: { unarchivePatient },
    userStore: { user },
  } = useStore();

  const [patientDetailsOpen, setPatientDetailsOpen] = React.useState(false);

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);

  const [archivePatientFormOpen, setArchivePatientFormOpen] =
    React.useState(false);

  const [selectedPatientId, setSelectedPatientId] = React.useState("");

  const [openEditForm, setOpenEditForm] = React.useState(false);

  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(
    null
  );

  const isListForDoctor =
    user?.role === "Dentist_Teacher_Examiner" || "Dentist_Teacher_Researcher";

  const isListForStudent = user?.role === "Student";

  const isListForAdmin = user?.role === "Admin";

  const [t] = useTranslation("global");

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
          title={patient.isArchived ? t("patient-operations.data-grid.unarchive-patient") : t("patient-operations.data-grid.archive-patient")}
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
            onClick={() => {
              if (!patient.isArchived) {
                setArchivePatientFormOpen(true);
                setSelectedPatientId(patient.id);
              } else {
                unarchivePatient(patient.id);
              }
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
      headerName: t("patient-operations.data-grid.first-name"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("patient-operations.data-grid.email"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: t("patient-operations.data-grid.email"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "gender",
      headerName: t("patient-operations.data-grid.gender"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    ...(isDashboard
      ? []
      : [
          {
            field: "ethnicGroup",
            headerName: t("patient-operations.data-grid.ethnic-group"),
            cellClassName: "name-column--cell",
            flex: 1,
          },
          {
            field: "location",
            headerName: t("patient-operations.data-grid.location"),
            cellClassName: "name-column--cell",
            flex: 1,
          },
          {
            field: "age",
            headerName: t("patient-operations.data-grid.age"),
            cellClassName: "name-column--cell",
            flex: 1,
          },
        ]),
    ...(!isDashboard && isListForDoctor && !isListForStudent && !isListForAdmin
      ? [statusColumn]
      : []),
    {
      field: "actions",
      headerName: t("patient-operations.data-grid.actions"),
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
            <Tooltip title={t("patient-operations.data-grid.view-details")}>
              <IconButton
                onClick={() => {
                  if (isListForAdmin) {
                    setSelectedPatientId(patient.id);
                    setPatientDetailsOpen(true);
                  } else {
                    router.navigate(`/patient-profile/${patient.id}`);
                  }
                }}
              >
                <AccountCircle color="primary" />
              </IconButton>
            </Tooltip>
            {isListForDoctor && !isListForStudent && !isListForAdmin && (
              <Tooltip title={t("patient-operations.data-grid.edit-patient")}>
                <IconButton
                  onClick={() => {
                    setSelectedPatient(patient);
                    setOpenEditForm(true);
                  }}
                >
                  <Edit color="primary" />
                </IconButton>
              </Tooltip>
            )}
            {isListForAdmin && (
              <Tooltip
                title={t("patient-operations.data-grid.delete-patient")}
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
      <ArchivePatientForm
        patientId={selectedPatientId}
        isOpen={archivePatientFormOpen}
        onClose={() => {
          setSelectedPatientId("");
          setArchivePatientFormOpen(false);
        }}
      />
      <CreateEditPatientForm
        patient={selectedPatient!}
        isOpen={openEditForm}
        isEdit={true}
        onClose={() => {
          setOpenEditForm(false);
          setSelectedPatient(null);
        }}
      />
    </Box>
  );
});
