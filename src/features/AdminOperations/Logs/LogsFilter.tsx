import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import { Search, Close } from "@mui/icons-material";
import { TextField, IconButton, MenuItem, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTranslation } from "react-i18next";

/**
 * Renders the LogsFilter component.
 * 
 * This component is responsible for rendering a filter form for logs.
 * It allows the user to filter logs based on username, log level, start date, and end date.
 * 
 * @returns The rendered LogsFilter component.
 */
export default observer(function LogsFilter() {
  const {
    adminStore: {
      logsSearchParams,
      setLogSearchParamsUserName,
      setLogSearchParamsLevel,
      setLogSearchhParamsStartDate,
      setLogSearchParamsEndDate,
    },
  } = useStore();

  const [userName, setUserName] = React.useState(logsSearchParams.userName);

  const [t] = useTranslation("global");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12} lg={6} md={6}>
          <TextField
            label={t("admin-operations.logs.filter-username")}
            color="secondary"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              endAdornment: (
                <>
                  {logsSearchParams.userName ? (
                    <IconButton
                      onClick={() => {
                        setLogSearchParamsUserName("");
                        setUserName("");
                      }}
                    >
                      <Close />
                    </IconButton>
                  ) : (
                    <IconButton
                      disabled={userName === ""}
                      onClick={() => setLogSearchParamsUserName(userName)}
                    >
                      <Search />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <TextField
            select
            label={t("admin-operations.logs.filter-level")}
            color="secondary"
            fullWidth
            variant="outlined"
            value={logsSearchParams.level}
            onChange={(e) => setLogSearchParamsLevel(e.target.value)}
          >
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {["Error", "Warning", "Information", "Debug"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <DatePicker
            slotProps={{
              textField: {
                variant: "outlined",
                color: "secondary",
                fullWidth: true,
              },
            }}
            value={new Date(logsSearchParams.startDate)}
            label={t("admin-operations.logs.filter-startdate")}
            onChange={(date: Date | null) => {
              console.log(date);
              if (date) {
                setLogSearchhParamsStartDate(date);
              }
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6} md={6}>
          <DatePicker
            slotProps={{
              textField: {
                variant: "outlined",
                color: "secondary",
                fullWidth: true,
              },
            }}
            value={new Date(logsSearchParams.endDate)}
            label={t("admin-operations.logs.filter-enddate")}
            onChange={(date: Date | null) => {
              console.log(date);
              if (date) {
                setLogSearchParamsEndDate(date);
              }
            }}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
});
