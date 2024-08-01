import {
  ArchiveOutlined,
  LocalHospitalOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import { observer } from "mobx-react-lite";
import SidebarListItem from "../../../app/common/sidebar/SidebarListItem";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
}

export default observer(function StudentNavOptions({ open }: Props) {
  const [t] = useTranslation("global");
  const options = [
    {
      title: t("student-operations.nav-options.my-groups"),
      path: "/my-groups",
      icon: <SchoolOutlined />,
    },
    {
      title: t("student-operations.nav-options.active-patients"),
      path: "/active-patients",
      icon: <LocalHospitalOutlined />,
    },
    {
      title: t("student-operations.nav-options.archived-patients"),
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
