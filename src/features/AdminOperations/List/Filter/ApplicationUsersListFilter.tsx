import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  SelectChangeEvent,
  TextField,
  Tooltip,
} from "@mui/material";
import { UserType } from "../../../../app/models/ApplicationUser";
import { ApplicationRole, roles } from "../../../../app/models/Role";
import {
  FilterAltOffOutlined,
  FilterAltOutlined,
  SearchRounded,
} from "@mui/icons-material";
import CustomSelect from "../../../../app/common/formInputs/CustomSelect";
import * as React from "react";
import Header from "../../../../app/common/header/Header";

interface Props {
  title: string;
  subTitle: string;
  userType: string;
  role: string;
  searchTerm: string | undefined;
  setSearchTerm: (searchTerm: string) => void;
  onUserTypeChange: (userType: string) => void;
  onRoleChange: (role: string) => void;
  clearFilters: () => void;
}

export default function ApplicationUsersListFilter({
  title,
  subTitle,
  userType,
  role,
  searchTerm,
  setSearchTerm,
  onRoleChange,
  onUserTypeChange,
  clearFilters,
}: Props) {
  const [searchValue, setSearchValue] = React.useState(searchTerm);

  const handleUserTypeChange = (event: SelectChangeEvent<UserType>) => {
    onUserTypeChange(event.target.value!);
  };

  const handleRoleChange = (event: SelectChangeEvent<ApplicationRole>) => {
    onRoleChange(event.target.value!);
  };

  const handleSearchValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchValue(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(searchValue!);
  };

  const handleClear = () => {
    clearFilters();
    setSearchValue("");
  };

  const showClearButton =
    userType !== "" || role !== "" || searchValue !== "" || searchTerm !== "";

  const userTypes: UserType[] = ["RegularUser", "GuestUser"];

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      mb="2rem"
    >
      <Box>
        <Header title={title} subTitle={subTitle} />
      </Box>
      <Box display="flex" gap={1} alignItems="center">
        <Box>
          <TextField
            color="secondary"
            label="Search"
            variant="filled"
            type="text"
            value={searchValue}
            onChange={handleSearchValueChange}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchClick} edge="end">
                    <SearchRounded color="info" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box component={FormControl} sx={{ width: "10rem" }} size="small">
          <CustomSelect
            label="User Type"
            value={userType as UserType}
            options={userTypes}
            onChange={handleUserTypeChange}
          />
        </Box>
        <Box component={FormControl} sx={{ width: "10rem" }} size="small">
          <CustomSelect
            label="Role"
            value={role as ApplicationRole}
            options={roles}
            onChange={handleRoleChange}
          />
        </Box>
        <IconButton onClick={handleClear}>
          {!showClearButton ? (
            <FilterAltOutlined
              color="info"
              sx={{
                fontSize: 25,
              }}
            />
          ) : (
            <Tooltip title="Clear Filter">
              <FilterAltOffOutlined
                color="warning"
                sx={{
                  fontSize: 25,
                }}
              />
            </Tooltip>
          )}
        </IconButton>
      </Box>
    </Box>
  );
}
