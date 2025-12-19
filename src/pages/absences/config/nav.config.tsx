import { labels } from "@i18n/labels";

export const breadcrumbs = {
  label: labels.absences.breadcrumbs.appName,
  description: labels.absences.breadcrumbs.pending,
  crumbs: [
    {
      path: "/",
      label: labels.absences.breadcrumbs.home,
      id: "/",
      isActive: false,
    },
    {
      path: "/absences",
      label: labels.absences.breadcrumbs.appName,
      id: "/absences",
      isActive: true,
    },
  ],
  url: "/",
};
