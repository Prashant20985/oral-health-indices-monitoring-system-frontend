import { Box, useMediaQuery } from "@mui/material";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { ChangePasswordValues } from "../../../app/models/User";
import CustomPasswordTextField from "../../../app/common/formInputs/CustomPassowrdTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import { useStore } from "../../../app/stores/Store";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";

interface Props {
  email: string;
  onClose: () => void;
}

export default observer(function ChangePasswordForm({ email, onClose }: Props) {
  const {
    userStore: { changePassword },
  } = useStore();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [changePassSanckbarOpen, setChnagePassSnackbarOpen] =
    React.useState(false);

  const initialValues: ChangePasswordValues = {
    email: email,
    currentPassword: "",
    newPassword: "",
  };

  const handleChangePass = async (values: ChangePasswordValues) => {
    await changePassword(values).then(() => setChnagePassSnackbarOpen(true));
  };

  return (
    <>
      <Box width="100%">
        {email && (
          <Formik
            initialValues={{ ...initialValues, error: null }}
            onSubmit={async (values, { setErrors }) =>
              await handleChangePass(values).catch((error) => {
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
                <Box mb={2}>
                  <Box
                    display="grid"
                    gap="30px"
                    p={4}
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <CustomPasswordTextField
                      label="Current Password"
                      name="currentPassword"
                      onChange={handleChange}
                      error={
                        touched.currentPassword && !!errors.currentPassword
                      }
                      helperText={
                        touched.currentPassword ? errors.currentPassword : ""
                      }
                      gridColumn="span 4"
                    />

                    <CustomPasswordTextField
                      label="New Password"
                      name="newPassword"
                      onChange={handleChange}
                      error={touched.newPassword && !!errors.newPassword}
                      helperText={touched.newPassword ? errors.newPassword : ""}
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
                        buttonText="Change Password"
                        loadingText="Updating..."
                      />
                      <CustomCancelButton
                        handleCancel={() => {
                          onClose();
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        )}
      </Box>
      <CustomSanckbar
        snackbarOpen={changePassSanckbarOpen}
        snackbarClose={() => {
          setChnagePassSnackbarOpen(false);
          onClose();
        }}
        message="Password changed successfully!!"
      />
    </>
  );
});
