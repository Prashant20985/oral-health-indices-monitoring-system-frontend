import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useTheme,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import Header from "../../../app/common/header/Header";
import LogsFilter from "./LogsFilter";
import { ExpandMore } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default observer(function Logs() {
  const {
    adminStore: {
      loadLogs,
      logResponse,
      logsSearchParams,
      setLogSearchParamsPageNumber,
      setLogSearchParamsPageSize,
    },
  } = useStore();

  React.useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  const handlePageChange = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setLogSearchParamsPageNumber(newPage + 1);
  };

  const handleRowsPerPageChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setLogSearchParamsPageSize(parseInt(event.target.value, 10));
    setLogSearchParamsPageNumber(1);
  };

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Box>
      <Header title={t("admin-operations.logs.title")} subTitle={t("admin-operations.logs.sub-title")} />
      <Accordion sx={{ backgroundColor: color.primary[400], mt: 4, mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h6" fontWeight={600} color="textsecondary">
          {t("admin-operations.logs.filter-title")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ m: 2, borderTop: `1px solid ${color.grey[200]}` }}
        >
          <LogsFilter />
        </AccordionDetails>
      </Accordion>
      <Box
        component={Paper}
        sx={{
          backgroundColor: color.primary[400],
          mt: 2,
        }}
      >
        <TableContainer
          sx={{
            overflow: "auto",
            height: "75vh",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  t("admin-operations.logs.tablerow-no."),
                  t("admin-operations.logs.tablerow-date"),
                  t("admin-operations.logs.tablerow-executedby"),
                  t("admin-operations.logs.tablerow-requestname"),
                  t("admin-operations.logs.tablerow-level"),
                  t("admin-operations.logs.tablerow-message"),
                ].map((value, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      backgroundColor: color.primary[400],
                      width: "180px",
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {value}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {logResponse.logs.map((log, index) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {(logsSearchParams.pageNumber - 1) *
                      logsSearchParams.pageSize +
                      index +
                      1}
                  </TableCell>
                  <TableCell>
                    {new Date(log.timestamp).toDateString()}
                  </TableCell>
                  <TableCell>{log.properties.executedBy}</TableCell>
                  <TableCell>{log.properties.requestName}</TableCell>
                  <TableCell>{log.level}</TableCell>
                  <TableCell>{log.renderedMessage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={logResponse.logs.length > 0 ? logResponse.totalCount : 0}
          page={logsSearchParams.pageNumber - 1}
          onPageChange={handlePageChange}
          rowsPerPage={logsSearchParams.pageSize}
          onRowsPerPageChange={handleRowsPerPageChange}
          sx={{
            backgroundColor: color.primary[400],
          }}
        />
      </Box>
    </Box>
  );
});
