import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import CustomErrorMessage from "../../app/common/formInputs/CustomErrorMessage";
import CustomTextField from "../../app/common/formInputs/CustomTextField";
import { useStore } from "../../app/stores/Store";
import CustomSubmitButton from "../../app/common/formInputs/CustomSubmitButtom";
import { colors } from "../../themeConfig";
import { useTranslation } from "react-i18next";

/**
 * Renders a form for the "Forgot Password" feature.
 *
 * @returns The JSX.Element representing the "Forgot Password" form.
 */
export default observer(function ForgotPassword() {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const {
    userStore: { forgotPassword },
  } = useStore();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(t("forgotpassword.emailIsRequired")),
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
                {t("forgotpassword.header")}
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
                  label={t("forgotpassword.email")}
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
                    buttonText={t("forgotpassword.button")}
                    loadingText={t("forgotpassword.loading")}
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
