import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { HolidaysTable } from "..";
import { generateData } from "../tableConfig";

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
