import { observer } from "mobx-react-lite";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useStore } from "../../../app/stores/Store";
import { colors } from "../../../themeConfig";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import LoadingComponent from "../../../app/common/loadingComponents/LoadingComponent";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import { useTranslation } from "react-i18next";

interface Props {
  userName: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Renders a form for deleting a user.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.userName - The username of the user to be deleted.
 * @param {boolean} props.isOpen - Indicates whether the form is open or not.
 * @param {Function} props.onClose - The function to close the form.
 * @returns {JSX.Element} The rendered UserDeleteForm component.
 */
export default observer(function UserDeleteForm({
  userName,
  isOpen,
  onClose,
}: Props) {
  const {
    adminStore: { deleteApplicationUser },
  } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleDelete = async (userName: string, deleteUserComment: string) => {
    await deleteApplicationUser(userName, deleteUserComment);
    setSnackbarOpen(true);
    onClose();
  };

  const [t] = useTranslation("global");

  return (
    <>
      <Dialog
        open={isOpen}
        fullWidth
        onClose={() => onClose()}
        TransitionComponent={SlideUpTransition}
      >
        <Box
          display="flex"
          padding={5}
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%">
            <Formik
              initialValues={{
                userName: userName,
                deleteUserComment: "",
                error: null,
              }}
              onSubmit={async (values, { setErrors }) =>
                await handleDelete(
                  values.userName,
                  values.deleteUserComment
                ).catch((error) => {
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
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                    sx={{ mb: "15px" }}
                    align="left"
                  >
                    {t("admin-operations.forms.user-delete-form.header")} {userName}?
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
                      label={t("admin-operations.forms.user-delete-form.comment")}
                      name="deleteUserComment"
                      required={true}
                      onChange={handleChange}
                      error={
                        touched.deleteUserComment && !!errors.deleteUserComment
                      }
                      helperText={
                        touched.deleteUserComment
                          ? errors.deleteUserComment
                          : ""
                      }
                      gridColumn="span 4"
                    />

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <Button
                        onClick={() => onClose()}
                        variant="contained"
                        sx={{
                          height: "40px",
                          width: "25%",
                          backgroundColor: color.blueAccent[500],
                          "&:hover": {
                            backgroundColor: color.blueAccent[600],
                          },
                        }}
                      >
                        {t("admin-operations.forms.user-delete-form.cancel-button")}
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                          alignItems: "left",
                          height: "40px",
                          width: "25%",
                          backgroundColor: color.redAccent[500],
                          "&:hover": {
                            backgroundColor: color.redAccent[400],
                          },
                        }}
                      >
                        {isSubmitting ? (
                          <LoadingComponent content={t("admin-operations.forms.user-delete-form.delete-loading")} />
                        ) : (
                          <p>{t("admin-operations.forms.user-delete-form.delete-button")}</p>
                        )}
                      </Button>
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
        message={t("admin-operations.forms.user-delete-form.delete-message")}
      />
    </>
  );
});
