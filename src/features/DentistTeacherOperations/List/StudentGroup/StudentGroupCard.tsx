import { observer } from "mobx-react-lite";
import { Group } from "../../../../app/models/Group";
import { Groups3 } from "@mui/icons-material";
import { Card, CardHeader, Avatar, useTheme } from "@mui/material";
import { colors } from "../../../../themeConfig";
import StudentGroupCardActions from "./StudentGroupCardActions";

interface Props {
  group: Group;
}

export default observer(function GroupCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <>
      <Card
        sx={{
          backgroundColor: color.primary[400],
          padding: 1,
          border: 0.1,
          borderColor: theme.palette.mode === "dark" ? color.greenAccent[300] : color.grey[700],
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
              <Groups3 />
            </Avatar>
          }
          title={group.groupName}
          subheader={`Number of Students: ${group.students.length}`}
        />
        <StudentGroupCardActions
          groupId={group.id}
          students={group.students}
          groupName={group.groupName}
        />
      </Card>
    </>
  );
});
