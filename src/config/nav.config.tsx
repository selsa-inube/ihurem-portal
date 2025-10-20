import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";
import { MdLogout } from "react-icons/md";
import { ILinkNav } from "@inubekit/inubekit";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

const baseNavLinks = [
  {
    id: "vacations",
    serviceCode: "vacations",
    label: "Vacaciones",
    path: "/holidays",
    description:
      "Son los días de descanso remunerado que le corresponden al empleado por cada año trabajado.",
    order: 1,
  },
  {
    id: "disability",
    serviceCode: "disability",
    label: "Incapacidades",
    path: "/disability",
    description:
      "Son períodos en los que el trabajador no puede laborar debido a una enfermedad o accidente, y está respaldado por un certificado médico.",
    order: 2,
  },
  {
    id: "absences",
    serviceCode: "absences",
    label: "Ausencias",
    path: "/absences",
    description:
      "Son períodos en los que el trabajador no se presenta a laborar, ya sea de forma justificada o injustificada.",
    order: 3,
  },
  {
    id: "certifications",
    serviceCode: "certifications",
    label: "Certificaciones",
    path: "/certifications",
    description:
      "Son documentos que acreditan la formación o experiencia laboral de un empleado.",
    order: 4,
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

const getIcon = (iconReference?: string): ReactNode => {
  if (iconReference && iconReference.trim() !== "") {
    const IconComponent: IconType | undefined = (
      MdIcons as Record<string, IconType>
    )[iconReference];
    if (IconComponent) {
      return <IconComponent size={24} />;
    }
  }
  return <div style={{ width: 24, height: 24 }} />;
};

const navConfig = (employeeOptions: IEmployeeOptions[]) => {
  return employeeOptions
    .map((option) => {
      const link = baseNavLinks.find(
        (link) => link.serviceCode === option.optionCode,
      );
      return {
        ...link,
        id: option.optionCode,
        path: link?.path ?? "/",
        label: option.abbreviatedName ?? link?.label ?? "",
        icon: getIcon(option.iconReference),
        isEnabled: true,
        order: link?.order ?? 0,
      };
    })
    .sort((a, b) => a.order - b.order);
};

const useNavConfig = (employeeOptions: IEmployeeOptions[]) => {
  const location = useLocation();
  const baseNav = navConfig(employeeOptions);

  const nav = {
    reactPortalId: "portals",
    title: "MENU",
    sections: {
      administrate: {
        name: "",
        links: baseNav.reduce(
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

const useConfigHeader = (employeeOptions: IEmployeeOptions[]) => {
  const nav = {
    reactPortalId: "portal",
    title: "MENU",
    sections: [
      {
        isOpen: true,
        onClose: noop,
        onToggle: noop,
        subtitle: "Administrate",
        links: navConfig(employeeOptions),
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
  navConfig,
  getIcon,
};
