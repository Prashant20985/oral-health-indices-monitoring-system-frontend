import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { Bewe } from "../../../app/models/Bewe";
import BeweUpperMouthInput from "./BeweUpperMouthInput";
import BeweLowerMouthInput from "./BeweLowerMouthInput";

interface Props {
  bewe: Bewe;
  isView?: boolean;
}

export default observer(function BeweForm({ bewe, isView = false }: Props) {
  return (
    <Box mt={3}>
      <Formik
        initialValues={{ ...bewe?.assessmentModel }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={4}
            >
              <BeweUpperMouthInput
                bewe={values}
                handleChange={handleChange}
                isView={isView}
              />
              <BeweLowerMouthInput
                bewe={values}
                handleChange={handleChange}
                isView={isView}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
