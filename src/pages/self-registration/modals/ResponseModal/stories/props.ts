import { ArgTypes } from "@storybook/react";

import { ResponseModalProps } from "..";

const props: Partial<ArgTypes<ResponseModalProps>> = {
  portalId: {
    control: "text",
    description: "ID of the portal node for rendering the modal",
    defaultValue: "portal",
  },
  onCloseModal: {
    action: "closed",
    description: "Function triggered when the modal is closed",
  },
};

export { props };
