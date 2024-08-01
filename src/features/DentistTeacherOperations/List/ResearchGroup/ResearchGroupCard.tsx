import { Avatar, Card, CardHeader, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ResearchGroup } from "../../../../app/models/ResearchGroup";
import { colors } from "../../../../themeConfig";
import { Diversity2 } from "@mui/icons-material";
import ResearchGroupCardActions from "./ResearchGroupCardActions";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {
  researchGroup: ResearchGroup;
}

export default observer(function ResearchGroupList({ researchGroup }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

  return (
    <Card
      elevation={3}
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? color.primary[400] : blueGrey[50],
        padding: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor:
                theme.palette.mode === "dark" ? blueGrey[400] : blueGrey[600],
            }}
            aria-label="group"
          >
            <Diversity2 />
          </Avatar>
        }
        title={researchGroup.groupName}
        subheader={
          <>
            <Typography variant="body2" color="text.secondary">
              {t("dentist-teacher-operations.list.research-group.research-group-card.created-by")+`${researchGroup.createdBy}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            {t("dentist-teacher-operations.list.research-group.research-group-card.number-of-patients")+`${researchGroup.patients.length}`}
            </Typography>
          </>
        }
      />
      <ResearchGroupCardActions researchGroup={researchGroup} />
    </Card>
  );
});
