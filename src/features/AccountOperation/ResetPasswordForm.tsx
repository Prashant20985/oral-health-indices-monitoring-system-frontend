import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { router } from "../../app/router/Routes";
import CustomErrorMessage from "../../app/common/formInputs/CustomErrorMessage";
import CustomPasswordTextField from "../../app/common/formInputs/CustomPassowrdTextField";
import CustomTextField from "../../app/common/formInputs/CustomTextField";
import { useStore } from "../../app/stores/Store";
import CustomSubmitButton from "../../app/common/formInputs/CustomSubmitButtom";
import { colors } from "../../themeConfig";
import * as React from "react";
import { useTranslation } from "react-i18next";

/**
 * Component for resetting password.
 *
 * @component
 * @example
 * ```tsx
 * <ResetPassword />
 * ```
 */
export default observer(function ResetPassword() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const { userStore } = useStore();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [t] = useTranslation("global");

  const validationSchema = Yup.object().shape({
    password: Yup.string().required(t("resetpassword.password-is-required")),
    confirmPassword: Yup.string()
      .required(t("resetpassword.confirm-password-is-required"))
      .test("passwords-match", t("resetpassword.passwords-match"), function (value) {
        return value === this.parent.password;
      }),
  });

  React.useEffect(() => {
    if (!email || !token) {
      router.navigate("/");
    }
  }, [token, email]);

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
          initialValues={{
            token: token,
            email: email,
            password: "",
            confirmPassword: "",
            error: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setErrors }) =>
            userStore.resetPassword(values).catch((error) => {
              console.log(error);
              setErrors({ error: error.response.data });
            })
          }
        >
          {({ handleSubmit, isSubmitting, errors, handleChange, touched }) => (
            <Form onSubmit={handleSubmit}>
              <Typography
                variant="h5"
                color={color.grey[100]}
                fontWeight="bold"
                sx={{ mb: "20px" }}
                align="left"
              >
                {t("resetpassword.header")} {email}
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
                  label={t("resetpassword.password")}
                  name="password"
                  onChange={handleChange}
                  error={touched.password && !!errors.password}
                  helperText={touched.password ? errors.password : ""}
                  required={true}
                  gridColumn="span 4"
                  type="text"
                />

                <CustomPasswordTextField
                  label={t("resetpassword.confirmPassword")}
                  name="confirmPassword"
                  onChange={handleChange}
                  error={touched.confirmPassword && !!errors.confirmPassword}
                  helperText={
                    touched.confirmPassword ? errors.confirmPassword : ""
                  }
                  gridColumn="span 4"
                />

                <CustomErrorMessage error={errors.error} />

                <Box sx={{ gridColumn: "span 4" }}>
                  <CustomSubmitButton
                    isSubmitting={isSubmitting}
                    fullwidth={true}
                    width="100%"
                    buttonText={t("resetpassword.button")}
                    loadingText={t("resetpassword.buttonLoading")}
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
