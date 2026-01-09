import { ArgTypes } from "@storybook/react";

import { ResponseSuccesModalProps } from "..";

const props: Partial<ArgTypes<ResponseSuccesModalProps>> = {
  portalId: {
    control: "text",
    description: "ID del nodo portal donde se renderiza el modal",
    defaultValue: "portal",
  },
  isRequestSent: {
    control: "boolean",
    description:
      "Indicador de si la solicitud fue enviada/exitosamente procesada",
    defaultValue: true,
  },
  title: {
    control: "text",
    description: "Título principal del modal",
    defaultValue: "Operación exitosa",
  },
  description: {
    control: "text",
    description: "Descripción o mensaje que se muestra en el modal",
    defaultValue: "La operación se completó correctamente.",
  },
  onCloseModal: {
    action: "closed",
    description: "Función disparada cuando se cierra el modal",
  },
};

export { props };
