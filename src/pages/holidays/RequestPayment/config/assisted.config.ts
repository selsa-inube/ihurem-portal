import { IAssistedStep, IOption } from "@inubekit/inubekit";

export const requestPaymentSteps: IAssistedStep[] = [
  {
    id: 1,
    number: 1,
    name: "Requisitos no cumplidos",
    description: "Revisa los requisitos para el disfrute de vacaciones.",
  },
  {
    id: 2,
    number: 2,
    name: "Información general",
    description: "Proporciona información acerca de tu solicitud.",
  },

  {
    id: 3,
    number: 3,
    name: "Verificación",
    description: "Verifica la información proporcionada.",
  },
];

export const contractOptions: IOption[] = [
  {
    id: "1",
    label: "Contrato por obra o labor",
    value: "contrato por obra o labor.",
  },
  {
    id: "2",
    label: "Contrato de trabajo a término fijo",
    value: "contrato de trabajo a término fijo.",
  },
  {
    id: "3",
    label: "Contrato de trabajo a término indefinido",
    value: "contrato de trabajo a término indefinido.",
  },
];
