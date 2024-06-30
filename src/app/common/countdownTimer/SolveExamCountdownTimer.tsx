import {
  Box,
  CircularProgress,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import * as React from "react";
import { colors } from "../../../themeConfig";

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: colors(theme.palette.mode).greenAccent[400],
  fontFamily: "monospace",
}));

interface Props {
  duration: string;
  onSubmit: () => void;
}

export default function SolveExamCountdownTimer({ duration, onSubmit }: Props) {
  const [timerHours, setTimerHours] = React.useState("00");
  const [timerMinutes, setTimerMinutes] = React.useState("00");
  const [timerSeconds, setTimerSeconds] = React.useState("00");
  const [progress, setProgress] = React.useState(100);

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const interval = React.useRef<NodeJS.Timeout | undefined>();
  const totalDurationInMs = React.useRef<number>(0);

  const startTimer = () => {
    duration = "00:02:00";
    const [hours, minutes, seconds] = duration.split(":").map(Number);
    totalDurationInMs.current =
      hours * 3600000 + minutes * 60000 + seconds * 1000;
    const countDownDate = new Date().getTime() + totalDurationInMs.current;

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        onSubmit();
        clearInterval(interval.current!);
        setProgress(0);
      } else {
        setTimerHours(hours.toString().padStart(2, "0"));
        setTimerMinutes(minutes.toString().padStart(2, "0"));
        setTimerSeconds(seconds.toString().padStart(2, "0"));
        setProgress((distance / totalDurationInMs.current) * 100);
      }
    }, 1000);
  };

  React.useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      display="flex"
      gap={3}
      sx={{
        boxShadow: 2,
        backgroundColor: color.primary[400],
        borderRadius: 2,
        padding: 3,
      }}
    >
      <Stack direction="row" spacing={1.5}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledTypography variant="h3">{timerHours}</StyledTypography>
          <Typography>Hours</Typography>
        </Box>
        <StyledTypography variant="h3">:</StyledTypography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledTypography variant="h3">{timerMinutes}</StyledTypography>
          <Typography>Minutes</Typography>
        </Box>
        <StyledTypography variant="h3">:</StyledTypography>
        <Box display="flex" flexDirection="column" alignItems="center">
          <StyledTypography variant="h3">{timerSeconds}</StyledTypography>
          <Typography>Seconds</Typography>
        </Box>
      </Stack>
      <CircularProgress
        variant="determinate"
        value={progress}
        color={progress < 30 ? "error" : progress < 50 ? "warning" : "info"}
        thickness={5}
      />
    </Box>
  );
}
