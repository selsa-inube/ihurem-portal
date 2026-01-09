import { ArgTypes } from "@storybook/react";

import { ProcessingRequestModalProps } from "..";

const props: Partial<ArgTypes<ProcessingRequestModalProps>> = {
  buttonText: {
    control: "text",
    description: "Text for the primary submit button",
    defaultValue: "Entendido",
  },
  description: {
    control: "text",
    description: "Content displayed as the modal's main description",
    defaultValue: "Descripcion por defecto",
  },
  title: {
    control: "text",
    description: "Title of the modal",
    defaultValue: "Información",
  },
  portalId: {
    control: "text",
    description: "ID of the portal node for rendering the modal",
    defaultValue: "portal",
  },
  currentStepId: {
    control: { type: "number", min: 1, max: 3 },
    description: "ID of the current active step in the process",
    defaultValue: 1,
  },
  steps: {
    control: "object",
    description: "Array of process steps to display in the modal",
  },
  onCloseModal: {
    action: "closed",
    description: "Function triggered when the modal is closed",
  },
};

export { props };
