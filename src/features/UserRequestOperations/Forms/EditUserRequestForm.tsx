import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/Store";
import { Box, Dialog, TextField, Typography, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";
import * as React from "react";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userRequestId: string;
  requestTitle: string;
  description: string;
}

export default observer(function EditUserRequestForm({
  isOpen,
  onClose,
  userRequestId,
  requestTitle,
  description,
}: Props) {
  const {
    userRequestStore: { updateUserRequest },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handelSubmit = async (
    userRequestId: string,
    requestTitle: string,
    description: string
  ) => {
    await updateUserRequest(userRequestId, requestTitle, description).then(
      () => {
        onClose();
        setSnackbarOpen(true);
      }
    );
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
                userRequestId: userRequestId,
                requestTitle: requestTitle,
                description: description,
                error: null,
              }}
              onSubmit={async (values, { setErrors }) =>
                await handelSubmit(
                  values.userRequestId,
                  values.requestTitle,
                  values.description
                ).catch((error) => {
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
                    variant="h5"
                    color="text.primary"
                    fontWeight="bold"
                    sx={{ mb: "15px" }}
                    align="left"
                  >
                    Edit Request
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
                      value={values.requestTitle}
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
                      value={values.description}
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
                        buttonText="Update"
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
        message="Request Updated successfully!!"
      />
    </Box>
  );
});
