import { IAssistedStep } from "@inubekit/inubekit";

export const reportAbsenceSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: "Requisitos no cumplidos",
    description: "Requisitos no cumplidos para reportar ausencias.",
  },
  {
    id: 2,
    number: 2,
    name: "Motivo de ausencia",
    description: "Define detalladamente el motivo de esta ausencia.",
  },
  {
    id: 3,
    number: 3,
    name: "Duración de ausencia",
    description: "Completa los datos de duración para esta ausencia.",
  },
  {
    id: 4,
    number: 4,
    name: "Documentos requeridos",
    description: "Adjunta los documentos solicitados a continuación.",
  },
  {
    id: 5,
    number: 5,
    name: "Verificación",
    description: "Confirma la información diligenciada en pasos anteriores.",
  },
];
