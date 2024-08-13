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
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
}

/**
 * Renders the navigation options for the DentistTeacherNavOptions component.
 *
 * @param {Props} open - Indicates whether the navigation options are open or not.
 * @returns {JSX.Element} The rendered navigation options.
 */
export default observer(function DentistTeacherNavOptions({ open }: Props) {
  const {
    userStore: { user },
  } = useStore();

  const [t] = useTranslation("global");
  
  const options = [
    {
      title: t("dentist-teacher-operations.nav-options.active-patients"),
      path: "/active-patients",
      icon: <LocalHospitalOutlined />,
    },
    {
      title: t("dentist-teacher-operations.nav-options.archived-patients"),
      path: "/archived-patients",
      icon: <ArchiveOutlined />,
    },
    ...(user?.role === "Dentist_Teacher_Examiner"
      ? [
          {
            title: t("dentist-teacher-operations.nav-options.student-groups"),
            path: "/student-groups",
            icon: <Groups3 />,
          },
        ]
      : []),
    ...(user?.role === "Dentist_Teacher_Researcher"
      ? [
          {
            title: t("dentist-teacher-operations.nav-options.research-groups"),
            path: "/research-groups",
            icon: <BiotechOutlined />,
          },
        ]
      : []),
    {
      title: t("dentist-teacher-operations.nav-options.supervised-students"),
      path: "/supervised-students",
      icon: <SchoolOutlined />,
    },
    {
      title: t("dentist-teacher-operations.nav-options.assigned-cards"),
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
