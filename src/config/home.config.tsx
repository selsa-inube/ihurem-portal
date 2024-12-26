import {
  MdOutlineBeachAccess,
  MdOutlineFilePresent,
  MdOutlinePersonalInjury,
} from "react-icons/md";

export const cards = [
  {
    title: "Vacaciones",
    complement: ["Solicita y organiza tus días libres fácilmente."],
    description: "Gestión de tus días de descanso.",
    icon: <MdOutlineBeachAccess />,
    url: "/holidays",
  },
  {
    title: "Incapacidades",
    complement: ["Registra y consulta tus incapacidades."],
    description: "Gestión de permisos médicos.",
    icon: <MdOutlinePersonalInjury />,
    url: "/incapacidades",
  },
  {
    title: "Certificaciones",
    complement: ["Obtén tus certificaciones oficiales."],
    description: "Documentos oficiales disponibles.",
    icon: <MdOutlineFilePresent />,
    url: "/certifications",
  },
];
