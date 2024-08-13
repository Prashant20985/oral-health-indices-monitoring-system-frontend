import React from "react";
import { TextField, Grid } from "@mui/material";

interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
}

/**
 * DurationPicker component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.name - The name of the input.
 * @param {string} props.value - The value of the input.
 * @param {Function} props.onChange - The function to handle input changes.
 * @param {Function} props.onBlur - The function to handle the blur event.
 * @param {boolean} [props.error] - The error message for the input.
 * @param {string} [props.helperText] - The helper text for the input.
 * @returns {JSX.Element} The rendered DurationPicker component.
 */
export default function DurationPicker({
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: Props) {
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
}
