import { observer } from "mobx-react-lite";
import { Box, Dialog, Typography } from "@mui/material";
import SlideUpTransition from "../../../app/common/transition/SlideUpTransition";
import { Form, Formik } from "formik";
import { useStore } from "../../../app/stores/Store";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomErrorMessage from "../../../app/common/formInputs/CustomErrorMessage";
import CustomSubmitButton from "../../../app/common/formInputs/CustomSubmitButtom";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";
import CustomSanckbar from "../../../app/common/snackbar/CustomSnackbar";
import * as React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  name: string;
}

export default observer(function EditGroupForm({
  isOpen,
  onClose,
  groupId,
  name,
}: Props) {
  const { dentistTeacherStore } = useStore();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSubmit = async (groupName: string) => {
    await dentistTeacherStore.updateGroupName(groupId, groupName).then(() => {
      onClose();
      setSnackbarOpen(true);
    });
  };

  return (
    <>
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
                groupName: "",
                error: null,
              }}
              onSubmit={async (values, { setErrors }) =>
                await handleSubmit(values.groupName).catch((error) => {
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
                    {`Edit Group: ${name}`}
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
                      label="Group Name"
                      name="groupName"
                      required={true}
                      onChange={handleChange}
                      error={touched.groupName && !!errors.groupName}
                      helperText={touched.groupName ? errors.groupName : ""}
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
                        buttonText="Save"
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
        message="Group Name updated successfully!!"
      />
    </>
  );
});
