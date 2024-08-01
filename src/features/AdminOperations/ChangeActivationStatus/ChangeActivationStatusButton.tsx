import { Button, Tooltip, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { colors } from "../../../themeConfig";
import { DeleteSweep, GppGood, GppBad } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface Props {
  isAccountActive: boolean;
  deletedAt: string;
  disabled?: boolean;
  handleChangeActivationStatus: () => void;
}

export default observer(function ChangeActivationStatusButton({
  isAccountActive,
  deletedAt,
  disabled = false,
  handleChangeActivationStatus,
}: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Tooltip title={!disabled ? t("admin-operations.dashboard.activation-status.header") : ""}>
      <Button
        disabled={disabled}
        onClick={() => {
          handleChangeActivationStatus();
        }}
        sx={{
          width: "100%",
          backgroundColor:
            deletedAt !== null
              ? color.pinkAccent[600]
              : isAccountActive
              ? color.greenAccent[600]
              : color.orangeAccent[600],
          "&:hover": {
            backgroundColor: isAccountActive
              ? color.greenAccent[500]
              : color.orangeAccent[500],
          },
        }}
      >
        {deletedAt !== null ? (
          <DeleteSweep color="primary" />
        ) : isAccountActive ? (
          <GppGood color="primary" />
        ) : (
          <GppBad color="primary" />
        )}
      </Button>
    </Tooltip>
  );
});
