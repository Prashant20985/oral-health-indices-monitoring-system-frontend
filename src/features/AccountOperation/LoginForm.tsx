import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { colors } from "../../themeConfig";
import { useStore } from "../../app/stores/Store";
import * as React from "react";
import { router } from "../../app/router/Routes";
import { LoginFormValues } from "../../app/models/User";
import { Form, Formik } from "formik";
import CustomTextField from "../../app/common/formInputs/CustomTextField";
import CustomPasswordTextField from "../../app/common/formInputs/CustomPassowrdTextField";
import CustomErrorMessage from "../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../app/common/formInputs/CustomSubmitButtom";

export default observer(function LoginForm() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { userStore } = useStore();
  const { isUserLoggedIn, login } = userStore;

  React.useEffect(() => {
    if (isUserLoggedIn) {
      router.navigate("/");
    }
  }, [isUserLoggedIn]);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
      }}
    >
      <Box width="30rem">
        <Formik
          initialValues={{ ...initialValues, error: null }}
          onSubmit={async (values, { setErrors }) =>
            await login(values).catch((error) => {
              setErrors({ error: error.response.data });
            })
          }
        >
          {({ errors, handleChange, handleSubmit, isSubmitting, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Typography
                variant="h3"
                color={color.grey[100]}
                fontWeight="bold"
                sx={{ mb: "10px" }}
                align="left"
              >
                Login
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
                  label="Email or User Name"
                  name="email"
                  required={true}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email ? errors.email : ""}
                  gridColumn="span 4"
                  type="text"
                />

                <CustomPasswordTextField
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ""}
                  gridColumn="span 4"
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="success" />}
                  label="Remember me"
                  color="primary"
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>

              <CustomErrorMessage error={errors.error} />

              <Box sx={{ gridColumn: "span 4" }}>
                <CustomSubmitButton
                  isSubmitting={isSubmitting}
                  fullwidth={true}
                  width="100%"
                  buttonText="Login"
                  loadingText="Logging in..."
                />
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
});
