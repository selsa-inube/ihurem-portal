import {
  MdLogout,
  MdOutlinePersonOff,
  MdAttachFile,
  MdBeachAccess,
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
          icon: <MdBeachAccess />,
          path: "/holidays",
        },
        disability: {
          id: "disability",
          label: "Incapacidades",
          icon: <MdOutlinePersonalInjury />,
          path: "/disability",
        },
        certificates: {
          id: "certificates",
          label: "Certificados",
          icon: <MdAttachFile />,
          path: "/certificates",
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
      console.log("logout");
    },
  },
];

const pathStart = ["/welcome", "/signin", "/"];

export { nav, userMenu, actions, pathStart };
