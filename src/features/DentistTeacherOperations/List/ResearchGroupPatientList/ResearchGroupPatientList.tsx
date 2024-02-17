import { observer } from "mobx-react-lite";
import { ResearchGroupPatient } from "../../../../app/models/ResearchGroup";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import { colors } from "../../../../themeConfig";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import { DeleteForever, PersonAdd } from "@mui/icons-material";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import { useStore } from "../../../../app/stores/Store";

interface Props {
  patients: ResearchGroupPatient[];
  loading?: boolean;
  patientsInGroupList?: boolean;
  researchGroupId: string;
}

export default observer(function ResearchGroupPatientList({
  patients,
  loading = false,
  patientsInGroupList = true,
  researchGroupId,
}: Props) {
  const { dentistTeacherStore } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      cellClassName: "name-column--cell",
      flex: 1.5,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      cellClassName: "name-column--cell",
      flex: 1.5,
    },
    {
      field: "email",
      headerName: "Email",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "gender",
      headerName: "Gender",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Age",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "addedBy",
      headerName: "Added By",
      cellClassName: "name-column--cell",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      flex: 2,
      renderCell: ({ row }) => {
        return (
          <Box
            display="flex"
            width="100%"
            justifyContent="center"
            sx={{
              backgroundColor: patientsInGroupList
                ? color.redAccent[600]
                : color.greenAccent[600],
              borderRadius: "4px",
            }}
          >
            {patientsInGroupList ? (
              <Tooltip title="Remove From Group">
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
            ) : (
              <Tooltip title="Remove From Group">
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
        autoPageSize
        loading={loading}
        disableColumnMenu
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })}
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
