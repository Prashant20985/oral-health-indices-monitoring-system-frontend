import { observer } from "mobx-react-lite";
import { StudentGroup } from "../../../../app/models/Group";
import { Groups3 } from "@mui/icons-material";
import { Card, CardHeader, Avatar, useTheme } from "@mui/material";
import { colors } from "../../../../themeConfig";
import StudentGroupCardActions from "./StudentGroupCardActions";
import { blueGrey } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

interface Props {
  group: StudentGroup;
}

/**
 * Renders a card component for a student group.
 *
 * @param {Props} props - The component props.
 * @param {Group} props.group - The group object containing group information.
 * @returns {JSX.Element} The rendered card component.
 */
export default observer(function GroupCard({ group }: Props) {
  const theme = useTheme();
  const color = colors(theme.palette.mode);

  const [t] = useTranslation("global");

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
          subheader={t("dentist-teacher-operations.list.student-group.student-group-card.sub-header")+`${group.students.length}`}
        />
        <StudentGroupCardActions
          group={group}
        />
      </Card>
    </>
  );
});
