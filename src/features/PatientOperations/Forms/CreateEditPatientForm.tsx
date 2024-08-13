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
  MenuItem,
  TextField,
} from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/Store";
import * as React from "react";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient;
  isEdit?: boolean;
}

/**
 * Renders a form for creating or editing a patient.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {boolean} props.isOpen - Indicates whether the form is open or not.
 * @param {Function} props.onClose - The function to close the form.
 * @param {boolean} [props.isEdit=false] - Indicates whether the form is in edit mode or not.
 * @param {Patient | undefined} [props.patient=undefined] - The patient object to edit.
 * @returns {JSX.Element} The rendered component.
 */
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

  const [t] = useTranslation("global");

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(
        t("patient-operations.form.create-edit-patient.first-name-required")
      )
      .max(
        50,
        t("patient-operations.form.create-edit-patient.first-name-validation")
      ),
    lastName: Yup.string()
      .required(
        t("patient-operations.form.create-edit-patient.last-name-required")
      )
      .max(
        50,
        t("patient-operations.form.create-edit-patient.last-name-validation")
      ),
    email: Yup.string()
      .required(t("patient-operations.form.create-edit-patient.email-required"))
      .email(t("patient-operations.form.create-edit-patient.email-invalid"))
      .max(
        255,
        t("patient-operations.form.create-edit-patient.email-validation")
      ),
    gender: Yup.string().required(
      t("patient-operations.form.create-edit-patient.gemder-required")
    ),
    ethnicGroup: Yup.string()
      .required(
        t("patient-operations.form.create-edit-patient.ethnic-group-required")
      )
      .max(
        50,
        t("patient-operations.form.create-edit-patient.ethnic-group-validation")
      ),
    otherGroup: Yup.string().max(
      50,
      t("patient-operations.form.create-edit-patient.other-group-validation")
    ),
    otherData: Yup.string().max(
      50,
      t("patient-operations.form.create-edit-patient.other-data-validation")
    ),
    otherData2: Yup.string().max(
      50,
      t("patient-operations.form.create-edit-patient.other-data-2-validation")
    ),
    otherData3: Yup.string().max(
      50,
      t("patient-operations.form.create-edit-patient.other-data-3-validation")
    ),
    location: Yup.string()
      .required(
        t("patient-operations.form.create-edit-patient.location-required")
      )
      .max(
        50,
        t("patient-operations.form.create-edit-patient.location-validation")
      ),
    age: Yup.number()
      .required(t("patient-operations.form.create-edit-patient.age-required"))
      .min(
        1,
        t("patient-operations.form.create-edit-patient.age-min-validation")
      ),
  });

  return (
    <>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <DialogTitle>
          {isEdit
            ? t("patient-operations.form.create-edit-patient.edit-patient")
            : t("patient-operations.form.create-edit-patient.add-patient")}
        </DialogTitle>
        <DialogContent>
          <Box width="100%">
            <Formik
              initialValues={{ ...initalValues, error: null }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) => {
                await handleSubmit(values).catch((error) => {
                  const errorMessage = error.response?.data?.errors
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
                      label={t(
                        "patient-operations.form.create-edit-patient.first-name"
                      )}
                      name="firstName"
                      onChange={handleChange}
                      required={true}
                      value={values.firstName}
                      error={touched.firstName || !!errors.firstName}
                      helperText={touched.firstName ? errors.firstName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.last-name"
                      )}
                      name="lastName"
                      onChange={handleChange}
                      required={true}
                      value={values.lastName}
                      error={touched.lastName || !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.email"
                      )}
                      name="email"
                      onChange={handleChange}
                      required={true}
                      value={values.email}
                      error={touched.email || !!errors.email}
                      helperText={touched.email ? errors.email : ""}
                      gridColumn="span 4"
                    />

                    <TextField
                      select
                      name="gender"
                      variant="filled"
                      label={t(
                        "patient-operations.form.create-edit-patient.gender"
                      )}
                      onChange={handleChange}
                      required={true}
                      color="secondary"
                      sx={{ gridColumn: "span 2" }}
                    >
                      <MenuItem value="Male">
                        {t("patient-operations.form.create-edit-patient.male")}
                      </MenuItem>
                      <MenuItem value="Female">
                        {t(
                          "patient-operations.form.create-edit-patient.female"
                        )}
                      </MenuItem>
                    </TextField>

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.age"
                      )}
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
                      label={t(
                        "patient-operations.form.create-edit-patient.ethnic-group"
                      )}
                      name="ethnicGroup"
                      onChange={handleChange}
                      required={true}
                      value={values.ethnicGroup}
                      error={touched.ethnicGroup || !!errors.ethnicGroup}
                      helperText={touched.ethnicGroup ? errors.ethnicGroup : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.other-group"
                      )}
                      name="otherGroup"
                      onChange={handleChange}
                      value={values.otherGroup}
                      error={touched.otherGroup || !!errors.otherGroup}
                      helperText={touched.otherGroup ? errors.otherGroup : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.years-in-school"
                      )}
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
                      label={t(
                        "patient-operations.form.create-edit-patient.location"
                      )}
                      name="location"
                      onChange={handleChange}
                      required={true}
                      value={values.location}
                      error={touched.location || !!errors.location}
                      helperText={touched.location ? errors.location : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.other-data"
                      )}
                      name="otherData"
                      onChange={handleChange}
                      value={values.otherData}
                      error={touched.otherData || !!errors.otherData}
                      helperText={touched.otherData ? errors.otherData : ""}
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.other-data2"
                      )}
                      name="otherData2"
                      onChange={handleChange}
                      value={values.otherData2}
                      error={touched.otherData2 || !!errors.otherData2}
                      helperText={touched.otherData2 ? errors.otherData2 : ""}
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label={t(
                        "patient-operations.form.create-edit-patient.other-data3"
                      )}
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
                        buttonText={
                          isEdit
                            ? t(
                                "patient-operations.form.create-edit-patient.edit-patient"
                              )
                            : t(
                                "patient-operations.form.create-edit-patient.add-patient"
                              )
                        }
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
            ? t(
                "patient-operations.form.create-edit-patient.patient-updated-message"
              )
            : t(
                "patient-operations.form.create-edit-patient.patient-created-message"
              )
        }
      />
    </>
  );
});
