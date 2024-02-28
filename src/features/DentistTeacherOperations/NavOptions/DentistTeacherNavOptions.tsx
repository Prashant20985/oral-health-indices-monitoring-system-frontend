import {
  ArchiveOutlined,
  BiotechOutlined,
  LocalHospitalOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
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
    {
      title: "Active Patients",
      path: "/active-patients",
      icon: <LocalHospitalOutlined />,
    },
    {
      title: "Archived Patients",
      path: "/archived-patients",
      icon: <ArchiveOutlined />,
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
