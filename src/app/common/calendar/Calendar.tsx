import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers";
import { useTheme } from "@mui/material";
import * as React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { colors } from "../../../themeConfig";

interface Props {
  setDate: (date: Date) => void;
}

export default function Calendar({ setDate }: Props) {
  const [value, setValue] = React.useState<Date>(new Date());

  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateCalendar
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        value={value}
        onChange={(newValue) => {
          if (newValue) {
            setValue(newValue);
            setDate(newValue);
          }
        }}
        sx={{
          "& .MuiButtonBase-root.Mui-selected": {
            backgroundColor: color.blueAccent[600],
          },
          backgroundColor: color.primary[400],
          borderRadius: "6px",
          boxShadow: 5,
        }}
      />
    </LocalizationProvider>
  );
}
