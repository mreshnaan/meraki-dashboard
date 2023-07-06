import {
  MdOutlineSpaceDashboard,
  MdOutlineShoppingBag,
  MdMailOutline,
  MdOutlineFlag,
} from "react-icons/md";

export const items = [
  {
    type: "link",
    label: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
    path: "/dashboard",
  },
  {
    type: "link",
    label: "Events",
    icon: <MdOutlineShoppingBag />,
    path: "/dashboard/events",
  },
  {
    type: "link",
    label: "Tickets",
    icon: <MdMailOutline />,
    path: "/dashboard/tickets",
  },
  {
    type: "link",
    label: "Users",
    icon: <MdOutlineFlag />,
    path: "/dashboard/users",
  },
];
