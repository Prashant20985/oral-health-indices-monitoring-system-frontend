import {
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { colors } from "../../../themeConfig";

export interface Props<T> {
  label: string;
  value: T | "";
  options: T[];
  readOnly?: boolean;
  required?: boolean;
  onChange: (event: SelectChangeEvent<T>) => void;
}

export default function CustomSelect<T>({
  label,
  value,
  options,
  onChange,
  required = false,
  readOnly = false,
}: Props<T>) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <>
      <InputLabel
        id={`${label.toLowerCase()}-label`}
        color="secondary"
        variant="filled"
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label.toLowerCase()}-label`}
        id={`${label.toLowerCase()}-select`}
        color="secondary"
        value={value}
        variant="filled"
        label={label}
        onChange={onChange}
        required={required}
        inputProps={{
          readOnly: readOnly,
        }}
        sx={{
          color: color.grey[100],
        }}
      >
        {options.map((option) =>
          option !== null ? (
            <MenuItem key={option as string} value={option as string}>
              {option as string}
            </MenuItem>
          ) : null
        )}
      </Select>
    </>
  );
}
