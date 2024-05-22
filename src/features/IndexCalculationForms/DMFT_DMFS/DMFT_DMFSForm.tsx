import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { Form, Formik } from "formik";
import { DMFT_DMFS } from "../../../app/models/DMFT_DMFS";
import DMFT_DMFSUpperMouthInput from "./DMFT_DMFSUpperMouthInput";
import DMFT_DMFSExtraToothInput from "./DMFT_DMFSExtraToothInput";
import DMFT_DMFSLowerMouthInput from "./DMFT_DMFSLowerMouthInput";

interface Props {
  dmft_dmfs: DMFT_DMFS;
  isView?: boolean;
}

export default observer(function DMFT_DMFSForm({
  dmft_dmfs,
  isView = false,
}: Props) {
  return (
    <Box mt={3}>
      <Formik
        initialValues={{ ...dmft_dmfs?.assessmentModel }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <DMFT_DMFSUpperMouthInput
                upperMouth={values.upperMouth}
                isViewMode={isView}
                handleChange={handleChange}
              />
              <DMFT_DMFSExtraToothInput
                upperMouth={values.upperMouth}
                lowerMouth={values.lowerMouth}
                isView={isView}
              />
              <DMFT_DMFSLowerMouthInput
                lowerMouth={values.lowerMouth}
                isView={isView}
                handleChange={handleChange}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
});
