import { ArgTypes } from "@storybook/react";
export const parameters = {
  docs: {
    description: {
      component: "Modal to display an unordered list of information.",
    },
  },
};

export const props: ArgTypes = {
  title: {
    control: {
      type: "text",
    },
    description: "El título que aparecerá en el modal",
    defaultValue: "Detalles de la Solicitud",
  },
  buttonLabel: {
    control: {
      type: "text",
    },
    description: "El texto que aparecerá en el botón del modal",
    defaultValue: "Cerrar",
  },
  portalId: {
    control: {
      type: "text",
    },
    description: "El ID del contenedor del portal donde se renderiza el modal",
    defaultValue: "portal",
  },
  handleClose: {
    action: "handleClose",
    description: "Función para cerrar el modal",
  },
  onSubmit: {
    action: "onSubmit",
    description: "Función para enviar datos desde el modal",
  },
};
