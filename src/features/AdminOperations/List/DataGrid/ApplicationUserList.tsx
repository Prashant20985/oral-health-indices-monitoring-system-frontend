import { observer } from "mobx-react-lite";
import { ApplicationUser } from "../../../../app/models/ApplicationUser";
import { useStore } from "../../../../app/stores/Store";
import {
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AccountCircle, Delete } from "@mui/icons-material";
import ChangeActivationStatusButton from "../../ChangeActivationStatus/ChangeActivationStatusButton";
import LinearProgressComponent from "../../../../app/common/loadingComponents/LinearProgressComponent";
import * as React from "react";
import CustomSanckbar from "../../../../app/common/snackbar/CustomSnackbar";
import UserProfileDialog from "../../UserProfile/UserProfileDialog";
import UserDeleteForm from "../../Forms/UserDeleteForm";
import NoRowsFound from "../../../../app/common/NoRowsFound/NoRowsFound";
import { useTranslation } from "react-i18next";

interface Props {
  applicationUsers: ApplicationUser[];
  loading?: boolean;
  deletedUsersList?: boolean;
  changeActivationStatusDisabled?: boolean;
  isDashboard?: boolean;
  height?: string;
}

export default observer(function AppplicationUsersList({
  applicationUsers,
  loading,
  deletedUsersList = false,
  changeActivationStatusDisabled = false,
  isDashboard = false,
  height = "75vh",
}: Props) {
  const {
    adminStore,
    userStore: { user },
  } = useStore();

  const [t] = useTranslation("global");

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [users, setUsers] = React.useState<ApplicationUser[]>(applicationUsers);
  const [activationChangeSanckbar, setActivationChangeSanckbar] =
    React.useState(false);
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openProfileDialog, setOpenProfileDialog] = React.useState(false);

  React.useEffect(() => {
    const filterOutCurrentUser = () => {
      const filteredUsers = applicationUsers.filter(
        (u) => u.userName !== user?.userName
      );
      setUsers(filteredUsers);
    };
    filterOutCurrentUser();
  }, [applicationUsers, user?.userName]);

  const handleActivationStatusChange = async (userName: string) => {
    await adminStore
      .changeActivationStatus(userName)
      .then(() => setActivationChangeSanckbar(true));
  };

  const getDate = (params: GridValueGetterParams) => {
    return new Date(params.value as string).toLocaleDateString();
  };

  const statusColums: GridColDef = {
    field: "isAccountActive",
    headerName: t("admin-operations.list.data-grid.activation-status"),
    flex: 1,
    headerAlign: "center",
    renderCell: ({ row }) => {
      const { userName, isAccountActive, deletedAt } = row || {};
      return (
        <ChangeActivationStatusButton
          isAccountActive={isAccountActive}
          deletedAt={deletedAt}
          disabled={changeActivationStatusDisabled || deletedUsersList}
          handleChangeActivationStatus={() =>
            handleActivationStatusChange(userName)
          }
        />
      );
    },
  };

  const actionsColumn: GridColDef = {
    field: "actions",
    headerName: t("admin-operations.list.data-grid.actions"),
    minWidth: 100,
    flex: 1,
    headerAlign: "center",
    renderCell: ({ row }) => {
      const { userName } = row || {};
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
          <Tooltip title={t("admin-operations.list.data-grid.view-profile")}>
            <IconButton
              onClick={() => {
                setOpenProfileDialog(true);
                setSelectedUserName(userName);
              }}
            >
              <AccountCircle color="primary" />
            </IconButton>
          </Tooltip>
          {!deletedUsersList && (
            <Tooltip title={t("admin-operations.list.data-grid.delete-user")}>
              <IconButton
                onClick={() => {
                  setOpenDeleteDialog(true);
                  setSelectedUserName(userName);
                }}
              >
                <Delete color="primary" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      );
    },
  };

  const userNameColumn: GridColDef = {
    field: "userName",
    headerName: t("admin-operations.list.data-grid.user-name"),
    cellClassName: "name-column--cell",
    flex: 1,
    renderCell: ({ row }) => {
      const { userName, isAccountActive, deletedAt } = row || {};
      return (
        <Box display="flex" alignItems="center" alignContent="center" gap={1}>
          <Avatar
            alt={userName}
            variant="rounded"
            sx={{
              width: 30,
              height: 30,
              backgroundColor:
                deletedAt !== null
                  ? color.pinkAccent[600]
                  : isAccountActive
                  ? color.greenAccent[600]
                  : color.orangeAccent[600],
            }}
          />
          <Typography className="name-column--cell">{userName}</Typography>
        </Box>
      );
    },
  };

  const columns: GridColDef[] = [
    ...[userNameColumn],
    {
      field: "firstName",
      headerName: t("admin-operations.list.data-grid.first-name"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: t("admin-operations.list.data-grid.last-name"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: t("admin-operations.list.data-grid.email"),
      cellClassName: "name-column--cell",
      flex: 1,
    },
    ...(!deletedUsersList
      ? []
      : [
          {
            field: "deletedAt",
            headerName: t("admin-operations.list.data-grid.delete-date"),
            cellClassName: "name-column--cell",
            valueGetter: getDate,
            flex: 1,
          },
        ]),
    ...(isDashboard
      ? []
      : [
          {
            field: "role",
            headerName: t("admin-operations.list.data-grid.role"),
            cellClassName: "name-column--cell",
            flex: 1,
          },
        ]),
    ...(isDashboard ? [] : [statusColums]),
    ...[actionsColumn],
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
          rows={users}
          columns={columns}
          getRowId={(row) => row.userName}
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
      <CustomSanckbar
        snackbarOpen={activationChangeSanckbar}
        message={t("admin-operations.list.data-grid.activation-message")}
        snackbarClose={() => setActivationChangeSanckbar(false)}
      />
      <UserProfileDialog
        userName={selectedUserName}
        isOpen={openProfileDialog}
        onClose={() => {
          setOpenProfileDialog(false);
          setSelectedUserName("");
        }}
      />
      <UserDeleteForm
        userName={selectedUserName}
        isOpen={openDeleteDialog}
        onClose={() => {
          setOpenDeleteDialog(false);
          setSelectedUserName("");
        }}
      />
    </Box>
  );
});
