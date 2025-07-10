import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { ResponseModal, ResponseModalProps } from "..";
import { props } from "./props";

const story: Meta<typeof ResponseModal> = {
  component: ResponseModal,
  title: "components/modals/ResponseModal",
  argTypes: props,
};

const DefaultTemplate: StoryFn<ResponseModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && <ResponseModal {...args} onCloseModal={handleShowModal} />}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  isRequestSent: true,
};

export default story;
