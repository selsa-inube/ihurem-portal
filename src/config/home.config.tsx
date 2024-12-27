import {
  MdLogout,
  MdOutlinePersonOff,
  MdAttachFile,
  MdBeachAccess,
  MdOutlinePersonalInjury,
  MdOutlineFilePresent,
} from "react-icons/md";

export const cards = [
  {
    title: "Vacaciones",
    complement: ["Solicita y organiza tus días libres fácilmente."],
    description: "Gestión de tus días de descanso.",
    icon: <MdBeachAccess />,
    url: "/holidays",
  },
  {
    title: "Ausencias",
    complement: ["Consulta tus ausencias registradas."],
    description: "Historial de tus ausencias laborales.",
    icon: <MdOutlinePersonOff />,
    url: "/ausencias",
  },
  {
    title: "Certificaciones",
    complement: ["Obtén tus certificaciones oficiales."],
    description: "Documentos oficiales disponibles.",
    icon: <MdOutlineFilePresent />,
    url: "/certifications",
  },
  {
    title: "Incapacidades",
    complement: ["Registra y consulta tus incapacidades."],
    description: "Gestión de permisos médicos.",
    icon: <MdOutlinePersonalInjury />,
    url: "/incapacidades",
  },
];

export const nav = {
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
        disability: {
          id: "disability",
          label: "Incapacidades",
          icon: <MdOutlinePersonalInjury />,
          path: "/disability",
        },
      },
    },
  },
};

// Menú de usuario
export const userMenu = [
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

// Acciones
export const actions = [
  {
    id: "logout",
    label: "Cerrar sesión",
    icon: <MdLogout />,
    action: () => {
      console.log("logout");
    },
  },
];

// Rutas de inicio
export const pathStart = ["/welcome", "/signin", "/"];
