import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@inubekit/inubekit";

import { UploadDocumentsModal, UploadDocumentsModalProps } from "../index";

const meta: Meta<typeof UploadDocumentsModal> = {
  title: "components/modals/UploadDocumentsModal",
  component: UploadDocumentsModal,
  argTypes: {
    handleClose: { action: "closed" },
  },
};

type Story = StoryObj<typeof UploadDocumentsModal>;

export const Default: Story = (args: UploadDocumentsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Button appearance="primary" onClick={handleOpen}>
        Abrir modal
      </Button>
      {isOpen && <UploadDocumentsModal {...args} handleClose={handleClose} />}
    </>
  );
};

Default.args = {
  portalId: "portal",
  documents: [
    { id: 1, name: "Cita médica programada - (Opcional)" },
    {
      id: 2,
      name: "Incapacidad médica emitida por una EPS o prepagada - *Requerido*",
    },
    {
      id: 3,
      name: "Orden médica de tratamiento, examen especializado o recuperación post-operatoria - (Opcional)",
    },
  ],
};

export default meta;
