import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import * as React from "react";
import { Bewe } from "../../../../app/models/Bewe";
import { colors } from "../../../../themeConfig";
import { Send } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { useStore } from "../../../../app/stores/Store";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";

const BeweForm = React.lazy(
  () => import("../../../IndexCalculationForms/Bewe/BeweForm")
);

interface Props {
  bewe: Bewe;
  cardId: string;
}

export default observer(function BeweDetails({ bewe, cardId }: Props) {
  const {
    studentExamStore: { commentBeweForm },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentBeweForm(cardId, commnet);
  };

  return (
    <Box>
      <Card
        elevation={3}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" fontWeight={600}>
              BEWE Details
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label="BEWE Result"
              name="beweResult"
              value={bewe.beweResult}
              readOnly
            />
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label="Doctor's Comment"
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={bewe.comment ?? "No comment yet."}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {bewe.comment === null ? "Add Comment" : "Edit Comment"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title="Comment BEWE Form"
        description="Please write your comment about the BEWE form."
        comment={bewe.comment ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
