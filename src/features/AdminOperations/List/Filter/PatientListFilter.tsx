import { Box, IconButton, TextField } from "@mui/material";
import Header from "../../../../app/common/header/Header";
import { Clear, SearchOutlined } from "@mui/icons-material";
import * as React from "react";
interface Props {
  title: string;
  subTitle: string;
  searchTerm: { email: string; name: string };
  setSearchTerm: (searchTerm: { email: string; name: string }) => void;
  clearNameSearch: () => void;
  clearEmailSearch: () => void;
}

export default function PatientListFilter({
  title,
  subTitle,
  searchTerm,
  setSearchTerm,
  clearEmailSearch,
  clearNameSearch,
}: Props) {
  const [searchValue, setSearchValue] = React.useState(searchTerm);
  const [showNameClearButton, setShowNameClearButton] = React.useState(false);
  const [showEmailClearButton, setShowEmailClearButton] = React.useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({ ...searchTerm, name: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({ ...searchTerm, email: event.target.value });
  };

  const handleNameSearchClick = () => {
    setSearchTerm({ ...searchValue, name: searchValue.name });
    setShowNameClearButton(true);
  };

  const handleEmailSearchClick = () => {
    setSearchTerm({ ...searchValue, email: searchValue.email });
    setShowEmailClearButton(true);
  };

  const handleNameClearClick = () => {
    setSearchTerm({ ...searchTerm, name: "" });
    setSearchValue({ ...searchValue, name: "" });
    setShowNameClearButton(false);
    clearNameSearch();
  };

  const handleEmailClearClick = () => {
    setSearchTerm({ ...searchTerm, email: "" });
    setSearchValue({ ...searchValue, email: "" });
    setShowEmailClearButton(false);
    clearEmailSearch();
  };

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
      <Box>
        <Box gap={2} display="flex">
          <TextField
            color="secondary"
            label="Patient Name"
            variant="filled"
            type="text"
            value={searchValue.name}
            onChange={handleNameChange}
            size="small"
            sx={{ width: "20rem" }}
            InputProps={{
              endAdornment: (
                <>
                  {!showNameClearButton ? (
                    <IconButton disabled={searchValue.name === ""} onClick={handleNameSearchClick}>
                      <SearchOutlined />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleNameClearClick}>
                      <Clear />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
          <TextField
            color="secondary"
            label="Email"
            variant="filled"
            type="text"
            fullWidth
            value={searchValue.email}
            onChange={handleEmailChange}
            size="small"
            InputProps={{
              endAdornment: (
                <>
                  {!showEmailClearButton ? (
                    <IconButton disabled={searchValue.email === ""} onClick={handleEmailSearchClick}>
                      <SearchOutlined />
                    </IconButton>
                  ) : (
                    <IconButton onClick={handleEmailClearClick}>
                      <Clear />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
