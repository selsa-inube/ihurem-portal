const holidaysNavConfig = [
  {
    id: 1,
    label: "Vacaciones",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/holidays",
        label: "Vacaciones",
        id: "/holidays",
        isActive: true,
      },
    ],
    url: "/",
  },
  {
    id: 2,
    label: "Solicitar disfrute",
    crumbs: [
      {
        path: "/",
        label: "Inicio",
        id: "/",
        isActive: false,
      },
      {
        path: "/holidays",
        label: "Vacaciones",
        id: "/holidays",
        isActive: false,
      },
      {
        path: "/holidays/request-enjoyment",
        label: "Solicitar disfrute",
        id: "/holidays/request-enjoyment",
        isActive: true,
      },
    ],
    url: "/",
  },
];

export { holidaysNavConfig };
