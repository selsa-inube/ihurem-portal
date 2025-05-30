import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { DaysUsedTable } from "..";

const meta: Meta<typeof DaysUsedTable> = {
  title: "data/DaysUsedTable",
  component: DaysUsedTable,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof DaysUsedTable> = (args) => (
  <DaysUsedTable {...args} />
);

export const Default = Template.bind({});
Default.args = {
  data: [],
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
  loading: false,
};
