import { observer } from "mobx-react-lite";
import {
  ArchiveOutlined,
  DeleteSweepOutlined,
  GppBadOutlined,
  GppGoodOutlined,
  LocalHospitalOutlined,
  QuestionAnswerOutlined,
} from "@mui/icons-material";
import SidebarListItem from "../../../app/common/sidebar/SidebarListItem";

interface Props {
  open: boolean;
}

export default observer(function AdminNavOptions({ open }: Props) {
  const options = [
    {
      title: "Active Users",
      path: "active-users",
      icon: <GppGoodOutlined />,
    },
    {
      title: "Deactivated Users",
      path: "deactivated-users",
      icon: <GppBadOutlined />,
    },
    {
      title: "Deleted Users",
      path: "deleted-users",
      icon: <DeleteSweepOutlined />,
    },
    {
      title: "Active Patients",
      path: "active-patients",
      icon: <LocalHospitalOutlined />,
    },
    {
      title: "Archived Patients",
      path: "archived-patients",
      icon: <ArchiveOutlined />,
    },
    {
      title: "User Requests",
      path: "requests",
      icon: <QuestionAnswerOutlined />,
    },
  ];

  return (
    <>
      {options.map((option) => (
        <SidebarListItem
          open={open}
          key={option.path}
          path={`/admin/${option.path}`}
          icon={option.icon}
          text={option.title}
        />
      ))}
    </>
  );
});
