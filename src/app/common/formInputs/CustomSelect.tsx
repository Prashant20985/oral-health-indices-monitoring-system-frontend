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

/**
 * CustomSelect component.
 *
 * @template T - The type of the options.
 * @param {Props<T>} props - The component props.
 * @param {string} props.label - The label for the select input.
 * @param {T} props.value - The selected value.
 * @param {T[]} props.options - The available options.
 * @param {(event: React.ChangeEvent<{ value: unknown }>) => void} props.onChange - The event handler for when the value changes.
 * @param {boolean} [props.required=false] - Indicates if the select input is required.
 * @param {boolean} [props.readOnly=false] - Indicates if the select input is read-only.
 * @returns {JSX.Element} The rendered CustomSelect component.
 */
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
