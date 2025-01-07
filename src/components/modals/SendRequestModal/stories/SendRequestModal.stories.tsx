import { StoryFn, Meta } from "@storybook/react";
import { SendRequest, SendRequestProps } from "..";
import { props } from "./props";

const story: Meta<typeof SendRequest> = {
  component: SendRequest,
  title: "components/modals/SendRequest",
  argTypes: {
    ...props,
    message: { control: "text", description: "Mensaje dinámico del modal" },
  },
};

const DefaultTemplate: StoryFn<SendRequestProps> = (args) => {
  return <SendRequest {...args} />;
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Enviar solicitud",
  message: "¿Realmente deseas enviar la solicitud de disfrute de vacaciones?",
  buttonText: "Enviar",
  secondaryButtonText: "Cancelar",
  portalId: "portal",
};

export default story;
