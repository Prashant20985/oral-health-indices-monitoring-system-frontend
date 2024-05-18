import { observer } from "mobx-react-lite";
import { Exam, UpdateExam } from "../../../app/models/StudentExam";
import { useStore } from "../../../app/stores/Store";
import {
  Box,
  Dialog,
  DialogContent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";
import * as Yup from "yup";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Field, FieldProps, Form, Formik } from "formik";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import DurationPicker from "../../../app/common/formInputs/DurationPicker";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";

interface Props {
  exam: Exam;
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function UpdateExamForm({
  exam,
  isOpen,
  onClose,
}: Props) {
  const {
    studentExamStore: { updateExam },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const handleSubmit = async (values: UpdateExam) => {
    await updateExam(exam.id, values).then(() => onClose());
  };

  const initialValues: UpdateExam = {
    dateOfExamination: exam.dateOfExamination,
    examTitle: exam.examTitle,
    description: exam.description,
    startTime: exam.startTime,
    endTime: exam.endTime,
    durationInterval: exam.durationInterval,
    maxMark: exam.maxMark,
  };

  const validationSchema = Yup.object().shape({
    dateOfExamination: Yup.date()
      .required("Date of Examination is required")
      .min(new Date(), "Date of Examination cannot be in the past"),
    examTitle: Yup.string()
      .required("Exam Title is required")
      .min(2, "Exam Title should be at least 2 characters")
      .max(100, "Exam Title should not exceed 100 characters"),
    description: Yup.string()
      .required("Description is required")
      .min(10, "Description should be at least 10 characters")
      .max(1000, "Description should not exceed 1000 characters"),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string()
      .required("End Time is required")
      .test(
        "is-greater",
        "End Time must be after Start Time",
        function (value) {
          const { startTime } = this.parent;
          if (!startTime || !value) return true;
          return startTime < value;
        }
      ),
    durationInterval: Yup.string().required("Duration Interval is required"),
    maxMark: Yup.number()
      .required("Max Mark is required")
      .min(1, "Max Mark must be at least 1")
      .max(100, "Max Mark must not exceed 100"),
  });

  const padZero = (num: number) => String(num).padStart(2, "0");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <DialogContent>
          <Box width="100%">
            <Formik
              initialValues={{ ...initialValues, error: null }}
              onSubmit={async (values, { setErrors }) => {
                await handleSubmit(values).catch((error) =>
                  setErrors({ error: error.message })
                );
              }}
              validationSchema={validationSchema}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                setFieldValue,
                handleBlur,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap={2}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <CustomTextField
                      label="Exam Title"
                      name="examTitle"
                      onChange={handleChange}
                      value={values.examTitle}
                      error={touched.examTitle && !!errors.examTitle}
                      helperText={touched.examTitle ? errors.examTitle : ""}
                      gridColumn="span 4"
                    />

                    <TextField
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      error={touched.description && !!errors.description}
                      helperText={touched.description ? errors.description : ""}
                      value={values.description}
                      multiline
                      rows={4}
                      color="secondary"
                      variant="filled"
                      sx={{ gridColumn: "span 4", color: color.grey[100] }}
                    />

                    <DatePicker
                      slotProps={{
                        textField: {
                          variant: "filled",
                          color: "secondary",
                          sx: { gridColumn: "span 4" },
                          error:
                            touched.dateOfExamination &&
                            !!errors.dateOfExamination,
                        },
                      }}
                      label="Date of Examination"
                      name="dateOfExamination"
                      value={values.dateOfExamination}
                      minDate={new Date()}
                      onChange={(date: Date | null) =>
                        setFieldValue("dateOfExamination", date)
                      }
                    />

                    <TimePicker
                      name="startTime"
                      label="Start Time"
                      value={new Date(`1970-01-01T${values.startTime}`)}
                      onChange={(date: Date | null) => {
                        const hours = date?.getHours();
                        const minutes = date?.getMinutes();
                        const seconds = date?.getSeconds();
                        setFieldValue(
                          "startTime",
                          `${padZero(hours!)}:${padZero(minutes!)}:${padZero(
                            seconds!
                          )}`
                        );
                      }}
                      slotProps={{
                        textField: {
                          variant: "filled",
                          color: "secondary",
                          fullWidth: true,
                          sx: { gridColumn: "span 2" },
                          error: touched.startTime && !!errors.startTime,
                          helperText:
                            touched.startTime && errors.startTime
                              ? errors.startTime
                              : "",
                        },
                      }}
                    />

                    <TimePicker
                      name="endTime"
                      label="End Time"
                      value={new Date(`1970-01-01T${values.endTime}`)}
                      onChange={(date: Date | null) => {
                        const hours = date?.getHours();
                        const minutes = date?.getMinutes();
                        const seconds = date?.getSeconds();
                        setFieldValue(
                          "endTime",
                          `${padZero(hours!)}:${padZero(minutes!)}:${padZero(
                            seconds!
                          )}`
                        );
                      }}
                      slotProps={{
                        textField: {
                          variant: "filled",
                          color: "secondary",
                          fullWidth: true,
                          sx: { gridColumn: "span 2" },
                          error: touched.endTime && !!errors.endTime,
                          helperText:
                            touched.endTime && errors.endTime
                              ? errors.endTime
                              : "",
                        },
                      }}
                    />

                    <Box sx={{ gridColumn: "span 4" }}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Duration Of Exam
                      </Typography>
                      <Field name="durationInterval">
                        {({ field }: FieldProps) => (
                          <DurationPicker
                            name={field.name}
                            value={field.value}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.durationInterval &&
                              Boolean(errors.durationInterval)
                            }
                            helperText={
                              touched.durationInterval &&
                              errors.durationInterval
                                ? errors.durationInterval
                                : ""
                            }
                          />
                        )}
                      </Field>
                    </Box>

                    <CustomTextField
                      label="Max Mark"
                      name="maxMark"
                      value={values.maxMark}
                      onChange={handleChange}
                      type="number"
                      error={touched.maxMark && !!errors.maxMark}
                      helperText={touched.maxMark ? errors.maxMark : ""}
                      gridColumn="span 4"
                    />

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <CustomSubmitButton
                        isSubmitting={isSubmitting}
                        buttonText="Update Exam"
                      />
                      <CustomCancelButton handleCancel={onClose} />
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
});
