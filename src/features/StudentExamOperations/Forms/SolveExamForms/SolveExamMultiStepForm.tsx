import { Box, Button, Step, StepLabel, Stepper, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import * as React from "react";
import {
  Form,
  Formik,
  FormikErrors,
  FormikTouched,
  FormikValues,
} from "formik";
import ButtonLoadingComponent from "../../../../app/common/loadingComponents/ButtonLoadingComponent";
import { ArrowBack, ArrowForward, Send } from "@mui/icons-material";
import { colors } from "../../../../themeConfig";
import { ExamSolutionFormValues } from "../../../../app/models/StudentExam";
import ExamSubmitSuccessDialog from "./ExamSubmitSuccessDialog";
import { useStore } from "../../../../app/stores/Store";
import { useParams } from "react-router-dom";
import { router } from "../../../../app/router/Routes";
import { LoadingButton } from "@mui/lab";
import SolveExamCountdownTimer from "../../../../app/common/countdownTimer/SolveExamCountdownTimer";
import CreatePracticePatientForm from "./CreatePracticePatientForm";
import { ExamSolutionInitialValues } from "./ExamSolutionInitialValues";
import { CheckExamStatus } from "../../../../app/helper/CheckExamStatus";
import * as Yup from "yup";
import CustomErrorMessage from "../../../../app/common/formInputs/CustomErrorMessage";

const RiskFactorAssessment = React.lazy(
  () => import("../../../IndexCalculationForms/RiskFactorAssessment")
);

const CreatePracticeDMFT_DMFSForm = React.lazy(
  () => import("./CreatePracticeDMFT_DMFSForm")
);

const CreatePracticeBeweForm = React.lazy(
  () => import("./CreatePracticeBeweForm")
);

const CreatePracticeAPIForm = React.lazy(
  () => import("./CreatePracticeAPIForm")
);

const CreatePracticeBleedingForm = React.lazy(
  () => import("./CreatePracticeBleedingForm")
);

const Summary = React.lazy(
  () => import("../../../IndexCalculationForms/SummaryForm")
);

const steps = [
  "Patient Information",
  "Risk Factor Assessment",
  "DMFT/DMFS",
  "BEWE",
  "API",
  "Bleeding",
  "Summary",
];

function renderStepContent(
  step: number,
  values: FormikValues,
  handleChnage?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  touched?: FormikTouched<ExamSolutionFormValues>,
  errors?: FormikErrors<ExamSolutionFormValues>
) {
  switch (step) {
    case 0:
      return (
        <CreatePracticePatientForm
          handleChange={handleChnage}
          patient={values.patientDto}
          touched={touched?.patientDto}
          errors={errors?.patientDto}
        />
      );
    case 1:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <RiskFactorAssessment
            riskFactorAssessment={values.riskFactorAssessmentModel}
            handleChange={handleChnage}
            name="riskFactorAssessmentModel"
          />
        </React.Suspense>
      );
    case 2:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreatePracticeDMFT_DMFSForm
            dmft_dmfsFormValues={values.practiceDMFT_DMFS}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 3:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreatePracticeBeweForm
            beweFormValues={values.practiceBewe}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 4:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreatePracticeAPIForm
            apiFormValues={values.practiceAPI}
            handleChange={handleChnage}
          />
        </React.Suspense>
      );
    case 5:
      return (
        <React.Suspense fallback={<ButtonLoadingComponent />}>
          <CreatePracticeBleedingForm
            handleChange={handleChnage}
            bleedingFormValues={values.practiceBleeding}
          />
        </React.Suspense>
      );
    case 6:
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

export default observer(function SolveExamForm() {
  const {
    studentExamStore: {
      fetchExamDetails,
      examDetails,
      submitExamSolution,
      checkEligibilityToSubmitExam,
      isEligibleToSubmitExam,
    },
  } = useStore();
  const { examId } = useParams<{ examId: string }>();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [activeStep, setActiveStep] = React.useState(0);
  const [snapShot, setSnapShot] = React.useState(ExamSolutionInitialValues);
  const [openSubmitSuccessDialog, setOpenSubmitSuccessDialog] =
    React.useState(false);

  const isLastStep = activeStep === steps.length - 1;

  const handleSubmit = async (values: ExamSolutionFormValues) => {
    if (examId) {
      await submitExamSolution(examId, values);
      console.log(values);
    }
    setOpenSubmitSuccessDialog(true);
  };

  const handleNext = (values: ExamSolutionFormValues) => {
    setSnapShot(values);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (values: ExamSolutionFormValues) => {
    setSnapShot(values);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    if (examId) {
      fetchExamDetails(examId);
    }
  }, [fetchExamDetails, examId]);

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

  React.useEffect(() => {
    if (examDetails) {
      const { started, ended, ongoing } = CheckExamStatus(
        examDetails.dateOfExamination.toString(),
        examDetails.endTime,
        examDetails.startTime
      );
      if (!started || ended) {
        router.navigate(`/unauthorized`);
      }
      if (ongoing) {
        checkEligibilityToSubmitExam(examDetails.id);
        if (!isEligibleToSubmitExam) {
          router.navigate(`/unauthorized`);
        }
      }
    }
  }, [
    checkEligibilityToSubmitExam,
    examDetails,
    examId,
    isEligibleToSubmitExam,
  ]);

  const validationSchema = Yup.object({
    patientDto: Yup.object({
      firstName: Yup.string()
        .required("First Name is required")
        .max(50, "First Name must be at most 50 characters"),
      lastName: Yup.string()
        .required("Last Name is required")
        .max(50, "Last Name must be at most 50 characters"),
      gender: Yup.string().required("Gender is required"),
      ethnicGroup: Yup.string()
        .required("Ethnic Group is required")
        .max(50, "Ethnic Group must be at most 50 characters"),
      age: Yup.number().required("Age is required"),
      location: Yup.string().required("Location is required"),
      email: Yup.string().email().required("Email is required"),
      yearsInSchool: Yup.string().required("Years In School is required"),
      otherGroup: Yup.string().max(
        50,
        "Other Group must be at most 50 characters"
      ),
      otherData: Yup.string().max(
        50,
        "Other Data must be at most 50 characters"
      ),
      otherData2: Yup.string().max(
        50,
        "Other Data 2 must be at most 50 characters"
      ),
      otherData3: Yup.string().max(
        50,
        "Other Data 3 must be at most 50 characters"
      ),
    }),
    summary: Yup.object({
      needForDentalInterventions: Yup.string().max(1, "Max 1 character`"),
      patientRecommendations: Yup.string().max(
        500,
        "Patient Recommendations must be at most 500 characters"
      ),
      description: Yup.string().max(
        500,
        "Description must be at most 500 characters"
      ),
      proposedTreatment: Yup.string().max(
        500,
        "Proposed Treatment must be at most 500 characters"
      ),
    }),
  });

  return (
    <>
      {examDetails && (
        <Box>
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
                <StepLabel onClick={() => setActiveStep(steps.indexOf(label))}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box mt={3}>
            <Formik
              initialValues={{ ...snapShot, error: null }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) => {
                await handleSubmit(values).catch((error) => {
                  setErrors({ error: error.response.data });
                });
              }}
            >
              {({
                handleChange,
                values,
                submitForm,
                isSubmitting,
                touched,
                errors,
                isValid,
                dirty,
              }) => (
                <Form>
                  <Box
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box>
                      <SolveExamCountdownTimer
                        duration={examDetails.durationInterval}
                        onSubmit={() => submitForm()}
                      />
                    </Box>
                    <Box display="flex" gap={4}>
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
                            disabled={!isValid || !dirty}
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
                  </Box>
                  {renderStepContent(
                    activeStep,
                    values,
                    handleChange,
                    touched,
                    errors
                  )}
                  <CustomErrorMessage error={errors.error} />
                </Form>
              )}
            </Formik>
          </Box>
          <ExamSubmitSuccessDialog
            open={openSubmitSuccessDialog}
            onClose={() => {
              setOpenSubmitSuccessDialog(false);
              router.navigate(`/exam/${examId}`);
            }}
          />
        </Box>
      )}
    </>
  );
});
