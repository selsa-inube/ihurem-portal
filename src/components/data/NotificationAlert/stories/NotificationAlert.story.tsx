import { StoryFn, Meta } from "@storybook/react";
import { MdWarningAmber } from "react-icons/md";
import { AlertCard, AlertCardProps } from "..";

const meta: Meta<typeof AlertCard> = {
  component: AlertCard,
  title: "feedback/AlertCard",
};

const Template: StoryFn<AlertCardProps> = (args) => <AlertCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Alerta 1",
  requirement: "Estar al día en las obligaciones.",
  cause: "El cliente tiene en mora el crédito de vivienda.",
  icon: <MdWarningAmber />,
};

export default meta;
