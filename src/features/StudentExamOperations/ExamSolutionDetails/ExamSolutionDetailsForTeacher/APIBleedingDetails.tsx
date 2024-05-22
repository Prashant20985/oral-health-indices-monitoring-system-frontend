import { observer } from "mobx-react-lite";
import { APIBleeding } from "../../../../app/models/APIBleeding";
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
import * as React from "react";
import CustomTextField from "../../../../app/common/formInputs/CustomTextField";
import { colors } from "../../../../themeConfig";
import { blueGrey } from "@mui/material/colors";
import { Send } from "@mui/icons-material";
import { useStore } from "../../../../app/stores/Store";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";

const APIBleedingForm = React.lazy(
  () => import("../../../IndexCalculationForms/APIBleeding/APIBleedingForm")
);

interface Props {
  apiBleeding: APIBleeding;
  cardId: string;
}

export default observer(function APIBleedingDetails({
  apiBleeding,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentAPIBleedingForm },
  } = useStore();
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentAPIBleedingForm(cardId, commnet);
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
              API Bleeding Details
            </Typography>
          }
        />

        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <CustomTextField
              variant="outlined"
              label="API Result"
              name="apiResult"
              value={apiBleeding.apiResult}
              readOnly
            />
            <CustomTextField
              variant="outlined"
              label="Bleeding Result"
              name="bleedingResult"
              value={apiBleeding.bleedingResult}
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
              value={apiBleeding.comments ?? "No comment yet."}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {apiBleeding.comments === null ? "Add Comment" : "Edit Comment"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <APIBleedingForm apiBleeding={apiBleeding} isView />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title="Comment API Bleeding Form"
        description="Please write your comment about the API Bleeding form."
        comment={apiBleeding.comments ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
