import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers";
import { Button, useTheme, Typography, Box } from "@mui/material";
import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { colors } from "../../../themeConfig";
import { useTranslation } from "react-i18next";

interface Props {
  setDate: (date: Date | null) => void;
}

/**
 * Calendar component for selecting a date.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {Function} props.setDate - The function to set the selected date.
 * @returns {JSX.Element} The rendered Calendar component.
 */
export default function Calendar({ setDate }: Props) {
  const [value, setValue] = React.useState<Date | null>(null);

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  const handleChange = (newValue: Date | null) => {
    if (newValue) {
      const offset = newValue.getTimezoneOffset();
      const adjustedDate = new Date(newValue.getTime() - offset * 60 * 1000);
      setValue(adjustedDate);
      setDate(adjustedDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb=".5rem"
      >
        <Typography variant="h6" fontWeight={600} textTransform="uppercase">
          {t("common.calendar.choose-date")}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          color="info"
          disabled={value === null}
          onClick={() => {
            setValue(null);
            setDate(null);
          }}
        >
          {t("common.calendar.clear-button")}
        </Button>
      </Box>
      <DateCalendar
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
            backgroundColor: color.blueAccent[600],
          },
          "& .MuiButtonBase-root:hover": {
            backgroundColor: color.grey[600],
          },
          backgroundColor: color.primary[400],
          borderRadius: "6px",
          boxShadow: 5,
        }}
      />
    </LocalizationProvider>
  );
}
