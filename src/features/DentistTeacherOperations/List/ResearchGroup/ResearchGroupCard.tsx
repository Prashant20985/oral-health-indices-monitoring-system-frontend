import { Avatar, Card, CardHeader, Typography, useTheme } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ResearchGroup } from "../../../../app/models/ResearchGroup";
import { colors } from "../../../../themeConfig";
import { Diversity2 } from "@mui/icons-material";
import ResearchGroupCardActions from "./ResearchGroupCardActions";

interface Props {
  researchGroup: ResearchGroup;
}

export default observer(function ResearchGroupList({ researchGroup }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);
  return (
    <Card
      sx={{
        backgroundColor: color.primary[400],
        border: 1,
        borderColor: color.grey[200],
        padding: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              backgroundColor: color.pinkAccent[400],
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
              {`Created By: ${researchGroup.createdBy}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Number of Patients: ${researchGroup.patients.length}`}
            </Typography>
          </>
        }
      />
      <ResearchGroupCardActions researchGroup={researchGroup} />
    </Card>
  );
});
