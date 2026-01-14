import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { ResponseSuccesModal, ResponseSuccesModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof ResponseSuccesModal> = {
  component: ResponseSuccesModal,
  title: "components/modals/ResponseSuccesModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<ResponseSuccesModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <ResponseSuccesModal {...args} onCloseModal={handleShowModal} />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  isRequestSent: true,
  title: "Objeción enviada",
  description: "¡La solicitud de objeción ha sido enviada!",
};

export default story;
