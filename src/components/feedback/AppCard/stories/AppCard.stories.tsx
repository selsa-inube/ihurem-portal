import { BrowserRouter } from "react-router-dom";
import { MdOutlineBeachAccess } from "react-icons/md";
import { StoryFn, Meta } from "@storybook/react";
import { AppCard, AppCardProps } from "..";

const meta: Meta<typeof AppCard> = {
  component: AppCard,
  title: "feedback/AppCard",
  decorators: [
    (Story: StoryFn) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

const Template: StoryFn<AppCardProps> = (args) => <AppCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Vacaciones",
  description: "Descripción",
  icon: <MdOutlineBeachAccess />,
  complement: ["Complemento: ", "Complemento: "],
  url: "/privileges",
};

export default meta;
