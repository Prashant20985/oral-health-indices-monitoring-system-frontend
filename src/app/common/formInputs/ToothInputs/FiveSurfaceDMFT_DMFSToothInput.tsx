import { Box, Paper, Typography, useTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import * as React from "react";
import { FiveSurfaceToothDMFT_DMFS } from "../../../models/Tooth";
import { colors } from "../../../../themeConfig";
import ToothSurfaceInputBase from "./ToothSurfaceInputBase";

interface Props {
  surfaces: FiveSurfaceToothDMFT_DMFS;
  toothNumber: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  readOnly?: boolean;
  name: string;
}

/**
 * Represents a component for a tooth input with five surfaces (DMFT/DMFS).
 *
 * @component
 * @param {Props} props - The component props.
 * @param {object} props.surfaces - The surfaces object containing values for each surface.
 * @param {string} props.toothNumber - The tooth number.
 * @param {function} props.onChange - The function to handle changes in the input.
 * @param {string} [props.placeholder=""] - The placeholder text for the input.
 * @param {string} props.error - The error message, if any.
 * @param {boolean} props.readOnly - Specifies if the input is read-only.
 * @param {string} props.name - The name of the input.
 * @returns {JSX.Element} The rendered ToothInput component.
 */
export default React.memo(function FiveSurfaceDMFT_DMFSToothInput({
  surfaces,
  toothNumber,
  onChange,
  placeholder = "",
  error,
  readOnly,
  name,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box display="inline-flex" flexDirection="column">
      <Box
        component={Paper}
        display="inline-flex"
        flexDirection="column"
        gap={0.5}
        alignItems="center"
        p={0.5}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? color.primary[500] : blueGrey[100],
        }}
      >
        <ToothSurfaceInputBase
          value={surfaces.r}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          name={name.concat(".r")}
          readOnly={readOnly}
        />
        <ToothSurfaceInputBase
          value={surfaces.b}
          name={name.concat(".b")}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          readOnly={readOnly}
        />
        <Box display="flex" gap={0.5}>
          <ToothSurfaceInputBase
            value={surfaces.d}
            name={name.concat(".d")}
            placeholder={placeholder}
            error={error}
            onChange={onChange}
            readOnly={readOnly}
          />
          <ToothSurfaceInputBase disabled name="" />
          <ToothSurfaceInputBase
            value={surfaces.m}
            name={name.concat(".m")}
            placeholder={placeholder}
            error={error}
            onChange={onChange}
            readOnly={readOnly}
          />
        </Box>
        <ToothSurfaceInputBase
          value={surfaces.l}
          name={name.concat(".l")}
          placeholder={placeholder}
          error={error}
          onChange={onChange}
          readOnly={readOnly}
        />
        <Box
          mt={1}
          width="100%"
          borderRadius={1}
          border={`0.5px solid ${theme.palette.grey[600]}`}
        >
          <Typography variant="h6" fontWeight={600} textAlign="center">
            {toothNumber.split("_")[1]}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});
