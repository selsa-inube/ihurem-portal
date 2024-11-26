import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { MdOutlineVisibility, MdDeleteOutline } from "react-icons/md";

import { IHolidaysTable } from "../types";
import { HolidaysTable } from "..";

const holidaysData: IHolidaysTable[] = [
  {
    description: {
      value: "Disfrute de vacaciones",
    },
    date: { value: "18/Ene/2024" },
    days: { value: 2 },
    status: {
      value: "En trámite de aprobación",
    },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("View details clicked for row 0"),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () => console.log("Delete clicked for row 0"),
    },
  },
  {
    description: {
      value: "Pago de vacaciones",
    },
    date: { value: "18/Ene/2024" },
    days: { value: 7 },
    status: {
      value: "En trámite de validación",
    },
    details: {
      value: <MdOutlineVisibility />,
      type: "icon",
      onClick: () => console.log("View details clicked for row 1"),
    },
    delete: {
      value: <MdDeleteOutline />,
      type: "icon",
      onClick: () => console.log("Delete clicked for row 1"),
    },
  },
];

const meta: Meta<typeof HolidaysTable> = {
  title: "data/HolidaysTable",
  component: HolidaysTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof HolidaysTable> = (args) => (
  <HolidaysTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: holidaysData,
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: holidaysData,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
