import {
  MdOutlineBeachAccess,
  MdOutlinePersonOff,
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
    url: "/certificaciones",
  },
  {
    title: "Incapacidades",
    complement: ["Registra y consulta tus incapacidades."],
    description: "Gestión de permisos médicos.",
    icon: <MdOutlinePersonalInjury />,
    url: "/incapacidades",
  },
];
