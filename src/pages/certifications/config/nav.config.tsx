import { labels } from "@i18n/labels";

const breadcrumbs = {
  id: 1,
  label: labels.certifications.pages.certifications,
  crumbs: [
    {
      path: "/",
      label: labels.certifications.pages.home,
      id: "/",
      isActive: false,
    },
    {
      path: "/certifications",
      label: labels.certifications.pages.certifications,
      id: "/certifications",
      isActive: true,
    },
  ],
  url: "/",
};

export { breadcrumbs };
