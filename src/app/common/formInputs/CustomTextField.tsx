import { TextField, useTheme } from "@mui/material";
import { colors } from "../../../themeConfig";

interface Props {
  label: string;
  name: string;
  value?: string | number;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  gridColumn?: string;
  type?: string;
  variant?: "filled" | "outlined";
}

/**
 * CustomTextField component.
 *
 * @component
 * @param {Props} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {string} props.name - The name of the text field.
 * @param {string} props.value - The value of the text field.
 * @param {Function} props.onChange - The function to handle the change event of the text field.
 * @param {boolean} props.error - Indicates if there is an error in the text field.
 * @param {string} props.helperText - The helper text to display below the text field.
 * @param {boolean} [props.required=false] - Indicates if the text field is required.
 * @param {string} [props.gridColumn="span 1"] - The CSS grid column property for the text field.
 * @param {string} [props.type="text"] - The type of the text field.
 * @param {boolean} [props.readOnly=false] - Indicates if the text field is read-only.
 * @param {string} [props.variant="filled"] - The variant of the text field.
 * @returns {JSX.Element} The rendered CustomTextField component.
 */
export default function CustomTextField({
  label,
  name,
  value,
  onChange,
  error,
  helperText,
  required = false,
  gridColumn = "span 1",
  type = "text",
  readOnly = false,
  variant = "filled",
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <TextField
      id={name}
      color="secondary"
      type={type}
      label={label}
      variant={variant}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      InputProps={{
        readOnly: readOnly,
      }}
      sx={{
        gridColumn: gridColumn,
        color: color.grey[100],
      }}
      error={error}
      helperText={helperText}
    />
  );
}
