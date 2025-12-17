import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";
import { MdLogout } from "react-icons/md";
import { ILinkNav } from "@inubekit/inubekit";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

import { labels } from "@i18n/labels";
import { IEmployeeOptions } from "@ptypes/employeePortalBusiness.types";

const baseNavLinks = [
  {
    id: "vacations",
    serviceCode: "vacations",
    label: labels.config.nav.holidays.label,
    path: "/holidays",
    description: labels.config.nav.holidays.description,
    order: 1,
  },
  {
    id: "absences",
    serviceCode: "absences",
    label: labels.config.nav.absences.label,
    path: "/absences",
    description: labels.config.nav.absences.description,
    order: 2,
  },
  {
    id: "certifications",
    serviceCode: "certifications",
    label: labels.config.nav.certifications.label,
    path: "/certifications",
    description: labels.config.nav.certifications.description,
    order: 3,
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

const navConfig = (optionForCustomerPortal: IEmployeeOptions[]) => {
  return optionForCustomerPortal
    .map((option) => {
      const link = baseNavLinks.find(
        (link) => link.serviceCode === option.publicCode,
      );
      if (!link) {
        return null;
      }
      return {
        ...link,
        id: option.publicCode,
        path: link.path,
        label: option.abbreviatedName ?? link.label,
        icon: getIcon(option.iconReference),
        isEnabled: true,
        subOptions:
          option.subOption?.map((sub) => ({
            id: sub.publicCode,
            label: sub.abbreviatedName,
            description: sub.descriptionUse,
            icon: getIcon(sub.iconReference),
            nestedOptions: sub.subOption ?? [],
          })) ?? [],
      };
    })
    .filter((item) => item !== null);
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
