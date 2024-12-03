const certificationsNavConfig = [
  {
    id: 1,
    label: "Certificaciones",
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
    url: "/",
  },
  {
    id: 2,
    label: "Nueva certificación",
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
        isActive: false,
      },
      {
        path: "/certifications/new-certification",
        label: "Nueva certificación",
        id: "/certifications/new-certification",
        isActive: true,
      },
    ],
    url: "/certifications",
  },
];

export { certificationsNavConfig };
