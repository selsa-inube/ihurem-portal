import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { FlagProvider } from "@inubekit/inubekit";

import { ICertificationsTable } from "../types";
import { CertificationsTable } from "..";

const certificationsData: ICertificationsTable[] = [
  {
    requestNumber: { value: "REQ-001" },
    type: { value: "Calidad" },
    date: { value: "10/Feb/2024" },
    status: { value: "Aprobado" },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("Ver detalles fila 0"),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () => console.log("Eliminar fila 0"),
    },
    dataDetails: {
      value: { description: "Detalles adicionales fila 0" },
    },
  },
  {
    requestNumber: { value: "REQ-002" },
    type: { value: "Seguridad" },
    date: { value: "15/Mar/2024" },
    status: { value: "En revisión" },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("Ver detalles fila 1"),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () => console.log("Eliminar fila 1"),
    },
    dataDetails: {
      value: { description: "Detalles adicionales fila 0" },
    },
  },
];

const meta: Meta<typeof CertificationsTable> = {
  title: "data/CertificationsTable",
  component: CertificationsTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <FlagProvider>
          <Story />
        </FlagProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof CertificationsTable> = (args) => (
  <CertificationsTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: certificationsData,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: certificationsData,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
