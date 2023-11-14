import { observer } from "mobx-react-lite";
import { Box, Dialog, TextField, Typography, useTheme } from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import { useStore } from "../../../app/stores/Store";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import * as React from "react";
import { colors } from "../../../themeConfig";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default observer(function AddUserRequestForm({
  isOpen,
  onClose,
}: Props) {
  const { userRequestStore } = useStore();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const handelSubmit = async (requestTitle: string, description: string) => {
    await userRequestStore.createRequest(requestTitle, description).then(() => {
      onClose();
      setSnackbarOpen(true);
    });
  };
  
  return (
    <Box>
      <Dialog
        open={isOpen}
        fullWidth
        TransitionComponent={SlideUpTransition}
        onClose={() => onClose()}
      >
        <Box
          display="flex"
          padding={3}
          alignItems="center"
          justifyContent="center"
        >
          <Box width="100%">
            <Formik
              initialValues={{
                requestTitle: "",
                description: "",
                error: null,
              }}
              onSubmit={async (values, { setErrors }) =>
                await handelSubmit(
                  values.requestTitle,
                  values.description
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
                    New Request
                  </Typography>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: "span 4",
                      },
                    }}
                  >
                    <CustomTextField
                      label="Request Title"
                      name="requestTitle"
                      required={true}
                      onChange={handleChange}
                      error={touched.requestTitle && !!errors.requestTitle}
                      helperText={
                        touched.requestTitle ? errors.requestTitle : ""
                      }
                      gridColumn="span 4"
                    />

                    <TextField
                      label="Description"
                      name="description"
                      onChange={handleChange}
                      error={touched.description && !!errors.description}
                      helperText={touched.description ? errors.description : ""}
                      sx={{
                        gridColumn: "span 4",
                        color: color.grey[100],
                      }}
                      multiline
                      rows={4}
                      variant="filled"
                      color="secondary"
                    />

                    <CustomErrorMessage error={errors.error} />

                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      sx={{ gridColumn: "span 4", gap: 2 }}
                    >
                      <CustomSubmitButton
                        isSubmitting={isSubmitting}
                        buttonText="Add"
                      />
                      <CustomCancelButton handleCancel={() => onClose()} />
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
        message="Group Created successfully!!"
      />
    </Box>
  );
});
