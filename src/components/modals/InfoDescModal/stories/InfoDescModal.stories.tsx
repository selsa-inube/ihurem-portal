import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button, Text } from "@inubekit/inubekit";

import { InfoDescModal, InfoDescModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof InfoDescModal> = {
  component: InfoDescModal,
  title: "components/modals/InfoDescModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<InfoDescModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <InfoDescModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  title: "Información",
  children: <Text>children modal*</Text>,
  description:
    "Si escribes una duración en horas se te solicitará una “Hora de inicio aproximada”.",
};

export default story;
