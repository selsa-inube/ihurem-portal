import { MdOutlineVisibility, MdOutlineFileDownload } from "react-icons/md";
import { Icon } from "@inubekit/inubekit";

import {
  IAbsencesTable,
  AbsencesTableDataDetails,
} from "../AbsenscesTable/types";

const dataDetails: AbsencesTableDataDetails[] = [
  {
    absenceType: "Diligencias personales",
    employeeName: "Carlos Pérez",
    department: "Recursos Humanos",
    startDate: "14/Oct/2025 - 07:00",
    endDate: "14/Oct/2025 - 13:00",
    reasonDescription: "Permiso para realizar trámites personales.",
    approvedBy: "Laura Gómez",
    observationEmployee: "Salí para diligencias urgentes.",
  },
  {
    absenceType: "Enfermedad general",
    employeeName: "María Rodríguez",
    department: "Contabilidad",
    startDate: "20/Feb/2025",
    endDate: "24/Feb/2025",
    reasonDescription: "Reposo médico por enfermedad común.",
    approvedBy: "Andrés López",
    observationEmployee:
      "Entregué incapacidad médica al área de talento humano.",
  },
  {
    absenceType: "Estudio o capacitación",
    employeeName: "Juan Torres",
    department: "Tecnología",
    startDate: "08/Nov/2024",
    endDate: "08/Nov/2024",
    reasonDescription: "Asistencia a curso de actualización profesional.",
    approvedBy: "Ana Ramírez",
    observationEmployee: "Certificado adjunto entregado al supervisor.",
  },
];

export const mockAbsencesData: IAbsencesTable[] = [
  {
    reason: { value: "Diligencias personales" },
    date: { value: "14/Oct/2025 - 07:00" },
    duration: { value: "6 horas" },
    view: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineVisibility />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Ver detalles: Diligencias personales"),
    },
    download: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineFileDownload />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Descargar: Diligencias personales"),
    },
    dataDetails: { value: dataDetails[0] },
  },
  {
    reason: { value: "Enfermedad general" },
    date: { value: "20/Feb/2025" },
    duration: { value: "4 días" },
    view: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineVisibility />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Ver detalles: Enfermedad general"),
    },
    download: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineFileDownload />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Descargar: Enfermedad general"),
    },
    dataDetails: { value: dataDetails[1] },
  },
  {
    reason: { value: "Estudio o capacitación" },
    date: { value: "08/Nov/2024" },
    duration: { value: "1 día" },
    view: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineVisibility />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Ver detalles: Estudio o capacitación"),
    },
    download: {
      value: (
        <Icon appearance="dark" icon={<MdOutlineFileDownload />} size="20px" />
      ),
      type: "icon",
      onClick: () => console.log("Descargar: Estudio o capacitación"),
    },
    dataDetails: { value: dataDetails[2] },
  },
];

export const mockDocuments = [
  { id: 1, name: "Cita médica programada - (Opcional)" },
  {
    id: 2,
    name: "Incapacidad médica emitida por una EPS o prepagada - *Requerido*",
  },
  {
    id: 3,
    name: "Orden médica de tratamiento, examen especializado o recuperación post-operatoria - (Opcional)",
  },
];
