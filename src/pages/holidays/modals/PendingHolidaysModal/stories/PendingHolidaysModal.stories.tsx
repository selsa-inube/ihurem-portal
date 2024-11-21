import { Meta, StoryFn } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { generateData } from "@pages/holidays/components/PendingVacationDaysTable/tableConfig";

import { PendingHolidaysModal } from "..";

export default {
  title: "Modals/PendingHolidaysModal",
  component: PendingHolidaysModal,
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <div id="portal">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
} as Meta<typeof PendingHolidaysModal>;

const Template: StoryFn<typeof PendingHolidaysModal> = (args) => (
  <PendingHolidaysModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  portalId: "portal",
  totalDays: 23,
  tableData: generateData(),
  loading: false,
  handleClose: () => {
    console.log("Modal closed");
  },
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const NoData = Template.bind({});
NoData.args = {
  ...Default.args,
  totalDays: 0,
  tableData: [],
};
