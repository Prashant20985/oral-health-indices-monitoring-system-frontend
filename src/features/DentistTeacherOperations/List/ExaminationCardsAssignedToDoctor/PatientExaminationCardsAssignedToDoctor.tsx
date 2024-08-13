import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/Store";
import React from "react";
import PatientExaminationCardsList from "../../../ExaminationCardOperations/List/PatientExaminationCardsList";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Header from "../../../../app/common/header/Header";
import { Clear } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

/**
 * Renders the component for displaying patient examination cards assigned to a doctor.
 * This component includes functionality for filtering and selecting students and selecting a specific year and month.
 * @returns The JSX element representing the patient examination cards assigned to a doctor component.
 */
export default observer(function PatientExaminationCardsAssignedToDoctor() {
  const {
    patientExaminationCardStore: {
      getPatientExaminationCardsAssignedToDoctor,
      groupedPatientExaminationCardsAssignedToDoctor,
      loading,
      setStudentId,
      setMonth,
      setYear,
      year,
      month,
    },
    dentistTeacherStore: {
      fetchSupervisedStudents,
      supervisedStudentNameEmailWithId,
      setSupervisedStudentSearchParams,
      supervisedStudentsSearchParam,
      loading: { supervisedStudents: loadingFetchSupervisedStudents },
    },
  } = useStore();

  React.useEffect(() => {
    const fetchCards = async () => {
      await getPatientExaminationCardsAssignedToDoctor();
    };
    fetchCards();
  }, [getPatientExaminationCardsAssignedToDoctor]);

  React.useEffect(() => {
    fetchSupervisedStudents();
  }, [fetchSupervisedStudents]);

  const [t] = useTranslation("global");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        mt={2}
      >
        <Box>
          <Header
            title={t(
              "dentist-teacher-operations.list.examinationscards-assigned-to-doctor.header"
            )}
            subTitle={t(
              "dentist-teacher-operations.list.examinationscards-assigned-to-doctor.sub-header"
            )}
          />
        </Box>
        <Box display="flex" gap={4}>
          <Box>
            <Autocomplete
              options={supervisedStudentNameEmailWithId}
              loading={loadingFetchSupervisedStudents}
              onInputChange={(_event, value) => {
                setSupervisedStudentSearchParams({
                  ...supervisedStudentsSearchParam,
                  studentName: value,
                  page: 0,
                  pageSize: 5,
                });
                fetchSupervisedStudents();
              }}
              getOptionLabel={(option) => option.name}
              onChange={(_event, value) => {
                if (value) {
                  setStudentId(value.id);
                } else {
                  setStudentId("");
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label={t(
                    "dentist-teacher-operations.list.examinationscards-assigned-to-doctor.select-student-label"
                  )}
                  variant="outlined"
                  color="secondary"
                  sx={{
                    width: 300,
                  }}
                />
              )}
            />
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <DatePicker
              slotProps={{
                textField: {
                  variant: "outlined",
                  color: "secondary",
                },
              }}
              value={new Date(year, month - 1)}
              label={t(
                "dentist-teacher-operations.list.examinationscards-assigned-to-doctor.select-year-and-month-label"
              )}
              views={["month", "year"]}
              onChange={(date: Date | null) => {
                console.log(date);
                if (date) {
                  setMonth(date.getMonth() + 1);
                  setYear(date.getFullYear());
                }
              }}
            />
            <IconButton
              onClick={() => {
                setMonth(new Date().getMonth() + 1);
                setYear(new Date().getFullYear());
              }}
              disabled={
                month === new Date().getMonth() + 1 &&
                year === new Date().getFullYear()
              }
            >
              <Clear />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <PatientExaminationCardsList
        patientExaminationCards={groupedPatientExaminationCardsAssignedToDoctor}
        loading={loading.getPatientExaminationCardsAssignedToDoctor}
      />
    </LocalizationProvider>
  );
});
