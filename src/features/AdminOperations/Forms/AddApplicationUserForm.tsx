import {
  Box,
  Checkbox,
  useMediaQuery,
  FormControlLabel,
  Typography,
  Dialog,
  FormControl,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import * as Yup from "yup";
import { useStore } from "../../../app/stores/Store";
import { ApplicationUserFormValues } from "../../../app/models/ApplicationUser";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import CustomSelect from "../../../app/common/formInputs/CustomSelect";
import { roles } from "../../../app/models/Role";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function AddApplicationUserForm({
  isOpen,
  onClose,
}: Props) {
  const {
    adminStore: { addApplicationUser },
  } = useStore();

  const [isGuest, setIsGuest] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const initialValues: ApplicationUserFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    guestUserComment: "",
    phoneNumber: "",
    role: "Student",
  };

  const phoneRegExp = /^\d{6,11}$/;
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone Number is Invalid")
      .nullable(),
  });

  const handleSubmit = async (values: ApplicationUserFormValues) => {
    await addApplicationUser(values);
    setSnackbarOpen(true);
    onClose();
  };

  const [t] = useTranslation("global");

  return (
    <>
      <Dialog open={isOpen} fullWidth TransitionComponent={SlideUpTransition}>
        <Box
          display="flex"
          padding={5}
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%">
            <Formik
              initialValues={{
                ...initialValues,
                error: null,
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setErrors }) =>
                await handleSubmit(values).catch((error) => {
                  setErrors({ error: error.response.data });
                })
              }
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
                  <Typography
                    variant="h4"
                    color="text.primary"
                    fontWeight="bold"
                    sx={{ mb: "15px" }}
                    align="left"
                  >
                    {t("admin-operations.forms.add-application-user-form.header")}
                  </Typography>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <CustomTextField
                      label={t("admin-operations.forms.add-application-user-form.first-name")}
                      name="firstName"
                      onChange={handleChange}
                      required={true}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t("admin-operations.forms.add-application-user-form.last-name")}
                      name="lastName"
                      onChange={handleChange}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label={t("admin-operations.forms.add-application-user-form.phone-number")}
                      name="phoneNumber"
                      onChange={handleChange}
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                      gridColumn="span 2"
                      type="text"
                    />

                    <Box component={FormControl} sx={{ gridColumn: "span 2" }}>
                      <CustomSelect
                        label={t("admin-operations.forms.add-application-user-form.role")}
                        value={values.role}
                        options={roles}
                        required={true}
                        onChange={(e) => {
                          handleChange({
                            target: {
                              name: "role",
                              value: e.target.value,
                            },
                          });
                        }}
                      />
                    </Box>

                    <CustomTextField
                      label={t("admin-operations.forms.add-application-user-form.email")}
                      name="email"
                      onChange={handleChange}
                      error={touched.email && !!errors.email}
                      helperText={touched.email ? errors.email : ""}
                      required={true}
                      gridColumn="span 4"
                      type="email"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isGuest}
                          color="info"
                          onClick={() => setIsGuest(!isGuest)}
                        />
                      }
                      label={t("admin-operations.forms.add-application-user-form.is-guest")}
                      sx={{ gridColumn: "span 2" }}
                    />

                    {isGuest && (
                      <CustomTextField
                        label={t("admin-operations.forms.add-application-user-form.comment")}
                        name="guestUserComment"
                        onChange={handleChange}
                        error={
                          touched.guestUserComment && !!errors.guestUserComment
                        }
                        helperText={
                          touched.guestUserComment
                            ? errors.guestUserComment
                            : ""
                        }
                        gridColumn="span 4"
                        type="text"
                      />
                    )}

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <CustomSubmitButton
                        isSubmitting={isSubmitting}
                        buttonText={t("admin-operations.forms.add-application-user-form.save-button")}
                      />
                      <CustomCancelButton
                        handleCancel={() => {
                          onClose();
                          setIsGuest(false);
                        }}
                      />
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Dialog>
      <CustomSanckbar
        snackbarOpen={snackbarOpen}
        snackbarClose={() => setSnackbarOpen(false)}
        message={t("admin-operations.forms.add-application-user-form.user-added-message")}
      />
    </>
  );
});
