import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
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
import { useStore } from "../../../../app/stores/Store";
import CommentStudentExamCardDialog from "../../Forms/CommentStudentExamCardDialog";
import { useTranslation } from "react-i18next";

const BeweForm = React.lazy(
  () => import("../../../IndexCalculationForms/Bewe/BeweForm")
);

interface Props {
  bewe: Bewe;
  cardId: string;
}

/**
 * Renders the details of a practice patient BEWE for a teacher.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Bewe} props.bewe - The BEWE object.
 * @param {string} props.cardId - The card ID.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function PracticePatientBeweDetailsForTeacher({
  bewe,
  cardId,
}: Props) {
  const {
    studentExamStore: { commentBeweForm },
  } = useStore();

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [openCommentDialog, setOpenCommentDialog] = React.useState(false);

  const handleComment = async (commnet: string) => {
    await commentBeweForm(cardId, commnet);
  };

  const [t] = useTranslation("global");

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
              {t(
                "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.title"
              )}
            </Typography>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column" gap={2} mb={2}>
            <TextField
              label={t(
                "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.bewe-result"
              )}
              fullWidth
              name="beweResult"
              color="secondary"
              value={bewe.beweResult}
            />
            <Grid container spacing={2}>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S1"
                  value={bewe.sectant1}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S2"
                  value={bewe.sectant2}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S3"
                  value={bewe.sectant3}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S6"
                  value={bewe.sectant6}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S5"
                  value={bewe.sectant5}
                />
              </Grid>
              <Grid item xs={4} lg={4} md={6}>
                <TextField
                  fullWidth
                  color="secondary"
                  label="S4"
                  value={bewe.sectant4}
                />
              </Grid>
            </Grid>
          </Box>
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              fullWidth
              label={t(
                "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.doctor-comment"
              )}
              name="comment"
              color="secondary"
              multiline
              rows={3}
              inputProps={{ readonly: true }}
              value={
                bewe.comment ??
                t(
                  "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.no-comment"
                )
              }
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                color={theme.palette.mode === "dark" ? "secondary" : "info"}
                variant="outlined"
                size="small"
                onClick={() => setOpenCommentDialog(true)}
                startIcon={<Send />}
              >
                {bewe.comment === null
                  ? t(
                      "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.add-comment"
                    )
                  : t(
                      "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.edit-comment"
                    )}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
      <BeweForm beweAssessmentModel={bewe.assessmentModel} isView />
      <CommentStudentExamCardDialog
        isOpen={openCommentDialog}
        onClose={() => setOpenCommentDialog(false)}
        title={t(
          "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.comment-bewe-form"
        )}
        description={t(
          "student-exam-operations.exam-solution-details-for-teacher.practice-patient-bewe-details-for-teacher.description"
        )}
        comment={bewe.comment ?? ""}
        handleSubmit={handleComment}
      />
    </Box>
  );
});
