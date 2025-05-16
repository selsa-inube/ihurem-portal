import {
  MdLogout,
  MdOutlineFilePresent,
  MdOutlineBeachAccess,
  MdOutlinePersonalInjury,
  MdOutlinePersonOff,
} from "react-icons/md";
import { ILinkNav } from "@inubekit/inubekit";
import { useLocation } from "react-router-dom";

const baseNavLinks = [
  {
    id: "holidays",
    label: "Vacaciones",
    icon: <MdOutlineBeachAccess />,
    path: "/holidays",
  },
  {
    id: "disability",
    label: "Incapacidades",
    icon: <MdOutlinePersonalInjury />,
    path: "/disability",
  },
  {
    id: "certifications",
    label: "Certificaciones",
    icon: <MdOutlineFilePresent />,
    path: "/certifications",
  },
  {
    id: "absences",
    label: "Ausencias",
    icon: <MdOutlinePersonOff />,
    path: "/absences",
  },
];

const noop = () => undefined;

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

const useNavConfig = () => {
  const location = useLocation();

  const nav = {
    reactPortalId: "portals",
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: baseNavLinks.reduce(
          (acc, link) => {
            acc[link.id] = {
              ...link,
              isActive: location.pathname.startsWith(link.path),
            };
            return acc;
          },
          {} as Record<string, ILinkNav>,
        ),
      },
    },
    actions,
  };

  return nav;
};

const useConfigHeader = () => {
  const nav = {
    reactPortalId: "portal",
    title: "MENU",
    sections: [
      {
        isOpen: true,
        onClose: noop,
        onToggle: noop,
        subtitle: "Administrate",
        links: baseNavLinks,
      },
    ],
    actions,
  };

  return nav;
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

const pathStart = ["/welcome", "/signin", "/"];

export {
  useNavConfig,
  useConfigHeader,
  baseNavLinks,
  userMenu,
  actions,
  pathStart,
};
