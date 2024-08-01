import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Fade,
  Typography,
  useTheme,
} from "@mui/material";
import SlideUpTransition from "../../../../app/common/transition/SlideUpTransition";
import { DoneAll, KeyboardReturn } from "@mui/icons-material";
import { colors } from "../../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ExamSubmitSuccessDialog({ open, onClose }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  const [t] = useTranslation("global");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={SlideUpTransition}
      sx={{
        backdropFilter: "blur(5px)",
        "& .MuiDialog-paper": {
          backgroundColor: color.primary[400],
        },
      }}
    >
      <DialogContent>
        <Box
          display="flex"
          justifyContent="center"
          gap={4}
          flexDirection="column"
          alignItems="center"
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            sx={{
              backgroundColor: color.greenAccent[500],
              height: 120,
              width: 120,
              borderRadius: "50%",
            }}
          >
            <Fade in={open} timeout={2000}>
              <DoneAll sx={{ fontSize: 60, color: "white" }} />
            </Fade>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
              padding: 3,
            }}
          >
            <Typography
              variant="h2"
              align="center"
              fontWeight={500}
              sx={{ textTransform: "uppercase" }}
            >
              {t("student-exam-operations.forms.exam-submit-success-dialog.submitted")}
            </Typography>
            <Typography
              variant="h4"
              align="center"
              fontFamily="monospace"
              fontWeight={400}
              sx={{ textTransform: "uppercase" }}
            >
              {t("student-exam-operations.forms.exam-submit-success-dialog.message")}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="outlined"
          size="small"
          color={theme.palette.mode === "dark" ? "warning" : "info"}
          startIcon={<KeyboardReturn />}
        >
          {t("student-exam-operations.forms.exam-submit-success-dialog.return-to-exam-details")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
