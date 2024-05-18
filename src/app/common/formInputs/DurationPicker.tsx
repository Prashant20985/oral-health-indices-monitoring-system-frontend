import React from "react";
import { TextField, Grid } from "@mui/material";

interface DurationPickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const [hours, minutes, seconds] = (value || "00:00:00")
    .split(":")
    .map(Number);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const handleFieldChange = (field: string, val: string) => {
    const [h, m, s] = value.split(":").map(Number);
    const newValue = {
      hours: field === "hours" ? val : h,
      minutes: field === "minutes" ? val : m,
      seconds: field === "seconds" ? val : s,
    };
    onChange({
      target: {
        name,
        value: `${padZero(Number(newValue.hours))}:${padZero(
          Number(newValue.minutes)
        )}:${padZero(Number(newValue.seconds))}`,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField
          label="Hours"
          type="number"
          inputProps={{ min: 0 }}
          name={`${name}.hours`}
          value={hours || ""}
          onChange={(e) => handleFieldChange("hours", e.target.value)}
          onBlur={onBlur}
          error={error}
          helperText={error ? helperText : ""}
          fullWidth
          variant="filled"
          color="secondary"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Minutes"
          type="number"
          inputProps={{ min: 0, max: 59 }}
          name={`${name}.minutes`}
          value={minutes || ""}
          onChange={(e) => handleFieldChange("minutes", e.target.value)}
          onBlur={onBlur}
          error={error}
          helperText={error ? helperText : ""}
          fullWidth
          variant="filled"
          color="secondary"
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Seconds"
          type="number"
          inputProps={{ min: 0, max: 59 }}
          name={`${name}.seconds`}
          value={seconds || ""}
          onChange={(e) => handleFieldChange("seconds", e.target.value)}
          onBlur={onBlur}
          error={error}
          helperText={error ? helperText : ""}
          fullWidth
          variant="filled"
          color="secondary"
        />
      </Grid>
    </Grid>
  );
};

export default DurationPicker;
