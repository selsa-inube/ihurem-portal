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
    description:
      "Son los días de descanso remunerado que le corresponden al empleado por cada año trabajado.",
  },
  {
    id: "disability",
    label: "Incapacidades",
    icon: <MdOutlinePersonalInjury />,
    path: "/disability",
    description:
      "Son períodos en los que el trabajador no puede laborar debido a una enfermedad o accidente, y está respaldado por un certificado médico.",
  },
  {
    id: "certifications",
    label: "Certificaciones",
    icon: <MdOutlineFilePresent />,
    path: "/certifications",
    description:
      "Son documentos que acreditan la formación o experiencia laboral de un empleado.",
  },
  {
    id: "absences",
    label: "Ausencias",
    icon: <MdOutlinePersonOff />,
    path: "/absences",
    description:
      "Son períodos en los que el trabajador no se presenta a laborar, ya sea de forma justificada o injustificada.",
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
