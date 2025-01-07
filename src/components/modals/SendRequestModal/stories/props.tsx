import { ArgTypes } from "@storybook/react";
import { SendRequestProps } from "../index";

export const props: ArgTypes<SendRequestProps> = {
  title: {
    control: "text",
    description: "Title of the modal",
    defaultValue: "Send Request",
  },
  buttonText: {
    control: "text",
    description: "Text for the primary button",
    defaultValue: "Send",
  },
  secondaryButtonText: {
    control: "text",
    description: "Text for the secondary button",
    defaultValue: "Cancel",
  },
  portalId: {
    control: "text",
    description: "ID of the portal where the modal will be rendered",
    defaultValue: "portal",
  },
  onSubmit: {
    action: "submitted",
    description: "Callback function when the request is sent",
  },
  onCloseModal: {
    action: "closed",
    description: "Callback function when the modal is closed",
  },
  onSecondaryButtonClick: {
    action: "secondaryAction",
    description: "Callback function for the secondary button",
  },
};
