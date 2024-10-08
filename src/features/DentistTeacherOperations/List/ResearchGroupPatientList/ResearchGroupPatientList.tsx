import { observer } from "mobx-react-lite";
import { ResearchGroupPatient } from "../../../../app/models/ResearchGroup";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import { AccountCircle, DeleteForever, PersonAdd } from "@mui/icons-material";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import { useStore } from "../../../../app/stores/Store";
import { useTranslation } from "react-i18next";
import { router } from "../../../../app/router/Routes";
import React from "react";

interface Props {
  patients: ResearchGroupPatient[];
  loading?: boolean;
  patientsInGroupList?: boolean;
  researchGroupId: string;
  page?: number;
  pageSize?: number;
  setPaginationParams?: (page: number, pageSize: number) => void;
  rowCount?: number;
}

/**
 * Renders a list of patients in a research group.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Array<Patient>} props.patients - The list of patients.
 * @param {boolean} [props.loading=false] - Indicates if the list is currently loading.
 * @param {boolean} [props.patientsInGroupList=true] - Indicates if the patients are in the group list.
 * @param {number} props.researchGroupId - The ID of the research group.
 * @param {number} props.page - The current page number.
 * @param {number} props.pageSize - The number of patients to display per page.
 * @param {Function} props.setPaginationParams - A function to set the pagination parameters.
 * @param {number} props.rowCount - The total number of rows in the list.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function ResearchGroupPatientList({
  patients,
  loading = false,
  patientsInGroupList = true,
  researchGroupId,
  page,
  pageSize,
  setPaginationParams,
  rowCount,
}: Props) {
  const { dentistTeacherStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

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

  const firstNameColumn: GridColDef = {
    field: "firstName",
    headerName: t(
      "dentist-teacher-operations.list.research-group.research-group-patient.first-name"
    ),
    cellClassName: "name-column--cell",
    flex: 1.5,
    renderCell: ({ row }) => {
      const { firstName } = row || {};
      return (
        <Box display="flex" alignItems="center" alignContent="center" gap={1}>
          <Avatar
            alt={firstName}
            variant="rounded"
            sx={{
              width: 30,
              height: 30,
              backgroundColor: patientsInGroupList
                ? color.greenAccent[600]
                : color.orangeAccent[600],
            }}
          />
          <Typography className="name-column--cell">{firstName}</Typography>
        </Box>
      );
    },
  };

  const columns: GridColDef[] = [
    ...[firstNameColumn],
    {
      field: "lastName",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.last-name"
      ),
      cellClassName: "name-column--cell",
      flex: 1.5,
    },
    {
      field: "email",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.email"
      ),
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "gender",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.gender"
      ),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "age",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.age"
      ),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "location",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.location"
      ),
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "addedBy",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.added-by"
      ),
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "actions",
      headerName: t(
        "dentist-teacher-operations.list.research-group.research-group-patient.actions"
      ),
      headerAlign: "center",
      flex: 2,
      renderCell: ({ row }) => {
        return (
          <Box display="flex" alignItems="center" gap={1} width="100%">
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              sx={{
                backgroundColor: color.blueAccent[600],
                borderRadius: "4px",
              }}
            >
              <Tooltip title={t("dentist-teacher-operations.list.research-group.research-group-patient.patient-details")}>
                <IconButton
                  onClick={() => router.navigate(`/patient-profile/${row.id}`)}
                >
                  <AccountCircle color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              sx={{
                backgroundColor: patientsInGroupList
                  ? color.redAccent[500]
                  : color.greenAccent[600],
                borderRadius: "4px",
              }}
            >
              {patientsInGroupList ? (
                <Box display="flex" gap={1}>
                  <Tooltip
                    title={t(
                      "dentist-teacher-operations.list.research-group.research-group-patient.remove-from-group-button"
                    )}
                  >
                    <IconButton
                      onClick={async () => {
                        await dentistTeacherStore.removePatientFromResearchGroup(
                          row
                        );
                      }}
                    >
                      <DeleteForever color="primary" />
                    </IconButton>
                  </Tooltip>
                </Box>
              ) : (
                <Tooltip
                  title={t(
                    "dentist-teacher-operations.list.research-group.research-group-patient.add-to-group-button"
                  )}
                >
                  <IconButton
                    onClick={async () => {
                      await dentistTeacherStore.addPatientToResearchGroup(
                        researchGroupId,
                        row
                      );
                    }}
                  >
                    <PersonAdd color="primary" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          </Box>
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
        rows={patients.map((item, index) => ({ Id: index + 1, ...item }))}
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
