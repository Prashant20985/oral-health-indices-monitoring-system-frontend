import { observer } from "mobx-react-lite";
import {
  Box,
  useTheme,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import Header from "../../../app/common/header/Header";
import { colors } from "../../../themeConfig";
import { APIBleedingAssessmentModel } from "../../../app/models/APIBleeding";

interface Props {
  apiBleedingAssessmentModel: APIBleedingAssessmentModel;
  isView?: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const StyledTextField = styled(TextField)(() => ({
  ".MuiInputBase-input": {
    textAlign: "center",
    fontSize: "1rem",
  },
}));

export default observer(function APIBleedingForm({
  apiBleedingAssessmentModel,
  isView = false,
  handleChange,
  name,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Box>
      <Box display="inline-flex" flexDirection="column" gap={2} mt={2} p={2}>
        {/* Quadrant 1 */}
        <Box component={Stack} direction="row" spacing={1}>
          <Box display="inline-flex" flexDirection="column" gap={1}>
            <Header title="Quadrant 1" />
            <Box component={Stack} direction="row" spacing={1}>
              <Box>
                <StyledTextField
                  value={"+/-"}
                  InputProps={{
                    readOnly: true,
                  }}
                  color={
                    theme.palette.mode === "dark" ? "secondary" : "primary"
                  }
                />
                <Box mt={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    textAlign="center"
                  >
                    Interdental space
                  </Typography>
                </Box>
              </Box>
              {[7, 6, 5, 4, 3, 2, 1].map((value) => (
                <Box>
                  <StyledTextField
                    variant="outlined"
                    inputProps={{ maxLength: 1 }}
                    name={
                      name !== undefined
                        ? `${name}.quadrant1.value${value}`
                        : `quadrant1.value${value}`
                    }
                    value={
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (apiBleedingAssessmentModel.quadrant1 as any)[
                        `value${value}`
                      ]
                    }
                    onChange={handleChange}
                    color={
                      theme.palette.mode === "dark" ? "secondary" : "primary"
                    }
                    InputProps={{
                      readOnly: isView,
                    }}
                  />
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          {/* Quadrant 2 */}
          <Box display="inline-flex" flexDirection="column" gap={1}>
            <Box display="flex" justifyContent="flex-end" mb={1}>
              <Header title="Quadrant 2" />
            </Box>
            <Box component={Stack} direction="row" spacing={1}>
              <Box>
                <StyledTextField
                  disabled
                  sx={{ backgroundColor: color.grey[400] }}
                />
              </Box>
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <Box>
                  <StyledTextField
                    variant="outlined"
                    inputProps={{ maxLength: 1 }}
                    name={
                      name !== undefined
                        ? `${name}.quadrant2.value${value}`
                        : `quadrant2.value${value}`
                    }
                    value={
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (apiBleedingAssessmentModel.quadrant2 as any)[
                        `value${value}`
                      ]
                    }
                    onChange={handleChange}
                    InputProps={{
                      readOnly: isView,
                    }}
                    color={
                      theme.palette.mode === "dark" ? "secondary" : "primary"
                    }
                  />
                  <Box mt={2}>
                    <Typography variant="h6" fontWeight={600}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        {/* Quadrant 4 */}
        <Box component={Stack} direction="row" spacing={1}>
          <Box display="inline-flex" flexDirection="column" gap={1}>
            <Box component={Stack} direction="row" spacing={1}>
              <StyledTextField
                value={"+/-"}
                InputProps={{
                  readOnly: true,
                }}
                color={theme.palette.mode === "dark" ? "secondary" : "primary"}
              />
              {[7, 6, 5, 4, 3, 2, 1].map((value) => (
                <StyledTextField
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                  name={
                    name !== undefined
                      ? `${name}.quadrant4.value${value}`
                      : `quadrant4.value${value}`
                  }
                  value={
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (apiBleedingAssessmentModel.quadrant4 as any)[
                      `value${value}`
                    ]
                  }
                  onChange={handleChange}
                  InputProps={{
                    readOnly: isView,
                  }}
                  color={
                    theme.palette.mode === "dark" ? "secondary" : "primary"
                  }
                />
              ))}
              <StyledTextField
                disabled
                sx={{ backgroundColor: color.grey[400] }}
              />
            </Box>
            <Header title="Quadrant 4" />
          </Box>
          {/* Quadrant 3 */}
          <Box display="inline-flex" flexDirection="column" gap={1}>
            <Box component={Stack} direction="row" spacing={1}>
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <StyledTextField
                  variant="outlined"
                  inputProps={{ maxLength: 1 }}
                  name={
                    name !== undefined
                      ? `${name}.quadrant3.value${value}`
                      : `quadrant3.value${value}`
                  }
                  value={
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (apiBleedingAssessmentModel.quadrant3 as any)[
                      `value${value}`
                    ]
                  }
                  onChange={handleChange}
                  InputProps={{
                    readOnly: isView,
                  }}
                  color={
                    theme.palette.mode === "dark" ? "secondary" : "primary"
                  }
                />
              ))}
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Header title="Quadrant 3" />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});
