import {
  ArchiveOutlined,
  Assignment,
  BiotechOutlined,
  Groups3,
  LocalHospitalOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import SidebarListItem from "../../../app/common/sidebar/SidebarListItem";
import { useStore } from "../../../app/stores/Store";

interface Props {
  open: boolean;
}

export default observer(function DentistTeacherNavOptions({ open }: Props) {
  const {
    userStore: { user },
  } = useStore();
  const options = [
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
    ...(user?.role === "Dentist_Teacher_Examiner"
      ? [
          {
            title: "Student Groups",
            path: "/student-groups",
            icon: <Groups3 />,
          },
        ]
      : []),
    ...(user?.role === "Dentist_Teacher_Researcher"
      ? [
          {
            title: "Research Groups",
            path: "/research-groups",
            icon: <BiotechOutlined />,
          },
        ]
      : []),
    {
      title: "Supervised Students",
      path: "/supervised-students",
      icon: <SchoolOutlined />,
    },
    {
      title: "Assigned Cards",
      path: "/assigned-cards",
      icon: <Assignment />,
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
