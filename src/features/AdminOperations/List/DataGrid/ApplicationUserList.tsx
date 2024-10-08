import { observer } from "mobx-react-lite";
import {
  ApplicationUser,
  PaginatedApplicationUserList,
} from "../../../../app/models/ApplicationUser";
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
  applicationUsers: PaginatedApplicationUserList;
  loading?: boolean;
  deletedUsersList?: boolean;
  changeActivationStatusDisabled?: boolean;
  isDashboard?: boolean;
  height?: string;
  page: number;
  pageSize: number;
  setPaginationParams: (page: number, pageSize: number) => void;
}

/**
 * Renders a list of application users in a data grid.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {ApplicationUser[]} props.applicationUsers - The list of application users.
 * @param {boolean} props.loading - Indicates if the data is currently being loaded.
 * @param {boolean} [props.deletedUsersList=false] - Indicates if the list is for deleted users.
 * @param {boolean} [props.changeActivationStatusDisabled=false] - Indicates if the activation status change is disabled.
 * @param {boolean} [props.isDashboard=false] - Indicates if the list is for the dashboard.
 * @param {number} props.page - The current page number.
 * @param {number} props.pageSize - The number of items per page.
 * @param {string} [props.height="75vh"] - The height of the data grid.
 * @param {Function} props.setPaginationParams - The function to set the pagination parameters.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function AppplicationUsersList({
  applicationUsers,
  loading,
  deletedUsersList = false,
  changeActivationStatusDisabled = false,
  isDashboard = false,
  page,
  pageSize,
  height = "75vh",
  setPaginationParams,
}: Props) {
  const {
    adminStore,
    userStore: { user },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const [users, setUsers] = React.useState<ApplicationUser[]>(
    applicationUsers.users
  );
  const [activationChangeSanckbar, setActivationChangeSanckbar] =
    React.useState(false);
  const [selectedUserName, setSelectedUserName] = React.useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openProfileDialog, setOpenProfileDialog] = React.useState(false);

  const [pageModel, setPageModel] = React.useState({
    page: page,
    pageSize: pageSize,
  });

  const handlePageModelChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setPaginationParams(page, pageSize);
    setPageModel({ page, pageSize });
  };

  React.useEffect(() => {
    const filterOutCurrentUser = () => {
      const filteredUsers = applicationUsers.users.filter(
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
          pageSizeOptions={[5, 10, 20, 50, 100]}
          rowCount={applicationUsers.totalUsersCount}
          paginationModel={pageModel}
          onPaginationModelChange={(newModel) =>
            handlePageModelChange(newModel)
          }
          paginationMode="server"
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
