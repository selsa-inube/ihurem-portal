import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { PendingVacationDaysTable } from "..";
import { generateData } from "../tableConfig";

const meta: Meta<typeof PendingVacationDaysTable> = {
  title: "data/PendingVacationDaysTable",
  component: PendingVacationDaysTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof PendingVacationDaysTable> = (args) => (
  <PendingVacationDaysTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: generateData(),
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: generateData(),
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
