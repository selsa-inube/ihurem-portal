import { MdVpnKey } from "react-icons/md";

const holidaysNavConfig = [
  {
    id: 1,
    label: "Vacaciones",
    icon: <MdVpnKey />,
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/holidays",
        label: "Vacaciones",
        id: "/holidays",
        isActive: true,
      },
    ],
    url: "/",
  },
];

export { holidaysNavConfig };
