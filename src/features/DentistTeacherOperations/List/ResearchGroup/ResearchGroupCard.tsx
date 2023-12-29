import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
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
        padding: 1,
        border: 0.1,
        borderColor:
          theme.palette.mode === "dark"
            ? color.greenAccent[300]
            : color.grey[700],
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
        subheader={`Number of Patients: ${researchGroup.patients.length}`}
      />
      <CardContent
        sx={{
          height: "5rem",
          overflow: "auto",
          borderBottom: "1px solid",
          mb: 0.5,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {researchGroup.description}
        </Typography>
      </CardContent>
      <ResearchGroupCardActions researchGroup={researchGroup} />
    </Card>
  );
});
