import { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Button } from "@inubekit/inubekit";

import { mockRequirements } from "@mocks/requirements/requirementsTable.mock";

import { AbsenceRequirementsModal, AbsenceRequirementsModalProps } from "..";

const story: Meta<typeof AbsenceRequirementsModal> = {
  component: AbsenceRequirementsModal,
  title: "modals/AbsenceRequirementsModal",
};

const DefaultTemplate: StoryFn<AbsenceRequirementsModalProps> = (args) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Button onClick={handleShowModal}>Open Modal</Button>
      {showModal && (
        <AbsenceRequirementsModal
          {...args}
          title="Requisitos"
          buttonLabel="Cerrar"
          requirements={mockRequirements}
        />
      )}
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  portalId: "portal",
};

export default story;
