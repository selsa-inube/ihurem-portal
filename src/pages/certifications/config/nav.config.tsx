import { MdVpnKey } from "react-icons/md";

const certificationsNavConfig = [
  {
    id: 1,
    label: "Certificaciones",
    icon: <MdVpnKey />,
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/certifications",
        label: "Certificaciones",
        id: "/certifications",
        isActive: true,
      },
    ],
    url: "/certifications",
  },
];

export { certificationsNavConfig };
