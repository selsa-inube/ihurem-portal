import {
  MdLogout,
  MdOutlinePersonOff,
  MdAttachFile,
  MdOutlineBeachAccess,
  MdOutlinePersonalInjury,
} from "react-icons/md";

import { INav } from "@components/layout/AppPage/types";

const nav: INav = {
  title: "MENU",
  sections: {
    administrate: {
      name: "",
      links: {
        holidays: {
          id: "holidays",
          label: "Vacaciones",
          icon: <MdOutlineBeachAccess />,
          path: "/holidays",
        },
        disability: {
          id: "disability",
          label: "Incapacidades",
          icon: <MdOutlinePersonalInjury />,
          path: "/disability",
        },
        certifications: {
          id: "certifications",
          label: "Certificaciones",
          icon: <MdAttachFile />,
          path: "/certifications",
        },
        absences: {
          id: "absences",
          label: "Ausencias",
          icon: <MdOutlinePersonOff />,
          path: "/absences",
        },
      },
    },
  },
};

const userMenu = [
  {
    id: "section",
    title: "",
    links: [
      {
        id: "logout",
        title: "Cerrar sesión",
        path: "/logout",
        iconBefore: <MdLogout />,
      },
    ],
    divider: true,
  },
];

const actions = [
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: () => {
      window.location.href = "/logout";
    },
  },
];

const pathStart = ["/welcome", "/signin", "/"];

export { nav, userMenu, actions, pathStart };
