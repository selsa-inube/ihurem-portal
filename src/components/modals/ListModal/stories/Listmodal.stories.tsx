import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@inubekit/button";
import { ListModal, IListModalProps } from "../index";
import { parameters, props } from "./props";

const meta: Meta<typeof ListModal> = {
  title: "components/modals/ListModal",
  component: ListModal,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof ListModal>;

export const Default: Story = (args: IListModalProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Abrir Modal</Button>

      {showModal && (
        <ListModal {...args} handleClose={() => setShowModal(false)} />
      )}
    </>
  );
};

const modalContent = [
  { label: "Número", value: "1234" },
  { label: "Tipo", value: "Disfrute de vacaciones" },
  { label: "Fecha", value: "22/Oct/2024" },
  { label: "Estado", value: "En trámite de aprobación" },
  { label: "Días de disfrute", value: "2" },
  { label: "Destinatario", value: "A quien interese" },
  { label: "Contrato", value: "Indefinido - 02/sep/2024" },
];

Default.args = {
  title: "Detalles",
  portalId: "portal",
  buttonLabel: "Cerrar",
  modalContent,
};

export default meta;
