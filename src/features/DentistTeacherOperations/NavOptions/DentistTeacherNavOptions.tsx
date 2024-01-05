import { BiotechOutlined, SchoolOutlined } from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import SidebarListItem from "../../../app/common/sidebar/SidebarListItem";

interface Props {
  open: boolean;
}

export default observer(function DentistTeacherNavOptions({ open }: Props) {
  const options = [
    {
      title: "Research Groups",
      path: "/research-groups",
      icon: <BiotechOutlined />,
    },
    {
      title: "Student Groups",
      path: "/student-groups",
      icon: <SchoolOutlined />,
    },
  ];

  return (
    <>
      {options.map((option) => (
        <SidebarListItem
          open={open}
          key={option.path}
          path={option.path}
          icon={option.icon}
          text={option.title}
        />
      ))}
    </>
  );
});
