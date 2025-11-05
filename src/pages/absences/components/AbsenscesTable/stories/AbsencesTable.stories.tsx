import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineFileDownload } from "react-icons/md";

import { IAbsencesTable } from "../types";
import { AbsencesTable } from "..";

const absencesData: IAbsencesTable[] = [
  {
    reason: { value: "Diligencias personales" },
    date: { value: "14/Oct/2025 - 07:00" },
    duration: { value: "6 horas" },
    view: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("Ver detalles de la ausencia 0"),
    },
    download: {
      value: <MdOutlineFileDownload />,
      type: "icon",
      onClick: () => console.log("Descargar ausencia 0"),
    },
  },
  {
    reason: { value: "Enfermedad general" },
    date: { value: "20/Feb/2025" },
    duration: { value: "4 días" },
    view: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("Ver detalles de la ausencia 1"),
    },
    download: {
      value: <MdOutlineFileDownload />,
      type: "icon",
      onClick: () => console.log("Descargar ausencia 1"),
    },
  },
  {
    reason: { value: "Estudio o capacitación" },
    date: { value: "08/Nov/2024" },
    duration: { value: "1 día" },
    view: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("Ver detalles de la ausencia 2"),
    },
    download: {
      value: <MdOutlineFileDownload />,
      type: "icon",
      onClick: () => console.log("Descargar ausencia 2"),
    },
  },
];

const meta: Meta<typeof AbsencesTable> = {
  title: "data/AbsencesTable",
  component: AbsencesTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof AbsencesTable> = (args) => (
  <AbsencesTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: absencesData,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: absencesData,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
