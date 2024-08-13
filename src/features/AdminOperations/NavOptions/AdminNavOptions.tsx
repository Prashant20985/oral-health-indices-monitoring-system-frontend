import { observer } from "mobx-react-lite";
import {
  ArchiveOutlined,
  DeleteSweepOutlined,
  GppBadOutlined,
  GppGoodOutlined,
  LibraryBooksOutlined,
  LocalHospitalOutlined,
  QuestionAnswerOutlined,
} from "@mui/icons-material";
import SidebarListItem from "../../../app/common/sidebar/SidebarListItem";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
}

/**
 * Renders the navigation options for the admin panel.
 *
 * @param {Props} props - The component props.
 * @param {boolean} props.open - Indicates whether the navigation options are open or closed.
 * @returns {JSX.Element} The rendered component.
 */
export default observer(function AdminNavOptions({ open }: Props) {
  const [t] = useTranslation("global");
  
  const userOptions = [
    {
      title: t("admin-operations.nav-options.active-users"),
      path: "active-users",
      icon: <GppGoodOutlined />,
    },
    {
      title: t("admin-operations.nav-options.deactivated-users"),
      path: "deactivated-users",
      icon: <GppBadOutlined />,
    },
    {
      title: t("admin-operations.nav-options.deleted-users"),
      path: "deleted-users",
      icon: <DeleteSweepOutlined />,
    },
    {
      title: t("admin-operations.nav-options.user-requests"),
      path: "requests",
      icon: <QuestionAnswerOutlined />,
    },
  ];

  const patientOptions = [
    {
      title: t("admin-operations.nav-options.active-patients"),
      path: "active-patients",
      icon: <LocalHospitalOutlined />,
    },
    {
      title: t("admin-operations.nav-options.archived-patients"),
      path: "archived-patients",
      icon: <ArchiveOutlined />,
    },
  ];

  return (
    <>
      <>
        {userOptions.map((option) => (
          <SidebarListItem
            open={open}
            key={option.path}
            path={`/admin/${option.path}`}
            icon={option.icon}
            text={option.title}
          />
        ))}
      </>
      <>
        {patientOptions.map((option) => (
          <SidebarListItem
            open={open}
            key={option.path}
            path={`/${option.path}`}
            icon={option.icon}
            text={option.title}
          />
        ))}
      </>
      <SidebarListItem
        open={open}
        path="/admin/logs"
        icon={<LibraryBooksOutlined />}
        text="Logs"
      />
    </>
  );
});
