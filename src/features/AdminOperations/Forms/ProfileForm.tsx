import { observer } from "mobx-react-lite";
import { Box, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import { Form } from "react-router-dom";
import { useStore } from "../../../app/stores/Store";
import { ApplicationUser } from "../../../app/models/ApplicationUser";
import CustomTextField from "../../../app/common/formInputs/CustomTextField";
import CustomCancelButton from "../../../app/common/formInputs/CustomCancelButton";

interface Props {
  applicationUser: ApplicationUser;
  onClose: () => void;
}

export default observer(function ProfileForm({
  applicationUser,
  onClose,
}: Props) {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    userStore: { user },
  } = useStore();

  return (
    <>
      <Box width="100%">
        <Formik
          initialValues={{ ...applicationUser, error: null }}
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form>
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
                <CustomTextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  readOnly={true}
                  gridColumn="span 2"
                />

                <CustomTextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  readOnly={true}
                  gridColumn="span 2"
                />

                <CustomTextField
                  label="User Name"
                  name="userName"
                  value={values.userName}
                  readOnly={true}
                />

                <CustomTextField
                  label="Role"
                  name="role"
                  value={values.role}
                  readOnly={true}
                />

                <CustomTextField
                  label="Email"
                  name="email"
                  value={values.email}
                  readOnly={true}
                  gridColumn="span 2"
                  type="email"
                />

                <CustomTextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  readOnly={true}
                  gridColumn="span 2"
                />

                {values.userName !== user?.userName && (
                  <>
                    <CustomTextField
                      label="Create Date"
                      name="createdAt"
                      value={values.createdAt.slice(0, 16)}
                      gridColumn="span 2"
                      readOnly={true}
                      type="datetime-local"
                    />
                    {values.guestUserComment !== null && (
                      <CustomTextField
                        label="Comment"
                        name="guestUserComment"
                        value={values.guestUserComment}
                        readOnly={true}
                        gridColumn="span 4"
                      />
                    )}
                  </>
                )}

                {values.deletedAt !== null && (
                  <>
                    <CustomTextField
                      label="Delete Comment"
                      name="deleteUserComment"
                      value={values.deleteUserComment}
                      readOnly={true}
                      gridColumn="span 4"
                    />

                    <CustomTextField
                      label="Delete Date"
                      name="deletedAt"
                      value={values.deletedAt.slice(0, 16)}
                      gridColumn="span 2"
                      readOnly={true}
                      type="datetime-local"
                    />
                  </>
                )}

                <Box
                  display="flex"
                  justifyContent="flex-end"
                  sx={{ gridColumn: "span 4", gap: 2 }}
                >
                  <CustomCancelButton
                    buttonText={"close"}
                    handleCancel={() => {
                      onClose();
                    }}
                  />
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
});
