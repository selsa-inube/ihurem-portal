import { Meta, StoryObj } from "@storybook/react";
import { useMediaQuery } from "@inubekit/inubekit";

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

const getModalContent = (isMobile: boolean) => {
  const fullContent = [
    { label: "Número", value: "1234" },
    { label: "Tipo", value: "Disfrute de vacaciones" },
    { label: "Fecha", value: "22/Oct/2024" },
    { label: "Estado", value: "En trámite de aprobación" },
    { label: "Días de disfrute", value: "2" },
    { label: "Destinatario", value: "A quien interese" },
    { label: "Contrato", value: "Indefinido - 02/sep/2024" },
  ];

  if (isMobile) {
    return fullContent;
  } else {
    return fullContent.slice(0, Math.floor(fullContent.length / 2));
  }
};

export const Default: Story = (args: RequestComponentDetailProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const modalContent = getModalContent(isMobile);

  return <RequestComponentDetail {...args} modalContent={modalContent} />;
};

Default.args = {
  title: "Detalles",
  portalId: "portal",
  buttonLabel: "Cerrar",
};

export default meta;
