import { Form, Formik, FormikValues } from "formik";
import React from "react";
import ButtonLoadingComponent from "../../../../app/common/loadingComponents/ButtonLoadingComponent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../../app/stores/Store";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../../themeConfig";
import {
  Mail,
  LocationCity,
  School,
  EditCalendar,
  ArrowBack,
  ArrowForward,
  Send,
  Close,
} from "@mui/icons-material";
import { CreatePatientExaminationCardInitialValues } from "./CreatePatientExaminationCardInitialValues";
import {
  PatientExaminationCardByDoctorFormValues,
  PatientExaminationCardByStudentFormValues,
} from "../../../../app/models/PatientExaminationCard";
import { LoadingButton } from "@mui/lab";
import CustomErrorMessage from "../../../../app/common/formInputs/CustomErrorMessage";
import { router } from "../../../../app/router/Routes";
import CancelConfirmationDialog from "./CancelConfirmationDialog";
import CustomSanckbar from "../../../../app/common/snackbar/CustomSnackbar";

const RiskFactorAssessment = React.lazy(
  () => import("../../../IndexCalculationForms/RiskFactorAssessment")
);

const CreateDMFT_DMFSForm = React.lazy(() => import("./CreateDMFT_DMFSForm"));

const CreateBeweForm = React.lazy(() => import("./CreateBeweForm"));

const CreateBleedingForm = React.lazy(() => import("./CreateBleedingForm"));

const CreateAPIForm = React.lazy(() => import("./CreateAPIForm"));

const Summary = React.lazy(
  () => import("../../../IndexCalculationForms/SummaryForm")
);

const steps = [
  "Risk Factor Assessment",
  "DMFT/DMFS",
  "BEWE",
  "API",
  "Bleeding",
  "Summary",
];

function renderStepContent(
  step: number,
  values:
    | PatientExaminationCardByDoctorFormValues
    | PatientExaminationCardByStudentFormValues,
  handleChnage?: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  switch (step) {
    case 0:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <RiskFactorAssessment
            riskFactorAssessment={values.riskFactorAssessmentModel}
            handleChange={handleChnage}
            name="riskFactorAssessmentModel"
          />
        </React.Suspense>
      );
    case 1:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreateDMFT_DMFSForm
            dmft_dmfsFormValues={values.dmfT_DMFS}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 2:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreateBeweForm
            beweFormValues={values.bewe}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 3:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreateAPIForm
            apiFormValues={values.api}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 4:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreateBleedingForm
            handleChange={handleChnage}
            bleedingFormValues={values.bleeding}
          />
        </React.Suspense>
      );
    case 5:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <Summary
            summary={values.summary}
            handleChange={handleChnage}
            name="summary"
          />
        </React.Suspense>
      );
  }
}

export default observer(function CreatePatientExaminationCardMultiStepForm() {
  const { id } = useParams<{ id: string }>();

  const {
    patientExaminationCardStore: {
      createPatientExaminationCardByDoctor,
      createPatientExaminationCardByStudent,
    },
    patientStore: { fetchPatientDetails, patientDetails, loading },
    studentStore: { fetchSupervisors, supervisors },
    userStore: { user },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [activeStep, setActiveStep] = React.useState(0);
  const [snapShot, setSnapShot] = React.useState(
    CreatePatientExaminationCardInitialValues
  );
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  const [submitSucessSnackbarOpen, setSubmitSucessSnackbarOpen] =
    React.useState(false);

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = (
    values:
      | PatientExaminationCardByDoctorFormValues
      | PatientExaminationCardByStudentFormValues
  ) => {
    setSnapShot(values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (
    values:
      | PatientExaminationCardByDoctorFormValues
      | PatientExaminationCardByStudentFormValues
  ) => {
    setSnapShot(values);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isDoctor =
    user?.role === "Dentist_Teacher_Examiner" ||
    user?.role === "Dentist_Teacher_Researcher";

  const isStudent = user?.role === "Student";

  const handleSubmit = async (values: FormikValues) => {
    if (id) {
      if (isDoctor) {
        await createPatientExaminationCardByDoctor(
          id,
          values as PatientExaminationCardByDoctorFormValues
        ).then(() => {
          setSubmitSucessSnackbarOpen(true);
        });
      } else if (isStudent) {
        await createPatientExaminationCardByStudent(
          id,
          values as PatientExaminationCardByStudentFormValues
        ).then(() => {
          setSubmitSucessSnackbarOpen(true);
        });
      }
    }
  };

  React.useEffect(() => {
    if (id) {
      fetchPatientDetails(id);
    }
  }, [id, fetchPatientDetails]);

  React.useEffect(() => {
    const unloadCallback = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = "Are you sure you want to leave?");
    };

    window.addEventListener("beforeunload", unloadCallback);

    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, []);

  return (
    <Box>
      <Box mb={1} display="flex" justifyContent="flex-end">
        <Button
          variant="outlined"
          color="info"
          endIcon={<Close />}
          onClick={() => setOpenCancelDialog(true)}
        >
          Cancel
        </Button>
      </Box>
      <Formik
        initialValues={{ ...snapShot, error: null }}
        onSubmit={async (values, { setErrors }) => {
          await handleSubmit(values).catch((error) => {
            const errorMessage = error.response.data.errors
              ? Object.entries(error.response.data.errors)
                  .map(
                    ([key, messages]) =>
                      `${key}: ${(messages as string[]).join(" ")}`
                  )
                  .join("\n")
              : error.response.data;
            setErrors({ error: errorMessage });
          });
        }}
      >
        {({ values, handleChange, errors, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid
              container
              component={Paper}
              sx={{
                backgroundColor: color.primary[400],
                mt: 2,
                p: 2,
              }}
            >
              <Grid item xs={12} md={4}>
                {loading.patientDetails ? (
                  <ButtonLoadingComponent content="Loading Patient Details..." />
                ) : patientDetails ? (
                  <>
                    <Card
                      elevation={3}
                      sx={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <CardHeader
                        title={
                            <Typography
                              variant="h3"
                              noWrap
                              sx={{
                                fontFamily: "revert-layer",
                                fontWeight: 700,
                              }}
                            >
                              Patient Details
                            </Typography>
                        }
                      />
                      <CardContent>
                        <Box display="flex" gap={1}>
                          <Typography
                            variant="h4"
                            noWrap
                            sx={{
                              fontFamily: "revert-layer",
                              fontWeight: 700,
                            }}
                          >
                            {patientDetails.firstName} {patientDetails.lastName}
                            ,
                          </Typography>
                          <Typography variant="h4" color="textSecondary" noWrap>
                            {patientDetails.age}
                          </Typography>
                        </Box>
                        <Box>
                          <Stack mt={2} spacing={1}>
                            <Box display="flex" alignItems="center" gap={1}>
                              <Mail />
                              <Typography variant="h6" color="textSecondary">
                                {patientDetails.email}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <LocationCity />
                              <Typography variant="h6" color="textSecondary">
                                {patientDetails.location}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <School />
                              <Typography variant="h6" color="textSecondary">
                                Years in School: {patientDetails.yearsInSchool}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={1}>
                              <EditCalendar />
                              <Typography variant="h6" color="textSecondary">
                                Created At:{" "}
                                {new Date(
                                  patientDetails.createdAt
                                ).toDateString()}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      </CardContent>
                    </Card>
                  </>
                ) : null}
              </Grid>
              <Grid item xs={12} md={8}>
                <Box display="flex" flexDirection="column" gap={4} p={3}>
                  {isStudent && (
                    <Autocomplete
                      options={supervisors}
                      getOptionLabel={(option) => option.doctorName}
                      loading={supervisors.length === 0}
                      onFocus={() => {
                        if (supervisors.length === 0) {
                          setTimeout(() => {
                            fetchSupervisors();
                          }, 3000);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Assign To Supervisor"
                          variant="outlined"
                          color="secondary"
                          required={isStudent}
                        />
                      )}
                      onChange={(_event, value) => {
                        setFieldValue("assignedDoctorId", value?.id);
                      }}
                    />
                  )}
                  <TextField
                    fullWidth
                    color="secondary"
                    variant="outlined"
                    label="Card Comment"
                    multiline
                    rows={isStudent ? 6 : 10}
                    value={values.patientExaminationCardComment}
                    onChange={handleChange}
                    name="patientExaminationCardComment"
                    inputProps={{ maxLength: 500 }}
                    required={false}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Stepper
                activeStep={activeStep}
                sx={{
                  backgroundColor: color.primary[400],
                  boxShadow: 2,
                  borderRadius: 2,
                  padding: 2,
                  "& .MuiStepIcon-root": {
                    transition: "color 0.3s, font-size 0.3s",
                    cursor: "pointer",
                  },
                  "& .MuiStepConnector-line": {
                    transition: "border-color 0.5s",
                  },
                  "& .Mui-active": {
                    "&.MuiStepIcon-root": {
                      color: "info.main",
                      fontSize: "2rem",
                    },
                    "& .MuiStepConnector-line": {
                      borderColor: "info.main",
                    },
                  },
                  "& .Mui-completed": {
                    "&.MuiStepIcon-root": {
                      color: "secondary.main",
                      fontSize: "2rem",
                    },
                    "& .MuiStepConnector-line": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      onClick={() => setActiveStep(steps.indexOf(label))}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            <Box
              display="flex"
              width="100%"
              justifyContent="flex-end"
              gap={4}
              mt={2}
            >
              <Button
                color="info"
                variant="outlined"
                onClick={() => handleBack(values)}
                disabled={activeStep === 0}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <>
                {isLastStep ? (
                  <LoadingButton
                    variant="outlined"
                    color="success"
                    type="submit"
                    loading={isSubmitting}
                    endIcon={<Send />}
                    loadingPosition="end"
                  >
                    <span>Submit</span>
                  </LoadingButton>
                ) : (
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => handleNext(values)}
                    endIcon={<ArrowForward />}
                  >
                    Next
                  </Button>
                )}
              </>
            </Box>
            <Box mt={2} mb={2}>
              <CustomErrorMessage error={errors.error} />
            </Box>
            {renderStepContent(activeStep, values, handleChange)}
          </Form>
        )}
      </Formik>
      <CancelConfirmationDialog
        open={openCancelDialog}
        onClose={() => setOpenCancelDialog(false)}
        onConfirm={() => router.navigate(`/patient-profile/${id}`)}
      />
      <CustomSanckbar
        snackbarOpen={submitSucessSnackbarOpen}
        snackbarClose={() => {
          setSubmitSucessSnackbarOpen(false);
          router.navigate(`/patient-profile/${id}`);
        }}
        message="Patient Examination Card Created Successfully!!"
      />
    </Box>
  );
});
