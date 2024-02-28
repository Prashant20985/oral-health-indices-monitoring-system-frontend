import { observer } from "mobx-react-lite";
import {
  CreateUpdatePatientFormValues,
  Patient,
} from "../../../app/models/Patient";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
} from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSelect from "../../../app/common/formInputs/CustomSelect";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient;
  isEdit?: boolean;
}

export default observer(function CreateEditPatientForm({
  isOpen,
  onClose,
  isEdit = false,
  patient = undefined,
}: Props) {
  const {
    patientStore: { createPatient, updatePatient },
  } = useStore();

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSubmit = async (values: CreateUpdatePatientFormValues) => {
    if (isEdit) {
      await updatePatient(patient!.id, values).then(() => {
        onClose();
        setOpenSnackbar(true);
      });
    } else {
      await createPatient(values).then(() => {
        onClose();
        setOpenSnackbar(true);
      });
    }
  };
  const initalValues: CreateUpdatePatientFormValues = {
    firstName: patient?.firstName || "",
    lastName: patient?.lastName || "",
    email: patient?.email || "",
    gender: patient?.gender || "",
    ethnicGroup: patient?.ethnicGroup || "",
    otherGroup: patient?.otherGroup || "",
    yearsInSchool: patient?.yearsInSchool || 0,
    otherData: patient?.otherData || "",
    otherData2: patient?.otherData2 || "",
    otherData3: patient?.otherData3 || "",
    location: patient?.location || "",
    age: patient?.age || 0,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First Name is required")
      .max(50, "First Name must be at most 50 characters"),
    lastName: Yup.string()
      .required("Last Name is required")
      .max(50, "Last Name must be at most 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .max(255, "Email must be at most 255 characters"),
    gender: Yup.string().required("Gender is required"),
    ethnicGroup: Yup.string()
      .required("Ethnic Group is required")
      .max(50, "Ethnic Group must be at most 50 characters"),
    otherGroup: Yup.string().max(
      50,
      "Other Group must be at most 50 characters"
    ),
    otherData: Yup.string().max(50, "Other Data must be at most 50 characters"),
    otherData2: Yup.string().max(
      50,
      "Other Data 2 must be at most 50 characters"
    ),
    otherData3: Yup.string().max(
      50,
      "Other Data 3 must be at most 50 characters"
    ),
    location: Yup.string()
      .required("Location is required")
      .max(50, "Location must be at most 50 characters"),
    age: Yup.number().required("Age is required"),
  });

  return (
    <>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <DialogTitle>{isEdit ? "Edit Patient" : "Add Patient"}</DialogTitle>
        <DialogContent>
          <Box width="100%">
            <Formik
              initialValues={{ ...initalValues, error: null }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) => {
                await handleSubmit(values).catch((error) => {
                  setErrors({ error: error.response.data });
                });
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap={2}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <CustomTextField
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      required={true}
                      value={values.firstName}
                      error={touched.firstName || !!errors.firstName}
                      helperText={touched.firstName ? errors.firstName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Last Name"
                      name="lastName"
                      onChange={handleChange}
                      required={true}
                      value={values.lastName}
                      error={touched.lastName || !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      required={true}
                      value={values.email}
                      error={touched.email || !!errors.email}
                      helperText={touched.email ? errors.email : ""}
                      gridColumn="span 4"
                    />

                    <Box component={FormControl} sx={{ gridColumn: "span 2" }}>
                      <CustomSelect
                        label="Gender"
                        onChange={(e) => {
                          handleChange({
                            target: {
                              name: "gender",
                              value: e.target.value,
                            },
                          });
                        }}
                        required={true}
                        options={["Male", "Female"]}
                        value={values.gender}
                      />
                    </Box>

                    <CustomTextField
                      label="Age"
                      name="age"
                      onChange={handleChange}
                      required={true}
                      value={values.age}
                      type="number"
                      error={touched.age || !!errors.age}
                      helperText={touched.age ? errors.age : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Ethnic Group"
                      name="ethnicGroup"
                      onChange={handleChange}
                      required={true}
                      value={values.ethnicGroup}
                      error={touched.ethnicGroup || !!errors.ethnicGroup}
                      helperText={touched.ethnicGroup ? errors.ethnicGroup : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Other Group"
                      name="otherGroup"
                      onChange={handleChange}
                      value={values.otherGroup}
                      error={touched.otherGroup || !!errors.otherGroup}
                      helperText={touched.otherGroup ? errors.otherGroup : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Years In School"
                      name="yearsInSchool"
                      onChange={handleChange}
                      required={true}
                      type="number"
                      value={values.yearsInSchool}
                      error={touched.yearsInSchool || !!errors.yearsInSchool}
                      helperText={
                        touched.yearsInSchool ? errors.yearsInSchool : ""
                      }
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Location"
                      name="location"
                      onChange={handleChange}
                      required={true}
                      value={values.location}
                      error={touched.location || !!errors.location}
                      helperText={touched.location ? errors.location : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Other Data"
                      name="otherData"
                      onChange={handleChange}
                      value={values.otherData}
                      error={touched.otherData || !!errors.otherData}
                      helperText={touched.otherData ? errors.otherData : ""}
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label="Other Data 2"
                      name="otherData2"
                      onChange={handleChange}
                      value={values.otherData2}
                      error={touched.otherData2 || !!errors.otherData2}
                      helperText={touched.otherData2 ? errors.otherData2 : ""}
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label="Other Data 3"
                      name="otherData3"
                      onChange={handleChange}
                      value={values.otherData3}
                      error={touched.otherData3 || !!errors.otherData3}
                      helperText={touched.otherData3 ? errors.otherData3 : ""}
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
                        buttonText={isEdit ? "Edit Patient" : "Add Patient"}
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
      <CustomSanckbar
        snackbarOpen={openSnackbar}
        snackbarClose={() => setOpenSnackbar(false)}
        message={
          isEdit
            ? "Patient Updated Successfully!!"
            : "Patient Created Successfully!!"
        }
      />
    </>
  );
});
