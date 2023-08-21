import {
  Box,
  Checkbox,
  useMediaQuery,
  FormControlLabel,
  Typography,
  Dialog,
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
                    Add User
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
                      label="First Name"
                      name="firstName"
                      onChange={handleChange}
                      required={true}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Last Name"
                      name="lastName"
                      required={true}
                      onChange={handleChange}
                      error={touched.lastName && !!errors.lastName}
                      helperText={touched.lastName ? errors.lastName : ""}
                      gridColumn="span 2"
                    />

                    <CustomTextField
                      label="Email"
                      name="email"
                      onChange={handleChange}
                      error={touched.email && !!errors.email}
                      helperText={touched.email ? errors.email : ""}
                      required={true}
                      gridColumn="span 4"
                      type="email"
                    />

                    <CustomTextField
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={handleChange}
                      error={touched.phoneNumber && !!errors.phoneNumber}
                      helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                      gridColumn="span 4"
                      type="text"
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          value={isGuest}
                          color="info"
                          onClick={() => setIsGuest(!isGuest)}
                        />
                      }
                      label="Is Guest User"
                      sx={{ gridColumn: "span 2" }}
                    />

                    {isGuest && (
                      <CustomTextField
                        label="Comment"
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
                        buttonText="Save"
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
        message="User added successfully!!"
      />
    </>
  );
});
