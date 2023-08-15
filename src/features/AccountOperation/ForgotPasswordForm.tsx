import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import CustomErrorMessage from "../../app/common/formInputs/CustomErrorMessage";
import CustomTextField from "../../app/common/formInputs/CustomTextField";
import { useStore } from "../../app/stores/Store";
import CustomSubmitButton from "../../app/common/formInputs/CustomSubmitButtom";
import { colors } from "../../themeConfig";

export default observer(function ForgotPassword() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const {
    userStore: { forgotPassword },
  } = useStore();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "75vh",
        margin: 0,
      }}
    >
      <Box width="30rem" mt="10rem">
        <Formik
          initialValues={{ email: "", error: null }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) =>
            forgotPassword(values.email).catch((error) => {
              setErrors({ error: error.response.data });
            })
          }
        >
          {({ handleSubmit, isSubmitting, errors, touched, handleChange }) => (
            <Form onSubmit={handleSubmit}>
              <Typography
                variant="h5"
                color={color.grey[100]}
                fontWeight="bold"
                sx={{ mb: "20px" }}
                align="left"
              >
                Enter the email address associated with your account and we'll
                send you a link to reset your password
              </Typography>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
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

                <CustomErrorMessage error={errors.error} />

                <Box sx={{ gridColumn: "span 4" }}>
                  <CustomSubmitButton
                    isSubmitting={isSubmitting}
                    fullwidth={true}
                    width="100%"
                    buttonText="Send Email"
                    loadingText="Sending Email..."
                  />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
});
