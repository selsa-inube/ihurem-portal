import { Meta, StoryObj } from "@storybook/react";

import { parameters, props } from "./props";

import { RequestComponentDetailProps } from "../index";
import RequestComponentDetail from "../index";

const meta: Meta<typeof RequestComponentDetail> = {
  title: "components/modals/RequestComponentDetail",
  component: RequestComponentDetail,
  parameters,
  argTypes: props,
};

type Story = StoryObj<typeof RequestComponentDetail>;

export const Default: Story = (args: RequestComponentDetailProps) => (
  <RequestComponentDetail {...args} />
);

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
