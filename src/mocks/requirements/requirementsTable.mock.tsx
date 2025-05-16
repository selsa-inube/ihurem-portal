import { BorderedTag } from "@components/cards/BorderedTag";

import { Requirement } from "@components/data/TableBoard/types";

export const mockRequirements: Requirement[] = [
  {
    id: "system-validations",
    titles: [
      {
        id: "Validaciones del sistema",
        titleName: "Validaciones del sistema",
        priority: 1,
      },
      { id: "tag", titleName: "", priority: 2 },
    ],
    entries: [
      {
        id: "sv-1",
        "Validaciones del sistema": "Que el asociado sea activo",
        tag: <BorderedTag appearance="success">Cumple</BorderedTag>,
      },
      {
        id: "sv-2",
        "Validaciones del sistema": "Que este al día con las obligaciones",
        tag: <BorderedTag appearance="success">Cumple</BorderedTag>,
      },
      {
        id: "sv-3",
        "Validaciones del sistema": "Que tenga más de 30 años",
        tag: <BorderedTag appearance="danger">No Cumple</BorderedTag>,
      },
    ],
  },
  {
    id: "documentary-requirements",
    titles: [
      {
        id: "Requisitos documentales",
        titleName: "Requisitos documentales",
        priority: 1,
      },
      { id: "tag", titleName: "", priority: 2 },
    ],
    entries: [
      {
        id: "dr-1",
        "Requisitos documentales": "Imágenes de la Cédula de ciudadanía",
        tag: <BorderedTag appearance="success">Cumple</BorderedTag>,
      },
      {
        id: "dr-2",
        "Requisitos documentales": "Desprendible de pago",
        tag: <BorderedTag appearance="warning">Sin Evaluar</BorderedTag>,
      },
      {
        id: "dr-3",
        "Requisitos documentales": "Declaración de renta",
        tag: <BorderedTag appearance="warning">Sin Evaluar</BorderedTag>,
      },
    ],
  },
  {
    id: "human-validations",
    titles: [
      {
        id: "Validaciones humanas",
        titleName: "Validaciones humanas",
        priority: 1,
      },
      { id: "tag", titleName: "", priority: 2 },
    ],
    entries: [
      {
        id: "hv-1",
        "Validaciones humanas": "Referencias laborales",
        tag: <BorderedTag appearance="success">Cumple</BorderedTag>,
      },
      {
        id: "hv-2",
        "Validaciones humanas": "Proponer un codeudor",
        tag: <BorderedTag appearance="danger">No Cumple</BorderedTag>,
      },
    ],
  },
];
