import { observer } from "mobx-react-lite";
import { Group } from "../../../../app/models/Group";
import { Groups3 } from "@mui/icons-material";
import { Card, CardHeader, Avatar, useTheme } from "@mui/material";
import { colors } from "../../../../themeConfig";
import StudentGroupCardActions from "./StudentGroupCardActions";
import { blueGrey } from "@mui/material/colors";

interface Props {
  group: Group;
}

export default observer(function GroupCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  return (
    <>
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
